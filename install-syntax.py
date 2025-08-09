#!/usr/bin/env python3

import os
import shutil
import json
import sys
import time
import uuid # Import uuid module

def get_vscode_extensions_dir():
    # Prioritize VSCODE_EXTENSIONS environment variable if set
    if 'VSCODE_EXTENSIONS' in os.environ:
        return os.environ['VSCODE_EXTENSIONS']

    # Common paths for VS Code extensions
    # For Codespaces, it's typically in ~/.vscode-remote/extensions
    # For local, it's ~/.vscode/extensions
    home_dir = os.path.expanduser("~")
    codespaces_path = os.path.join(home_dir, ".vscode-remote", "extensions")
    local_path = os.path.join(home_dir, ".vscode", "extensions")

    if os.path.exists(codespaces_path):
        return codespaces_path
    elif os.path.exists(local_path):
        return local_path
    else:
        print("Error: Could not find VS Code extensions directory.", file=sys.stderr)
        print(f"Tried: {codespaces_path} and {local_path}", file=sys.stderr)
        sys.exit(1)

def install_syntax_extension():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    highlight_dir = os.path.join(script_dir, "highlight")
    package_json_path = os.path.join(highlight_dir, "package.json")

    if not os.path.exists(package_json_path):
        print(f"Error: package.json not found at {package_json_path}", file=sys.stderr)
        sys.exit(1)

    with open(package_json_path, 'r') as f:
        package_data = json.load(f)

    extension_name = package_data.get("name")
    publisher = package_data.get("publisher")
    version = package_data.get("version")
    display_name = package_data.get("displayName", extension_name)

    if not all([extension_name, publisher, version]):
        print("Error: Missing name, publisher, or version in package.json", file=sys.stderr)
        sys.exit(1)

    # Generate a consistent UUID for our extension based on its full ID
    our_extension_full_id = f"{publisher}.{extension_name}"
    our_extension_uuid = str(uuid.uuid5(uuid.NAMESPACE_URL, our_extension_full_id))

    full_extension_dir_name = f"{publisher}.{extension_name}-{version}"
    
    extensions_dir = get_vscode_extensions_dir()
    target_extension_path = os.path.join(extensions_dir, full_extension_dir_name)
    extensions_json_path = os.path.join(extensions_dir, "extensions.json")

    print(f"VS Code extensions directory: {extensions_dir}")
    print(f"Target extension path: {target_extension_path}")
    print(f"Extensions JSON path: {extensions_json_path}")

    # 1. Clean up any existing installation
    if os.path.exists(target_extension_path):
        print(f"Removing existing extension directory: {target_extension_path}")
        shutil.rmtree(target_extension_path)

    # 2. Copy the highlight directory to the target path
    print(f"Copying {highlight_dir} to {target_extension_path}")
    try:
        shutil.copytree(highlight_dir, target_extension_path)
    except Exception as e:
        print(f"Error copying extension files: {e}", file=sys.stderr)
        sys.exit(1)

    # 3. Update extensions.json
    extensions_manifest = []
    if os.path.exists(extensions_json_path):
        try:
            with open(extensions_json_path, 'r') as f:
                extensions_manifest = json.load(f)
        except json.JSONDecodeError:
            # Crash hard on JSON parsing error as requested
            print(f"Error: Could not parse {extensions_json_path}. Please fix the JSON manually.", file=sys.stderr)
            sys.exit(1)

    # Remove any existing entry for our extension (by its ID)
    # This ensures we don't have duplicate or stale entries for our extension
    extensions_manifest = [
        ext for ext in extensions_manifest
        if ext.get("identifier", {}).get("id") != our_extension_full_id
    ]

    # Add the new entry for our extension with the correct schema
    new_manifest_entry = {
        "identifier": {
            "id": our_extension_full_id,
            "uuid": our_extension_uuid
        },
        "version": version,
        "location": {
            "$mid": 1,
            "path": target_extension_path,
            "scheme": "file"
        },
        "relativeLocation": full_extension_dir_name,
        "metadata": {
            "isApplicationScoped": True,
            "isMachineScoped": True,
            "isBuiltin": False, # Our custom extension is not built-in
            "installedTimestamp": int(time.time() * 1000),
            "source": "undefined", # Or "local" if preferred
            "id": our_extension_uuid, # This should be the UUID
            "publisherId": publisher,
            "publisherDisplayName": display_name,
            "targetPlatform": "undefined", # Or detect platform if needed
            "updated": False,
            "private": False,
            "isPreReleaseVersion": False,
            "hasPreReleaseVersion": False
        }
    }

    extensions_manifest.append(new_manifest_entry)

    try:
        with open(extensions_json_path, 'w') as f:
            json.dump(extensions_manifest, f, indent=4)
        print(f"Successfully updated {extensions_json_path}")
    except Exception as e:
        print(f"Error writing to {extensions_json_path}: {e}", file=sys.stderr)
        sys.exit(1)

    print("Syntax highlighting extension installed successfully!")
    print("Please restart VS Code to apply changes.")

if __name__ == "__main__":
    install_syntax_extension()