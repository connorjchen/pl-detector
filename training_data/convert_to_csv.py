import pandas as pd
import os

df = pd.DataFrame(columns=["contents", "language"])

for folder in next(os.walk('.'))[1]:
    file_list = next(os.walk(f'./{folder}'))[2]

    content_list = []
    for f in file_list:
        with open(f'./{folder}/{f}', 'r') as tempfile:
            contents = tempfile.read()
            content_list.append(contents)

    df2 = pd.DataFrame({"contents": content_list,
                        "language": [f"{folder}"] * len(content_list)})
    df = pd.concat([df, df2], ignore_index=True)

df.to_csv("data_set.csv", index=None)
