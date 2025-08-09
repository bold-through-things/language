import subprocess
import sys

def run_command(command):
    """Runs a command and prints its output in real-time."""
    print(f"Running command: {command}")
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    while True:
        output = process.stdout.readline()
        if output == '' and process.poll() is not None:
            break
        if output:
            print(output.strip())
    rc = process.poll()
    if rc != 0:
        print(f"Command failed with exit code {rc}")
        sys.exit(rc)

def main():
    """Sets up the development environment for the 67lang project."""

    print("Starting 67lang development environment setup...")

    # 1. Install Python 3.13
    print("\n--- Installing Python 3.13 ---")
    run_command("sudo apt-get update && sudo apt-get install -y software-properties-common")
    run_command("sudo add-apt-repository -y ppa:deadsnakes/ppa")
    run_command("sudo apt-get install -y python3.13 python3.13-venv")

    # 2. Add NodeSource repository and install Node.js
    print("\n--- Installing Node.js and npm ---")
    print("Adding NodeSource repository...")
    run_command("curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -")
    print("Installing Node.js...")
    run_command("sudo apt-get install -y nodejs")

    # 3. Install Deno
    print("\n--- Installing Deno ---")
    run_command("curl -fsSL https://deno.land/x/install/install.sh | sh")

    # 4. Install Gemini CLI
    print("\n--- Installing Gemini CLI ---")
    run_command("npm install -g @google/gemini-cli")

    # 5. Set GOOGLE_CLOUD_PROJECT in .bashrc
    print("\n--- Configuring Google Cloud Project ID ---")
    project_id = "build-quality-software-67"
    bashrc_command = f'echo \'export GOOGLE_CLOUD_PROJECT="{project_id}"\' >> ~/.bashrc'
    run_command(bashrc_command)
    print(f"Added GOOGLE_CLOUD_PROJECT={project_id} to ~/.bashrc")


    print("\nSetup complete! You should now be able to run the tests with ./test")
    print("Make sure to add ~/.deno/bin to your PATH.")
    print("You may need to restart your shell for the changes to take effect (or run 'source ~/.bashrc').")

if __name__ == "__main__":
    main()
