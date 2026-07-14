from pathlib import Path
import os
import smtplib

from dotenv import load_dotenv

from email.message import EmailMessage

load_dotenv(".agent.env")


sender = os.getenv("EMAIL_SENDER")
password = os.getenv("EMAIL_PASSWORD")
receiver = os.getenv("EMAIL_RECEIVER")

path = Path("log") / "monitor.log"

if not path.exists():
    print("monitor.log is not present")
    exit (1)

new_files = []
modified_files=[]
delete_files = []

with open(path,"r") as file:
    lines = file.readlines()
    for line in lines:
        if "New file" in line:
            new_files.append(line.split("New file:")[1].strip())
        elif "Modified" in line:
            modified_files.append(line.split("Modified:")[1].strip())
        elif "Delete file" in line:
            delete_files.append(line.split("Delete file:")[1].strip())


docker_changed = False
dependencies_changed = False
source_changed = False


for files in modified_files:
    if files == "Dockerfile":
        docker_changed = True
    elif files.endswith(".json"):
        dependencies_changed = True
    elif files.endswith(".js"):
        source_changed = True

recommendations = []

if docker_changed:
    recommendations.append("Rebuild Docker image")

if dependencies_changed:
    recommendations.append("Install updated dependencies")

if source_changed:
    recommendations.append("Run application tests")


def report():
    text = "Project Change Report\n\n"

    if docker_changed:
        text += "Docker configuration changed\n"

    if dependencies_changed:
        text += "Dependencies changed\n"

    if source_changed:
        text += "Source code changed\n"

    text += "\nRecommendations:\n"

    for item in recommendations:
        text += f"{item}\n"

    return text

def send_email(report):

    message = EmailMessage()

    message["From"] = sender
    message["To"] = receiver
    message["Subject"] = "Project Changes Detected"

    message.set_content(report)


    with smtplib.SMTP_SSL(
        "smtp.gmail.com",
        465
    ) as server:

        server.login(
            sender,
            password
        )

        server.send_message(message)

    print("Email sent successfully")

report_text = report()
send_email(report_text)