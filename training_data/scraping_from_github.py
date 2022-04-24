from tkinter import Y
import requests
import os
from dotenv import load_dotenv
import json
import time

load_dotenv()

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")


def get_file_from_link(link):
    """
    get_file_from_link safely gets a response from a link with custom waiting to work with rate limits.
    """
    time.sleep(4)
    headers = {"Authorization": f"Token {ACCESS_TOKEN}"}
    response = requests.request("GET", link, headers=headers)

    if "documentation_url" in response.json():
        while "documentation_url" in response.json():
            time.sleep(10)
            response = requests.request("GET", link)
            print(f"trying again for link {link}")
    return response


# Include sha for unique idenitification purposees
def get_file(link, language, sha):
    """
    get_file gets a file and downloads it with the associated link given a url to a file.
    """
    response = get_file_from_link(link)

    print(response.json().keys(), "got file", response.json()["download_url"])

    download_url = response.json()["download_url"]
    name = response.json()["name"]
    time.sleep(10)

    file_contents = requests.request("GET", download_url)
    with open(f"{language}/{name}-sha-{sha}.txt", "w") as tempfile:
        tempfile.write(file_contents.text)


def get_by_language(language, num_iterations):
    url = f"https://api.github.com/search/code?q=a+language:{language}"
    headers = {"Authorization": f"Token {ACCESS_TOKEN}"}

    time.sleep(4)
    response = requests.request("GET", url, headers=headers)

    loaded_response = response.json()

    if "documentation_url" in loaded_response:
        while "documentation_url" in loaded_response:
            time.sleep(10)
            response = requests.request("GET", url, headers=headers)

            loaded_response = response.json()
            print("trying again...", loaded_response)

    print(
        loaded_response.keys(),
        f"Got something for {language} with {len(loaded_response['items'])} counts",
    )
    with open("sample.txt", "w") as testfile:
        testfile.write(json.dumps(loaded_response))
    temp = 0
    for item in loaded_response["items"]:
        link = item["url"]
        get_file(link, language)
        temp += 1
        if temp >= num_iterations:
            break


#
def get_repos(language, search_query, num_repos=3):
    """
    get_repos gets files with a certain language and search query from github.
    """
    url = f"https://api.github.com/search/repositories?q={search_query}+language:{language}"
    response = get_file_from_link(url)

    response_json = response.json()

    # Write down json_received for debugging purposes
    with open("sample.txt", "w") as testfile:
        testfile.write(json.dumps(response_json))

    # counter to get certain number of repos
    counter = 0

    for repo in response_json["items"]:

        repo_name = repo["full_name"]

        files_to_get_by_language_url = f"https://api.github.com/search/code?q=+language:{language}+repo:{repo_name}"

        files_to_get = get_file_from_link(files_to_get_by_language_url).json()

        for file in files_to_get["items"]:
            get_file(file["url"], language, file["sha"])

        counter += 1

        if counter == num_repos:
            return


# "c", "java", "python", "c++"
accepted_languages = ["ocaml"]

for i in accepted_languages:
    get_repos(i, "a", num_repos=5)
