#!/usr/bin/env python3

import subprocess
import sys
from pathlib import Path

name = sys.argv[1]
subprocess.run(["compiler/src/main.py", Path("./test").joinpath(name).absolute(), Path("./test").joinpath(name).joinpath("out.js").absolute()], check=True)
subprocess.run(["node", Path("./test").joinpath(name).joinpath("out.js").absolute()], check=True)
