import requests
import os
from dotenv import load_dotenv
import json
import time

load_dotenv()

ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')


def get_file(link, language):
    time.sleep(1)
    response = requests.request("GET", link)

    print(response.json().keys())

    download_url = response.json()["download_url"]
    name = response.json()["name"]
    time.sleep(1)

    file_contents = requests.request("GET", download_url)

    with open(f'{language}/{name}.txt', "w") as tempfile:
        tempfile.write(file_contents.text)


def get_by_language(language, num_iterations):
    url = f"https://api.github.com/search/code?q=addClass +in:file +language:{language}"

    headers = {
        'Authorization': f'Token {ACCESS_TOKEN}'
    }

    time.sleep(1)
    response = requests.request("GET", url, headers=headers)

    loaded_response = response.json()

    if "documentation_url" in loaded_response:
        print(loaded_response)

    print(loaded_response.keys())

    temp = 0
    for item in loaded_response["items"]:
        link = item["url"]
        get_file(link, language)
        temp += 1
        if temp >= num_iterations:
            break


accepted_languages = ["python", "java", "c++", "c", "ocaml"]
for i in accepted_languages:
    get_by_language(i, 8)
