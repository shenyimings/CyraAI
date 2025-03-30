# -*- coding: utf-8 -*-
# @Author  : Liu Yongkun
# @Time    : 2025/3/30 19:40
# @File    : LLM.py
# @Software: PyCharm
# Please install OpenAI SDK first: `pip3 install openai`

from openai import OpenAI
import requests
import time
import os
import re

proxy = {
    'http': 'http://127.0.0.1:7890',
    'https': 'http://127.0.0.1:7890'
}
api_url = 'https://www.gptapi.us/v1/chat/completions'
api_key = os.environ.get("GPTAPI_TOKEN")
print(api_key)


# client = OpenAI(api_key="sk-9a1a37418894465fa68fc13be574cbb3", base_url="https://api.deepseek.com")
#
# response = client.chat.completions.create(
#     model="deepseek-chat",
#     messages=[
#         {"role": "system", "content": "You are a helpful assistant"},
#         {"role": "user", "content": "Hello"},
#     ],
#     stream=False
# )
#
# print(response.choices[0].message.content)

def get_response(prompt):
    # time.sleep(random.randint(20,60))
    attempts = 5  # 设置最大尝试次数
    request_input = [{"role": "user", "content": prompt}]
    for attempt in range(attempts):
        try:
            # GPTAI
            response = requests.post(api_url, json={
                'model': 'deepseek-v3',
                # 'model': 'gpt-4o-mini',
                # 'model': 'gpt-3.5-turbo',
                # 'model': 'gpt-3.5-turbo',
                'messages': request_input,
                'max_tokens': 16000,
            }, headers={'Authorization': api_key}, proxies=proxy)

            # deepseek-coder deepseek_api_key
            # response = requests.post(deepseek_api_url, json={
            #     'model': 'deepseek-coder',
            #     # 'model': 'gpt-3.5-turbo',
            #     # 'model': 'gpt-3.5-turbo',
            #     'messages': request_input,
            #     # 'max_tokens': 16000,
            # }, headers={'Authorization': deepseek_api_key}, proxies=proxy)

            # print(response.json())
            response_str = response.json()["choices"][0]["message"]["content"]
            return response_str

        except Exception as e:
            print(f"请求失败: {e}. 尝试 {attempt + 1}/{attempts}...")
            time.sleep(20)  # 等待10秒后重试

    return None  # 如果所有尝试都失败，返回None

Q3_prompt = """
你是一个招聘面试官，招聘的Job Description如下：
{JD}

面试者的简历如下：

{CV}

现在开始进行面试，结合Job Description和简历，对被招聘者进行提问，挖出面试官可能感兴趣的信息。进行3个问题的提问。注意，结合Job Description，因为Job Description是面试官最关注的问题。

请直接提出三个问题
按照以下MarkDown格式：
# Q1
(详细提问)
# Q2
(详细提问)"""

JD = """区块链安全研究员／负责人 入职新加坡

责任

负责区块链安全研究和代码安全审计;

探索区块链等前沿技术，提前规划布局和实施;

负责区块链相关漏洞挖掘和分析，如交易所、钱包、智能合约等。

要求

至少拥有计算机科学或工程学士学位

5年或以上经验

精通一种或多种编程语言的Golang/C++/JavaScript/Java/Python/Rust

熟练掌握至少一个安全领域的漏洞挖掘和分析技能

具备良好的英语沟通和程序材料写作技巧对于这个角色至关重要

对新技术敏感和感兴趣，对区块链安全技术有浓厚的兴趣

熟悉比特币、以太坊等主流区块链技术及相关机制原理

对不同类型的软件有最新的了解，并且在任何操作系统，软件（二进制或Web）应用程序或区块链上执行漏洞发现方面经验丰富。
"""

CV = """基本信息
26岁
 本科汉)广东省广州市
X)176000176000
me@huanzhucv.com
求职意向
X 全职
X前端开发
X上海
8K-10K
4一周内
教育背景
2016.09-2020.06广州幻主简历大学软件工程(本科)GPA:3.6/4.0(专业前10%)，所学课程:C/C++/JAVA程序设计，计算机组成原理，数据结构与算法，数据通信与计算机网络，操作系统，面向对象技术，软件工程，编译技术，数据库概论，智能手机编程，
工作经验
2019.01-2019.06广州幻主简历制作公司前端开发研发部负责公司的区块链项目C bank以及BIT STAR的开发以及维护工作， 完成所有项目的PC前端以及APP HTML 5的开发及维护工作:使用HTML5、CSS 3以及javascript完成web界面布局开发，参与研发部门的产品及项目研发，曹的合团队实现产品界面布局及功能实现:
负责WEB前端HTML 5/JS/CSS 3代码的编写， Ajax与后台的技术更新，应用JavaScript和相关技术与后台进行交互通信，JS框 10:架定义、设计、实现，增强网站的用户体验;根据产品需求， 使用React搭建前端页面， 使用ncde JS完成后台接口服务，包括币币交易、合约交易、差价合约、动态限价机制等;配合后台开发人员共同完成项目或者产品，主要负责页面的制作、交互、特效及用户效果体验，对重复的效果进行封装，优化页面。使用esxi作为底层驱动，构建centOs，使用docker部署基本服务，完成服务器搭建，确保正常播控任务。
广州幻主简历制作公司2018.09-2019.01前端开发实习生深入理解公司的业务产品需求，能针对性的做出准确的技术决策， 参与公司电商交易平台PC端和移动端的商城前端web页面设计和开发:负责公司专题项目的动画交互以及交易数据平台可视化交互实现，并能根据自己的经验和见解提出更合理的方案:
按照需求独立完成公司的静态网页制作，编写静态页面， 运用j Query及插件开发动效:根据产品需要，协助上级配合U设计师实现呈现的效果，包括完成网站前端页面的布局和特效及交互效果，对设计稿进行切片和布局;配合后台开发同事实现产品交互功能，对页面样式和交互效果进行分析与调试，解决工作中出现的bug， 利用ajax异步请求数据，进行前后端数据交互。
自我评价
熟悉Java， Node.Js,JavaScript,PHP、CSS 3,Ajax，熟练使用de dec ms，phpcms建站系统，熟悉linux命令及 linux下网站环境的搭建及布署，Cet-6，英语技术交流无碍。
"""

def get_Q3(JD = None,CV = None):
    text = Q3_prompt.format(JD = JD,CV = CV)
    Q3_raw = get_response(text)
    # 使用正则表达式进行解析

    sections = re.split(r'# Q\d+', Q3_raw)
    questions = [q.strip() for q in sections if q.strip()]
    return questions

# print(get_Q3(JD,CV))