#!/bin/bash

# the idea here is to test if bash would be able to process the current language.
# no, this shit doesn't work, yet. TODO!

# i think i might have to steal the "indented string literals" idea from YAML. it would simplify
# """parsing""" (read: skipping shit you don't comprehend) in a sh** lang (and no, i don't mean shell)
# such as bash.

# Read the input file line by line
input_file="input.txt"
output_file="output.txt"

# Initialize a flag to track whether we are inside a "twice" block
inside_twice=false
indent_level=0

# Process the input file line by line
while IFS= read -r line; do
    # Determine the indentation level (count leading spaces)
    current_indent=$(echo "$line" | sed -E 's/[^\t]+$//g' | wc -c)

    echo $line indent amount $current_indent

    # Adjust indent level based on line indentation
    if [[ "$current_indent" -gt "$indent_level" ]]; then
        indent_level=$current_indent
    fi

    # Check if the current line is a "twice" node
    if [[ "$line" == "twice" ]]; then
        inside_twice=true
        continue  # Skip this line, we'll handle it below
    fi

    if [[ "$inside_twice" == true ]]; then
        # Copy the content inside the "twice" block
        if [[ -n "$line" ]]; then
            echo "$line" >> "$output_file"
            echo "$line" >> "$output_file"
        fi
    else
        # Otherwise, write the line as-is to the output file
        echo "$line" >> "$output_file"
    fi

    # If we encounter an empty line or end of block, reset the "twice" flag
    if [[ -z "$line" || "$line" =~ ^\s*$ ]]; then
        inside_twice=false
    fi
done < "$input_file"
