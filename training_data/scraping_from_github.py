import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()

ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')


def get_file(link):
    response = requests.request("GET", link)

    print(response.json().keys())

    download_url = response.json()["download_url"]
    name = response.json()["name"]

    file_contents = requests.request("GET", download_url)

    with open(f'{name}.txt', "w") as tempfile:
        tempfile.write(file_contents.text)


def get_by_language(language, num_iteations):
    url = f"https://api.github.com/search/code?q=addClass +in:file +language:{language}"

    headers = {
        'Authorization': f'Token {ACCESS_TOKEN}'
    }

    response = requests.request("GET", url, headers=headers)

    loaded_response = response.json()

    print(loaded_response.keys())

    temp = 0
    for item in loaded_response["items"]:
        link = item["url"]
        get_file(link)
        temp += 1
        if temp >= num_iteations:
            break
