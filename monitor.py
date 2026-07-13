from pathlib import Path
import logging
import time

project_dir = Path(".")
log_dir = Path("log")
log_dir.mkdir(exist_ok=True)

logging.basicConfig(
    filename = log_dir / "monitor.log",
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)


ignore_dir = {
    ".git",
    "node_modules",
    "log"
}

ignore_files = {
    ".env",
    "README.md",
    ".dockerignore",
    "agent.py",
    ".gitignore"
    
}

def scan_files():
    files = {}

    for file in project_dir.rglob("*"):
        if file.is_dir():
            continue
        if file.name in ignore_files:
            continue
        if any(part in ignore_dir for part in file.parts):
            continue
        files[file] = file.stat().st_mtime

    return files

def detect_changes(previous,current):
    previous_files = set(previous.keys())
    current_files = set(current.keys())

    for file in current_files - previous_files:
         logging.info(f"New file: {file}")
    for file in previous_files - current_files  :
         logging.info(f"Delete file: {file}")
    for file in current_files & previous_files:
         if  (previous[file] != current [file]):
             logging.info(f"Modified: {file}")

def monitor():
    logging.info("Project monitoring started")

    previous = scan_files()

    while True:
        time.sleep(5)

        current = scan_files()

        if previous != current:
            logging.info("Changes detected")
            detect_changes(previous,current)
        
        previous = current

def main():
    monitor()
    
main()
