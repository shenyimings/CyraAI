#!/usr/bin/env python
# pylint: disable=unused-argument
# This program is dedicated to the public domain under the CC0 license.

from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext
from telegram.request import HTTPXRequest
import re
from telegram.ext import ConversationHandler
import sys
import LLM
import pymupdf4llm
import json
import os

import pathlib

# 替换为你的 Bot API Token

TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
PROXY_URL = "http://127.0.0.1:7890"
import os

import logging
from datetime import datetime

# 创建 logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# 文件处理器
file_handler = logging.FileHandler("telegram_bot.log", encoding='utf-8')
file_formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(file_formatter)
logger.addHandler(file_handler)

# 控制台处理器
console_handler = logging.StreamHandler(sys.stdout)
console_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console_handler.setFormatter(console_formatter)
logger.addHandler(console_handler)


async def start(update: Update, context: CallbackContext) -> int:
    """处理/start命令，支持带职位码参数直接启动流程"""
    args = context.args
    user = update.effective_user
    # print(f"🔍 用户ID: {user.id}, 用户名: {user.username}, 名字: {user.full_name}")
    context.user_data["user_id"] = user.id
    context.user_data["user_username"] = user.username
    context.user_data["user_full_name"] = user.id

    logger.info(f"/start 被触发 - 用户ID: {user.id}, 用户名: {user.username}, 名字: {user.full_name}, 参数: {args}")

    if args:
        code = args[0].upper()
        if code in POSITION_DESCRIPTIONS:
            context.user_data["job_code"] = code
            await update.message.reply_text(
                "👋 欢迎使用Web3 Talent Agent！\n\n"
                "我可以帮你做以下事情：\n"
                "1️⃣ 选择职位：输入指令 /join ,输入职位码,确认您选择的岗位\n"
                "2️⃣ 上传简历：输入指令 /register ,上传您的github链接、推特链接和简历\n"
                "👋 取消输入流程，输入指令 /cancel\n"
                "👋 获取其他帮助请输入 /help\n\n"
            )
            await update.message.reply_text(f"🎯 您通过以下职位码进入CyraAI：{code}")
            await update.message.reply_text(f"🎯 职位信息：\n{POSITION_DESCRIPTIONS[code]}")
            await update.message.reply_text("✅ 请输入你的 GitHub ID（例如：@CyraAI），若无则输入'无':")
            return ASK_GITHUB_LINK
        else:
            await update.message.reply_text("❌ 无效的职位码，请使用 /join 命令重新输入。")
            return ConversationHandler.END
    else:
        await update.message.reply_text(
            "👋 欢迎使用Web3 Talent Agent！\n\n"
            "我可以帮你做以下事情：\n"
            "1️⃣ 选择职位：输入指令 /join ,输入职位码,确认您选择的岗位\n"
            "2️⃣ 上传简历：输入指令 /register ,上传您的github链接、推特链接和简历\n"
            "👋 取消输入流程，输入指令 /cancel\n"
            "👋 获取其他帮助请输入 /help\n\n"
        )
        return ConversationHandler.END



# 定义会话状态
ASK_POSITION_CODE, ASK_GITHUB_LINK, ASK_TWITTER_LINK, ASK_RESUME_PDF,LLM_INTERVIEW = range(5)

with open("job_dict.json", "r", encoding="utf-8") as f:
    POSITION_DESCRIPTIONS = json.load(f)


# 处理 /join 命令
async def join_command(update: Update, context: CallbackContext) -> int:
    await update.message.reply_text("请输入职位码（例如 W3001）:")
    return ASK_POSITION_CODE

# 处理职位码
async def receive_position_code(update: Update, context: CallbackContext) -> int:
    code = update.message.text.strip().upper()
    description = POSITION_DESCRIPTIONS.get(code)

    if description:
        context.user_data["job_code"] = code
        context.user_data["JD"] = description

        await update.message.reply_text(f"🎯 职位信息：\n{description}")
        await update.message.reply_text('🎯 请输入你的 Github 链接（例如：@CyraAI）,若无，则输入"无":')
        return ASK_GITHUB_LINK
    else:
        await update.message.reply_text("❌ 无效的职位码，请检查后重新输入。")
        return ASK_POSITION_CODE

# 处理 GitHub 链接
async def receive_github_link(update: Update, context: CallbackContext) -> int:
    github_link = update.message.text.strip()
    # 简单的正则判断 GitHub 链接
    if True:
        context.user_data["github"] = github_link
        await update.message.reply_text("✅ GitHub 链接已记录，感谢您的提交！")
        await update.message.reply_text('🎯 请输入你的 X 链接（例如：@CyraAI）,若无，则输入"无":')
        return ASK_TWITTER_LINK
    else:
        await update.message.reply_text("❌ 这不是一个有效的 GitHub 链接，请重新输入：")
        return ASK_GITHUB_LINK

# 处理 Twitter 链接
async def receive_twitter_link(update: Update, context: CallbackContext) -> int:
    twitter_link = update.message.text.strip()
    if True:
        context.user_data["twitter"] = twitter_link
        await update.message.reply_text("✅ Twitter 链接已记录，感谢您的提交！")
        await update.message.reply_text("📄 请上传您的简历（PDF 格式）文件。")
        # await update.message.reply_text("⌛️ 正在分析您的Github和X，请稍后回答多个问题，以便于面试官对您进行深入了解...")

        # 你可以在这里继续下一步，例如：让用户上传简历、确认信息等
        return ASK_RESUME_PDF
    else:
        await update.message.reply_text("❌ 这不是一个有效的 Twitter 链接，请重新输入（或输入“无”）：")
        return ASK_TWITTER_LINK



# 处理 PDF 简历上传并保存到本地，然后解析
async def receive_resume_pdf(update: Update, context: CallbackContext) -> int:
    if update.message.document and update.message.document.mime_type == 'application/pdf':
        document = update.message.document
        file_id = document.file_id
        file_name = document.file_name or f"{update.effective_user.id}_resume.pdf"

        # 创建本地暂存目录
        save_dir = "./resumes_tmp"
        os.makedirs(save_dir, exist_ok=True)
        save_path = os.path.join(save_dir, file_name)

        # 下载文件
        file = await context.bot.get_file(file_id)
        await file.download_to_drive(save_path)

        context.user_data["resume_file_path"] = save_path
        md_text = pymupdf4llm.to_markdown(save_path)

        context.user_data["resume_str"] = md_text

        await update.message.reply_text(f"✅ 简历已成功上传: {file_name}")
        await update.message.reply_text("🎉⌛️ 正在分析您的资料，请稍后回答多个问题，以便于招聘官对您进行深入了解...")
        print(123123123)

        context.user_data["interview_answers"] = []
        context.user_data["interview_index"] = 0

        question_list = LLM.get_Q3(JD=context.user_data.get("JD"), CV=context.user_data.get("resume_str"))
        print(context.user_data.get("JD"))
        print(context.user_data.get("resume_str"))
        print(question_list)
        context.user_data["interview_questions"] = question_list
        await update.message.reply_text(question_list[0])

        return LLM_INTERVIEW
    else:
        await update.message.reply_text("❌ 请上传一个 PDF 格式的文件作为简历。")
        return ASK_RESUME_PDF

async def handle_llm_interview(update: Update, context: CallbackContext) -> int:
    answer = update.message.text.strip()
    index = context.user_data.get("interview_index", 0)
    context.user_data["interview_answers"].append(answer)
    # 如果还有问题，继续提问
    if index + 1 < len(context.user_data["interview_questions"]):
        context.user_data["interview_index"] = index + 1
        next_q = context.user_data["interview_questions"][index + 1]
        await update.message.reply_text(next_q)
        return LLM_INTERVIEW
    else:
        # 问题结束
        await update.message.reply_text("✅ 感谢你的回答！所有问题已完成。我们将尽快处理你的申请。")
        # 可选：打印或保存问答历史
        for i, (q, a) in enumerate(
                zip(context.user_data["interview_questions"], context.user_data["interview_answers"])):
            logger.info(f"[Q{i + 1}] {q}\n[A{i + 1}] {a}")

        return ConversationHandler.END

# 取消命令
async def cancel(update: Update, context: CallbackContext) -> int:
    await update.message.reply_text("已取消流程。")
    return ConversationHandler.END

# 处理普通文本消息
async def echo(update: Update, context: CallbackContext) -> None:
    user_message = update.message.text
    await update.message.reply_text(f"你说的是: {user_message}")

async def help_command(update: Update, context: CallbackContext) -> None:
    await update.message.reply_text("可用命令: \n/start - 启动机器人\n/help - 获取帮助")

# 创建 bot 应用
def main():
    request = HTTPXRequest(proxy=PROXY_URL)
    app = Application.builder().token(TOKEN).request(request).build()
    # app = Application.builder().token(TOKEN).build()

    # 添加命令处理器
    # app.add_handler(CommandHandler("start", start))
    # app.add_handler(CommandHandler("help", help_command))
    # app.add_handler(CommandHandler("start", start))
    # app.add_handler(CommandHandler("join", join_command))
    app.add_handler(CommandHandler("help", help_command))

    # # 添加普通消息处理器
    # app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    # 添加职位选择对话处理器
    # 配置会话处理器
    join_conv_handler = ConversationHandler(
        entry_points=[
            CommandHandler("start", start),
            CommandHandler("join", join_command)
        ],
        states={
            ASK_POSITION_CODE: [MessageHandler(filters.TEXT & ~filters.COMMAND, receive_position_code)],
            ASK_GITHUB_LINK: [MessageHandler(filters.TEXT & ~filters.COMMAND, receive_github_link)],
            ASK_TWITTER_LINK: [MessageHandler(filters.TEXT & ~filters.COMMAND, receive_twitter_link)],
            ASK_RESUME_PDF: [MessageHandler(filters.Document.PDF & ~filters.COMMAND, receive_resume_pdf)],
            LLM_INTERVIEW: [MessageHandler(filters.TEXT & ~filters.COMMAND, handle_llm_interview)],
        },
        fallbacks=[CommandHandler("cancel", cancel)]
    )

    app.add_handler(join_conv_handler)

    # 运行 bot，开始监听消息
    print("Bot 已启动...")
    app.run_polling()


if __name__ == "__main__":
    main()
