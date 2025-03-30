from openai import OpenAI

class Chat:
    def __init__(self, api_key: str, base_url: str = "https://api.deepseek.com") -> None:
        self.client = OpenAI(api_key=api_key, base_url=base_url)

    def ask(self, system_prompt: str, user_prompt: str) -> str:
        try:
            response = self.client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                stream=False
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error while making API request: {e}")
            return "error"
