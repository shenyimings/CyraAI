
from chat import Chat

class Evaluator:
    def __init__(self, api_key: str):
        self.chat = Chat(api_key)
        pass

    def run(self, github_info: dict):
        system_prompt = "You are a blockchain recruitment expert with deep knowledge of blockchain technology and the ability to identify blockchain talent."
        user_prompt = f'''
Please evaluate a GitHub user's blockchain-related skills based on the following information:
    - User Information: Number of followers and following, number of repositories, number of Gist code snippets.
    - Repository Information: Description, README, number of stars, watchers, issues, forks, programming languages used, and the primary language of each repository.
    - Commit Activity: Total number of commits and the number of commits in the last three months.
The user's blockchain capability should be scored on a scale of 100 points and classified into one of the following levels: Amateur, Beginner, Intermediate, Advanced.

Expected Output Example:
{{
    "score": 75,
    "level": "Intermediate",
    "evaluation": "This user has a certain level of blockchain development experience, has participated in CTF-related security challenges, and has learned Web3.0 development. They have built an original decentralized voting system and developed smart contracts using Solidity. Their projects have received 50 stars on GitHub, indicating some influence. However, their community contributions are relatively low (e.g., infrequent commits, few original projects). Increasing open-source contributions and project maintenance could help them advance to the Advanced level."
}}

# GitHub user information:
{github_info}
'''
        content = self.chat.ask(system_prompt, user_prompt)
        return content

