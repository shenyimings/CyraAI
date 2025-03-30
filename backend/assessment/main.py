import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from github_user_info import GithubInfoFetcher
from evaluator import Evaluator
from common import parse_json

app = Flask(__name__)

load_dotenv()
ACCESS_TOKEN = os.environ.get("ACCESS_TOKEN")
API_KEY = os.environ.get("API_KEY")
headers = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Accept": "application/vnd.github+json"
}

@app.route("/parse_github_user", methods=["POST"])
def parse_github_user():
    body = request.get_json()
    username = body["username"]
    if not username:
        return jsonify({"error": "请提供有效的用户名"}), 400
    
    github_info_fetcher = GithubInfoFetcher(ACCESS_TOKEN, headers)
    user_info_res, repos_info_res, commits_count_res = github_info_fetcher.analyze_github_user(username)
    result = {
        "user_info": user_info_res,
        "repos_info": repos_info_res,
        "commits_count": commits_count_res
    }
    return jsonify(result)

@app.route("/llm_analyze_info", methods=["POST"])
def llm_analyze_info():
    all_info = request.get_json()
    if not all_info:
        return jsonify({"error": "请提供有效的信息"}), 400
    
    github_info = all_info["github_info"]
    resume_summary = all_info["resume_summary"]
    qa_resp = all_info["qa_resp"]
    job_description = all_info["job_description"]

    evaluator = Evaluator(API_KEY)
    content = evaluator.run(github_info, resume_summary, qa_resp, job_description)
    res = parse_json(content)
    return jsonify(res)
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8080)
