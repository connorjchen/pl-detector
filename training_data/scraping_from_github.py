import requests
import os
from dotenv import load_dotenv
import json
import time

load_dotenv()

ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')


def get_file(link, language):
    time.sleep(4)
    response = requests.request("GET", link)

    if "documentation_url" in response.json():
        while "documentation_url" in response.json():
            time.sleep(10)
            response = requests.request("GET", link)
            print("trying again...")

    print(response.json().keys(), "got file", response.json()["download_url"])

    download_url = response.json()["download_url"]
    name = response.json()["name"]
    time.sleep(10)

    file_contents = requests.request("GET", download_url)
    with open(f'{language}/{name}.txt', "w") as tempfile:
        tempfile.write(file_contents.text)


def get_by_language(language, num_iterations):
    url = f"https://api.github.com/search/code?q=a+language:{language}"
    headers = {
        'Authorization': f'Token {ACCESS_TOKEN}'
    }

    time.sleep(4)
    response = requests.request("GET", url, headers=headers)

    loaded_response = response.json()

    if "documentation_url" in loaded_response:
        while "documentation_url" in loaded_response:
            time.sleep(10)
            response = requests.request("GET", url, headers=headers)

            loaded_response = response.json()
            print("trying again...", loaded_response)

    print(loaded_response.keys(),
          f"Got something for {language} with {len(loaded_response['items'])} counts")
    with open("sample.txt", "w") as testfile:
        testfile.write(json.dumps(loaded_response))
    temp = 0
    for item in loaded_response["items"]:
        link = item["url"]
        get_file(link, language)
        temp += 1
        if temp >= num_iterations:
            break

# Python, Java, C++


accepted_languages = ["c", "ocaml"]
for i in accepted_languages:
    get_by_language(i, 100)
