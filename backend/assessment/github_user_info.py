import requests
import base64
from datetime import datetime, timedelta

class GithubInfoFetcher:
    def __init__(self, access_token: str, headers: dict):
        self.access_token = access_token
        self.headers = headers
        pass

    def request_by_api(self, url: str) -> dict:
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            r = response.json()
            return r
        except requests.exceptions.HTTPError as http_err:
            print(f"HTTP 错误发生: {http_err}")
        except requests.exceptions.RequestException as req_err:
            print(f"请求错误发生: {req_err}")
        except ValueError as json_err:
            print(f"JSON 解析错误发生: {json_err}") 
    
    def get_commits_info_in_ninety_days(self, username: str) -> dict:
        ninety_days_ago = (datetime.now() - timedelta(days=90)).strftime("%Y-%m-%d")
        page = 1
        url = f"https://api.github.com/search/commits?q=author:{username}+committer-date:>={ninety_days_ago}&page={page}&per_page=100"
        get_commits_info_in_ninety_days = self.request_by_api(url)
        return get_commits_info_in_ninety_days
    
    def get_all_commits_info(self, username: str) -> dict:
        ninety_days_ago = (datetime.now() - timedelta(days=90)).strftime("%Y-%m-%d")
        page = 1
        url = f"https://api.github.com/search/commits?q=author:{username}&page={page}&per_page=100"
        all_commits_info = self.request_by_api(url)
        return all_commits_info

    def parse_commits_info(self, commits_info: dict) -> int:
        return commits_info["total_count"]

    def get_user_repos(self, repos_url: str) -> dict:
        repos_info = self.request_by_api(repos_url)
        return repos_info
    
    def get_repo_readme(self, repo_readme_url: str) -> dict:
        repo_readme = self.request_by_api(repo_readme_url)
        return repo_readme
    
    def get_repo_languages(self, languages_url: str) -> dict:
        languages = self.request_by_api(languages_url)
        return languages
    
    def parse_repos_info(self, repos_info: list) -> dict:
        repos_info_res = {}
        for repo in repos_info:
            full_name = repo["full_name"]

            is_fork = repo["fork"]
            if is_fork:
                continue

            stargazers_count = repo["stargazers_count"]
            watchers_count = repo["watchers_count"]
            forks_count = repo["forks_count"]
            open_issues_count = repo["open_issues_count"]
            description = repo["description"]

            main_language = repo["language"]
            languages_url = repo["languages_url"]
            languages = self.get_repo_languages(languages_url)

            contents_url = repo["contents_url"]
            repo_readme_url = contents_url.replace("{+path}", "README.md")
            try:
                repo_readme = self.get_repo_readme(repo_readme_url)
                repo_readme_content = base64.b64decode(repo_readme["content"]).decode("utf-8")
            except Exception as e:
                repo_readme_content = ""

            repos_info_res[full_name] = {
                # "is_fork": is_fork, 
                "stars_count": stargazers_count, 
                "watchers_count": watchers_count,
                "forks_count": forks_count,
                "open_issues_count": open_issues_count,
                "main_language": main_language,
                "languages": languages,
                "description": description,
                "readme_content": repo_readme_content
            }
        
        return repos_info_res
    
    def get_user_info(self, user_name: str) -> dict:
        url = f"https://api.github.com/users/{user_name}"
        user_info = self.request_by_api(url)
        return user_info
    
    def parse_user_info(self, user_info: dict) -> dict:
        user_name = user_info["login"]
        followers = user_info["followers"]
        following = user_info["following"]
        public_gists = user_info["public_gists"]
        public_repos = user_info["public_repos"]
        user_info_res = {
            "user_name": user_name,
            "followers": followers,
            "following": following,
            "public_gists": public_gists,
            "public_repos": public_repos
        }
        return user_info_res

    def analyze_github_user(self, user_name: str):
        user_info = self.get_user_info(user_name)
        user_info_res = self.parse_user_info(user_info)

        repos_url = user_info["repos_url"]
        repos_info = self.get_user_repos(repos_url)
        repos_info_res = self.parse_repos_info(repos_info)

        get_commits_info_in_ninety_days = self.get_commits_info_in_ninety_days(user_info["login"])
        commits_in_ninety_days_count = self.parse_commits_info(get_commits_info_in_ninety_days)
        all_commits_info = self.get_all_commits_info(user_info["login"])
        commits_total_count = self.parse_commits_info(all_commits_info)
        commits_count_res = {
            "total_count": commits_total_count,
            "within_90_days": commits_in_ninety_days_count
        }

        return user_info_res, repos_info_res, commits_count_res


