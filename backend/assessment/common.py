import json
import re

def read_from_json(file_path: str) -> dict:
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data

def write_to_json(data: dict, file_path: str):
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

def write_to_txt(data, file_path: str):
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(data)

def read_from_txt(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        data = f.read()
    return data

def parse_json(json_str: str) -> dict:
    try:
        data = json.loads(json_str)
    except:
        data = re.findall(r"(\{[\w\W]*?\})", json_str)[0]
        data = eval(data)
    return data
