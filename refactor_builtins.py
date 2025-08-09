
import os
import re
from difflib import unified_diff

# List of built-in functions to refactor
BUILTINS = [
    "print", "prompt", "stdin", "is_tty", "concat", "any", "all", "eq", "asc",
    "add", "mod", "none", "values", "keys", "zip", "join", "sort", "push",
    "reverse", "split", "trim", "slice"
]

CONTEXT_LINES = 3 # Number of lines to show before and after the change

def display_context(lines, current_line_index, proposed_line):
    start = max(0, current_line_index - CONTEXT_LINES)
    end = min(len(lines), current_line_index + CONTEXT_LINES + 1)

    print("\n--- Context ---")
    for i in range(start, end):
        if i == current_line_index:
            print(f">>> {i+1}: {lines[i].removesuffix('\n')} (Original)")
            print(f"<<< {i+1}: {proposed_line.removesuffix('\n')} (Proposed)")
        else:
            print(f"    {i+1}: {lines[i].removesuffix('\n')}")
    print("---------------")

def refactor_file(file_path):
    with open(file_path, 'r') as f:
        original_lines = f.readlines()

    new_lines = list(original_lines) # Start with a copy of original lines
    file_changed = False

    for i, line in enumerate(original_lines):
        change_found_for_line = False
        for builtin in BUILTINS:
            if re.search(rf"^\t*{re.escape(builtin)}(\s|$)", line) and not line.strip().startswith("a "):
                leading_tabs = re.match(r"^\t*", line).group(0)
                rest_of_line = line[len(leading_tabs):]
                proposed_modified_line = f"{leading_tabs}a {rest_of_line}"

                display_context(original_lines, i, proposed_modified_line)
                
                while True:
                    user_input = input("Apply this change? (y/n/c for more context): ").lower()
                    if user_input == 'y':
                        new_lines[i] = proposed_modified_line
                        file_changed = True
                        change_found_for_line = True
                        print("Change applied.")
                        break
                    elif user_input == 'n':
                        print("Change skipped for this line.")
                        change_found_for_line = True
                        break
                    elif user_input == 'c':
                        global CONTEXT_LINES
                        CONTEXT_LINES += 5 # Increase context by 5 lines
                        display_context(original_lines, i, proposed_modified_line)
                    else:
                        print("Invalid input. Please enter 'y', 'n', or 'c'.")
                break # Only consider one builtin per line
        if change_found_for_line:
            # Reset CONTEXT_LINES for the next potential change
            CONTEXT_LINES = 3

    if file_changed:
        with open(file_path, 'w') as f:
            f.writelines(new_lines)
        print(f"Successfully updated {file_path}")
    else:
        print(f"No changes applied to {file_path}")
    return file_changed

def main():
    tests_dir = "tests"
    total_files_changed = 0
    for root, _, files in os.walk(tests_dir):
        for file in files:
            if file.endswith(".67lang"):
                file_path = os.path.join(root, file)
                print(f"\nProcessing file: {file_path}")
                if refactor_file(file_path):
                    total_files_changed += 1
    print(f"\nRefactoring complete. Total files changed: {total_files_changed}")

if __name__ == "__main__":
    main()
