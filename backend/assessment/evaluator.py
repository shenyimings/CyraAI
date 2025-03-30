
from chat import Chat

class Evaluator:
    def __init__(self, api_key: str):
        self.chat = Chat(api_key)
        pass

    def run(self, github_info: dict, resume_summary: str, qa_resp: str, job_description: str) -> str:
        system_prompt = "You are a blockchain recruitment expert with deep knowledge of blockchain technology and the ability to identify blockchain talent."

        user_prompt = f'''
Please evaluate the candidate's blockchain-related capabilities and determine their suitability for the provided job description (JD) based on three dimensions: their GitHub information, their resume summary, and their Q&A responses. Assign a comprehensive score (out of 100) based on their overall ability and job fit. Additionally, categorize their skill level as one of the following: Amateur, Junior, Intermediate, or Senior.
GitHub user information includes:
    - User Information: Number of followers and following, number of repositories, number of Gist code snippets.
    - Repository Information: Description, README, number of stars, watchers, issues, forks, programming languages used, and the primary language of each repository.
    - Commit Activity: Total number of commits and the number of commits in the last three months.

Expected Output Example:
{{
    "ability_level": "Intermediate",
    "comments": "Based on the analysis of the user's GitHub information, the user has some experience in blockchain development and has studied Web3.0-related development. They have created an original decentralized voting system and developed smart contracts using Solidity. Their project has received 50 stars on GitHub, indicating a certain level of influence. However, the user's community contributions are relatively low (e.g., infrequent code commits and a limited number of original projects). If they increase their open-source contributions and project maintenance efforts, they have the potential to advance to a senior developer role. Based on the analysis of the user's resume, the user... Based on the analysis of the user's Q&A responses, ... Overall, this candidate has a relatively intermediate degree of fit with this position.",
    "matching_score": 65
}}

All provided information is as follows:
# Job Description
{job_description}

# GitHub user information:
{github_info}

# Resume summary:
{resume_summary}

# Q&A responses:
{qa_resp}
'''
        content = self.chat.ask(system_prompt, user_prompt)
        return content

