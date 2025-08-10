import json
import os
import argparse
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from processor_base import PrototypeCall, DirectCall, NewCall

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
    "undefined": "None",
    "DOMHighResTimeStamp": "float",
    "double": "float",
    "unrestricted double": "float",
}

def idl_type_to_67lang_type(idl_type):
    if isinstance(idl_type, list):
        # For now, just take the first type in a sequence
        return idl_type_to_67lang_type(idl_type[0])
    
    if not isinstance(idl_type, dict):
        # Handle simple string types
        return TYPE_MAPPING.get(idl_type, idl_type)

    type_name = idl_type.get("idlType")
    if isinstance(type_name, list):
        # Handle union types, for now just take the first one
        return idl_type_to_67lang_type(type_name[0])

    return TYPE_MAPPING.get(type_name, type_name)

def main():
    parser = argparse.ArgumentParser(description='Import WebIDL definitions.')
    parser.add_argument('webref_path', help='Path to the webref directory')
    args = parser.parse_args()

    idl_dir = os.path.join(args.webref_path, "ed/idlparsed")
    
    generated_builtins = {}

    for filename in os.listdir(idl_dir):
        if filename.endswith(".json"):
            with open(os.path.join(idl_dir, filename)) as f:
                data = json.load(f)
                if "idlparsed" in data and "idlNames" in data["idlparsed"]:
                    for name, definition in data["idlparsed"]["idlNames"].items():
                        if definition["type"] == "interface":
                            for member in definition["members"]:
                                try:
                                    if member["type"] == "constructor":
                                        arguments = member["arguments"]
                                        min_args = 0
                                        for arg in arguments:
                                            if not arg["optional"]:
                                                min_args += 1

                                        for i in range(min_args, len(arguments) + 1):
                                            demands = [idl_type_to_67lang_type(arg["idlType"]) for arg in arguments[:i]]
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
                                            demands = [idl_type_to_67lang_type(arg["idlType"]) for arg in arguments[:i]]
                                            returns = idl_type_to_67lang_type(member["idlType"])
                                            
                                            if "static" in member.get("special", ""):
                                                call = DirectCall(fn=member["name"], receiver=name, demands=demands, returns=returns)
                                            else:
                                                # Prepend self type to demands for instance methods
                                                instance_demands = [name] + demands
                                                call = PrototypeCall(constructor=name, fn=member["name"], demands=instance_demands, returns=returns)
                                            
                                            key = member["name"].lower()
                                            if key not in generated_builtins:
                                                generated_builtins[key] = []
                                            generated_builtins[key].append(call)
                                except KeyError as e:
                                    print(f"Skipping member of {name} due to missing key: {e}")

    script_dir = os.path.dirname(os.path.realpath(__file__))
    output_path = os.path.join(script_dir, "webidl_builtins.py")

    with open(output_path, "w") as f:
        f.write("from processor_base import PrototypeCall, DirectCall, NewCall\n\n")
        f.write("webidl_calls = {\n")
        for name, calls in generated_builtins.items():
            f.write(f'    "{name}": [\n')
            for call in calls:
                f.write(f"        {call!r},\n")
            f.write("    ],\n")
        f.write("}\n")

if __name__ == "__main__":
    main()