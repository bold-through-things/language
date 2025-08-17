import json
import os
import argparse
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from pipeline.builtin_calls import PrototypeCall, DirectCall, NewCall, FieldCall

TYPE_MAPPING = {
    "DOMString": "str",
    "USVString": "str",
    "ByteString": "str",
    "boolean": "bool",
    "unsigned long": "int",
    "unsigned long long": "int",
    "long": "int",
    "octet": "int",
    "void": "None",
    "any": "*",
    # Fetch API types
    "RequestInfo": "*",  # TODO: Union type (Request | USVString) - add proper union support
    "undefined": "None",
    "DOMHighResTimeStamp": "float",
    "double": "float",
    "unrestricted double": "float",
}

def idl_type_to_67lang_type(idl_type, type_definitions=None):
    if isinstance(idl_type, list):
        # For now, just take the first type in a sequence
        return idl_type_to_67lang_type(idl_type[0], type_definitions)
    
    if not isinstance(idl_type, dict):
        # Handle simple string types
        type_str = TYPE_MAPPING.get(idl_type, idl_type)
        
        # Check if this is a dictionary type that we should resolve
        if type_definitions and idl_type in type_definitions:
            typedef_def = type_definitions[idl_type]
            if typedef_def.get("type") == "dictionary":
                return "dict"
        
        return type_str

    type_name = idl_type.get("idlType")
    if isinstance(type_name, list):
        # Handle union types, for now just take the first one
        return idl_type_to_67lang_type(type_name[0], type_definitions)

    # Check basic type mapping first
    mapped_type = TYPE_MAPPING.get(type_name, type_name)
    
    # Check if this is a dictionary type that we should resolve  
    if type_definitions and type_name in type_definitions:
        typedef_def = type_definitions[type_name]
        if typedef_def.get("type") == "dictionary":
            return "dict"
    
    return mapped_type

def extract_type_hierarchy(idl_dir):
    type_hierarchy = {}
    for filename in os.listdir(idl_dir):
        if filename.endswith(".json"):
            with open(os.path.join(idl_dir, filename)) as f:
                data = json.load(f)
                if "idlparsed" in data and "idlNames" in data["idlparsed"]:
                    for name, definition in data["idlparsed"]["idlNames"].items():
                        if definition["type"] == "interface" and definition.get("inheritance"):
                            type_hierarchy[name] = definition["inheritance"]
    return type_hierarchy

def extract_union_types(idl_dir):
    union_types = {}
    for filename in os.listdir(idl_dir):
        if filename.endswith(".json"):
            with open(os.path.join(idl_dir, filename)) as f:
                data = json.load(f)
                if "idlparsed" in data and "idlNames" in data["idlparsed"]:
                    for name, definition in data["idlparsed"]["idlNames"].items():
                        if definition["type"] == "typedef" and definition["idlType"]["union"]:
                            union_types[name] = [idl_type_to_67lang_type(t) for t in definition["idlType"]["idlType"]]
    return union_types

def main():
    parser = argparse.ArgumentParser(description='Import WebIDL definitions.')
    parser.add_argument('webref_path', help='Path to the webref directory')
    args = parser.parse_args()

    includes_map = {}
    generated_builtins = {}
    mixin_operations = {}

    idl_dir = os.path.join(args.webref_path, "ed/idlparsed")
    
    type_hierarchy = extract_type_hierarchy(idl_dir)
    union_types = extract_union_types(idl_dir)

    script_dir = os.path.dirname(os.path.realpath(__file__))
    type_hierarchy_path = os.path.join(script_dir, "type_hierarchy.py")
    with open(type_hierarchy_path, "w") as f:
        f.write("type_hierarchy = ")
        f.write(repr(type_hierarchy))
        f.write("\n\n")
        f.write("union_types = ")
        f.write(repr(union_types))

    

    # NEW: Populate includes_map and mixin_operations in a first pass
    for filename in os.listdir(idl_dir):
        if filename.endswith(".json"):
            with open(os.path.join(idl_dir, filename)) as f:
                data = json.load(f)
                if "idlparsed" in data:
                    # Process includes from idlExtendedNames
                    if "idlExtendedNames" in data["idlparsed"]:
                        for interface_name, extended_list in data["idlparsed"]["idlExtendedNames"].items():
                            for extended_def in extended_list:
                                if extended_def.get("type") == "includes" and "includes" in extended_def:
                                    mixin_name = extended_def["includes"]
                                    if interface_name not in includes_map:
                                        includes_map[interface_name] = []
                                    includes_map[interface_name].append(mixin_name)
                    
                    if "idlNames" in data["idlparsed"]:
                        for name, definition in data["idlparsed"]["idlNames"].items():
                            if "mixin" in definition["type"]: # Correctly identify mixins
                                if name not in mixin_operations:
                                    mixin_operations[name] = []
                                for member in definition["members"]:
                                    if member["type"] == "operation":
                                        mixin_operations[name].append(member)
                    
                    # Also check idlExtendedNames for partial mixin definitions
                    if "idlExtendedNames" in data["idlparsed"]:
                        for name, extended_list in data["idlparsed"]["idlExtendedNames"].items():
                            for extended_def in extended_list:
                                if "mixin" in extended_def.get("type", ""):
                                    if name not in mixin_operations:
                                        mixin_operations[name] = []
                                    for member in extended_def.get("members", []):
                                        if member["type"] == "operation":
                                            mixin_operations[name].append(member)
    
    print(f"includes_map (after first pass): {includes_map}") # DEBUG
    print(f"mixin_operations (after first pass): {mixin_operations}") # DEBUG
    
    # Collect all type definitions for automatic type mapping
    type_definitions = {}
    for filename in os.listdir(idl_dir):
        if filename.endswith(".json"):
            with open(os.path.join(idl_dir, filename)) as f:
                data = json.load(f)
                if "idlparsed" in data and "idlNames" in data["idlparsed"]:
                    for name, definition in data["idlparsed"]["idlNames"].items():
                        type_definitions[name] = definition

    # Manually add implicit inclusions not present in the IDL JSON
    if "Window" in includes_map:
        includes_map["Window"].append("WindowOrWorkerGlobalScope")
    else:
        includes_map["Window"] = ["WindowOrWorkerGlobalScope"]

    # Second pass: Generate builtins
    for filename in os.listdir(idl_dir):
        if filename.endswith(".json"):
            with open(os.path.join(idl_dir, filename)) as f:
                data = json.load(f)
                if "idlparsed" in data and "idlNames" in data["idlparsed"]:
                    for name, definition in data["idlparsed"]["idlNames"].items():
                        if definition["type"] == "interface":
                            # Process interface's own members
                            for member in definition["members"]:
                                try:
                                    if member["type"] == "constructor":
                                        arguments = member["arguments"]
                                        min_args = 0
                                        for arg in arguments:
                                            if not arg["optional"]:
                                                min_args += 1

                                        for i in range(min_args, len(arguments) + 1):
                                            demands = [idl_type_to_67lang_type(arg["idlType"], type_definitions) for arg in arguments[:i]]
                                            returns = name
                                            call = NewCall(constructor=name, demands=demands, returns=returns)
                                            if name not in generated_builtins:
                                                generated_builtins[name] = []
                                            generated_builtins[name].append(call)
                                    elif member["type"] == "operation":
                                        arguments = member["arguments"]
                                        min_args = 0
                                        for arg in arguments:
                                            if not arg["optional"]:
                                                min_args += 1
                                        
                                        for i in range(min_args, len(arguments) + 1):
                                            demands = [idl_type_to_67lang_type(arg["idlType"], type_definitions) for arg in arguments[:i]]
                                            returns = idl_type_to_67lang_type(member["idlType"], type_definitions)
                                            
                                            if name == "Window": # All non-static methods of Window are treated as global DirectCalls
                                                call = DirectCall(fn=member["name"], receiver=None, demands=demands, returns=returns)
                                            elif "static" in member.get("special", ""):
                                                call = DirectCall(fn=member["name"], receiver=name, demands=demands, returns=returns)
                                            else:
                                                instance_demands = [name] + demands
                                                call = PrototypeCall(constructor=name, fn=member["name"], demands=instance_demands, returns=returns)
                                            
                                            key = member["name"]
                                            if key not in generated_builtins:
                                                generated_builtins[key] = []
                                            generated_builtins[key].append(call)
                                    elif member["type"] == "attribute":
                                        key = member["name"]
                                        returns = idl_type_to_67lang_type(member["idlType"], type_definitions)
                                        
                                        # For readonly attributes, we only generate a getter
                                        # For other attributes, we generate a getter and a setter
                                        
                                        # Getter
                                        getter_demands = [name]
                                        call = FieldCall(field=key, demands=getter_demands, returns=returns)
                                        if key not in generated_builtins:
                                            generated_builtins[key] = []
                                        generated_builtins[key].append(call)
                                        
                                        # Setter
                                        if not member.get("readonly"):
                                            setter_demands = [name, returns]
                                            call = FieldCall(field=key, demands=setter_demands, returns=returns)
                                            if key not in generated_builtins:
                                                generated_builtins[key] = []
                                            generated_builtins[key].append(call)
                                except KeyError as e:
                                    print(f"Skipping member of {name} due to missing key: {e}")
                            
                            # Process included mixin members
                            if name in includes_map:
                                for mixin_name in includes_map[name]:
                                    if mixin_name in mixin_operations:
                                        print(f"Processing mixin {mixin_name} for interface {name} (second pass)") # DEBUG
                                        for member in mixin_operations[mixin_name]:
                                            if member["type"] == "operation":
                                                print(f"  Processing operation {member['name']} from mixin {mixin_name} (second pass)") # DEBUG
                                                arguments = member["arguments"]
                                                min_args = 0
                                                for arg in arguments:
                                                    if not arg["optional"]:
                                                        min_args += 1
                                                
                                                for i in range(min_args, len(arguments) + 1):
                                                    demands = [idl_type_to_67lang_type(arg["idlType"], type_definitions) for arg in arguments[:i]]
                                                    returns = idl_type_to_67lang_type(member["idlType"], type_definitions)
                                                    
                                                    if name == "Window": # All non-static methods of Window are treated as global DirectCalls
                                                        call = DirectCall(fn=member["name"], receiver=None, demands=demands, returns=returns)
                                                    else:
                                                        instance_demands = [name] + demands # 'name' is the including interface
                                                        call = PrototypeCall(constructor=name, fn=member["name"], demands=instance_demands, returns=returns)
                                                    
                                                    key = member["name"]
                                                    if key not in generated_builtins:
                                                        generated_builtins[key] = []
                                                    generated_builtins[key].append(call)

    print(f"includes_map: {includes_map}") # DEBUG
    print(f"mixin_operations: {mixin_operations}") # DEBUG

    # Process mixin inclusions
    for interface_name, mixin_names in includes_map.items():
        for mixin_name in mixin_names:
            if mixin_name in mixin_operations:
                print(f"Processing mixin {mixin_name} for interface {interface_name}") # DEBUG
                for member in mixin_operations[mixin_name]:
                    if member["type"] == "operation":
                        print(f"  Processing operation {member['name']} from mixin {mixin_name}") # DEBUG
                        arguments = member["arguments"]
                        min_args = 0
                        for arg in arguments:
                            if not arg["optional"]:
                                min_args += 1
                        
                        for i in range(min_args, len(arguments) + 1):
                            demands = [idl_type_to_67lang_type(arg["idlType"], type_definitions) for arg in arguments[:i]]
                            returns = idl_type_to_67lang_type(member["idlType"], type_definitions)
                            
                            # Mixin operations become prototype calls on the including interface
                            instance_demands = [interface_name] + demands
                            call = PrototypeCall(constructor=interface_name, fn=member["name"], demands=instance_demands, returns=returns)
                            
                            key = member["name"]
                            if key not in generated_builtins:
                                generated_builtins[key] = []
                            generated_builtins[key].append(call)

    output_path = os.path.join(script_dir, "webidl_builtins.py")

    with open(output_path, "w") as f:
        f.write("# This file is automatically generated. Do not edit directly.\n")
        f.write("from pipeline.builtin_calls import PrototypeCall, DirectCall, NewCall, FieldCall\n\n")
        f.write("webidl_calls = {\n")
        for name, calls in generated_builtins.items():
            f.write(f'    "{name}": [\n')
            for call in calls:
                f.write(f"        {call!r},\n")
            f.write("    ],\n")
        f.write("}\n")



if __name__ == "__main__":
    main()