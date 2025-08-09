#!/usr/bin/env python3

import os
import sys
import json
import urllib.request

REPO_OWNER = "statuscallh8r"
REPO_NAME = "language"
ISSUES_DIR = ".github/issues"

def download_issue(issue_number):
    api_url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues/{issue_number}"
    
    try:
        with urllib.request.urlopen(api_url) as response:
            data = json.loads(response.read().decode())
    except urllib.error.URLError as e:
        print(f"Error fetching issue {issue_number}: {e}", file=sys.stderr)
        sys.exit(1)

    if "message" in data and data["message"] == "Not Found":
        print(f"Issue {issue_number} not found.", file=sys.stderr)
        sys.exit(1)

    # Create the directory if it doesn't exist
    os.makedirs(ISSUES_DIR, exist_ok=True)

    output_filename = os.path.join(ISSUES_DIR, f"issue_{issue_number}.md")

    with open(output_filename, "w", encoding="utf-8") as f:
        f.write(f"# Issue #{data['number']}: {data['title']}\n\n")
        f.write(f"**State:** {data['state']}\n")
        f.write(f"**Author:** {data['user']['login']}\n")
        f.write(f"**Created At:** {data['created_at']}\n")
        if data['updated_at']:
            f.write(f"**Updated At:** {data['updated_at']}\n")
        if data['closed_at']:
            f.write(f"**Closed At:** {data['closed_at']}\n")
        
        labels = ", ".join([label['name'] for label in data['labels']])
        if labels:
            f.write(f"**Labels:** {labels}\n")
        
        if data['milestone']:
            f.write(f"**Milestone:** {data['milestone']['title']}\n")
        
        if data['assignee']:
            f.write(f"**Assignee:** {data['assignee']['login']}\n")
        elif data['assignees']:
            assignees = ", ".join([assignee['login'] for assignee in data['assignees']])
            f.write(f"**Assignees:** {assignees}\n")

        f.write(f"\n---\n\n")
        f.write(data['body'] if data['body'] else "_No description provided._")
        f.write(f"\n\n---\n\n")

        # Fetch comments
        comments_url = data['comments_url']
        try:
            with urllib.request.urlopen(comments_url) as response:
                comments_data = json.loads(response.read().decode())
        except urllib.error.URLError as e:
            print(f"Error fetching comments for issue {issue_number}: {e}", file=sys.stderr)
            # Continue without comments if there's an error

        if comments_data:
            f.write("## Comments\n\n")
            for comment in comments_data:
                f.write(f"### Comment by {comment['user']['login']} at {comment['created_at']}\n")
                f.write(comment['body'] if comment['body'] else "_No comment body._")
                f.write("\n\n---\n\n")
        else:
            f.write("_No comments._\n")

    print(f"Successfully downloaded issue {issue_number} to {output_filename}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: ./download_github_issue.py <issue_number>", file=sys.stderr)
        sys.exit(1)
    
    try:
        issue_num = int(sys.argv[1])
        download_issue(issue_num)
    except ValueError:
        print("Error: Issue number must be an integer.", file=sys.stderr)
        sys.exit(1)
