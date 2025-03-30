# CyraAI: Automated Recruitment Assistant

CyraAI is an intelligent recruitment automation platform that streamlines the entire hiring process from candidate discovery to final interviews. Powered by AI agents and integrated with popular social platforms, CyraAI revolutionizes how companies find, evaluate, and connect with qualified candidates.

# Index

1. Why CyraAI?
2. How CyraAI Works
3. Agent Architecture
4. Workflow Process
5. Tech Stack
6. Contact

[Demo Video](#) | 
## Why CyraAI?

Traditional recruitment is inefficient and time-consuming. Success often depends on manual reviews, subjective assessments, and limited candidate options. CyraAI addresses these challenges by:

- **Automated Candidate Screening:** AI agents scan and validate candidates based on measurable qualifications and experience, not just keywords.
- **Intelligent Document Processing:** Parse and analyze resumes, portfolios, and credentials to identify the most promising candidates.
- **Streamlined Communication:** Automate initial outreach and preliminary interviews via integrated messaging platforms.
- **Data-Driven Decision Making:** Use analytics and objective assessments to make better hiring decisions.
- **Seamless Platform Integration:** Connect with existing job boards, social networks, and HR systems.

### The AI-Powered Recruitment Revolution

CyraAI creates a more efficient and effective hiring process. This approach reduces time-to-hire, improves candidate quality, and minimizes human bias in the selection process.

![CyraAI Workflow](https://github.com/shenyimings/CyraAI/blob/main/assets/architecture.png)

## How CyraAI Works

1. **Multi-Channel Candidate Discovery**
   - AI agents generate job postings and upload them to Twitter
   
2. **Intelligent Screening & Assessment**
   - AI assessment evaluates candidate fit for specific roles
   - Automated qualification verification and ranking
   
3. **Streamlined Communication**
   - Integrated Telegram bot for candidate interactions
   - Automated interview scheduling and preliminary screening
   - Two-way communication between candidates and hiring teams
   
4. **Comprehensive Analytics**
   - Track recruitment metrics and pipeline performance
   - Optimize job descriptions based on candidate responses
   - Improve hiring efficiency through data-driven insights

## Agent Architecture

1. **Discovery Agent**
   - Connects to multiple data sources (LinkedIn, job boards, etc.)
   - Filters candidates based on job requirements
   - Prioritizes candidates based on qualifications and match score
   - Maintains discovery queue and prevents duplicate processing

2. **Document Processing Agent**
   - Parses resumes and professional profiles
   - Extracts relevant skills, experience, and qualifications
   - Standardizes candidate information for consistent evaluation
   - Maintains a structured database of candidate information

3. **Assessment Agent**
   - Evaluates candidate qualifications against job requirements
   - Flags promising candidates with "Seems ok!" status
   - Identifies unqualified candidates with "Disqualified!" status
   - Generates standardized assessment reports

4. **Communication Agent**
   - Manages Telegram bot interactions with candidates
   - Conducts preliminary interviews via chat
   - Schedules interviews with human recruiters
   - Provides candidates with application status updates

## Tech Stack

### Backend
   - **Docker** (Containerization)
   - **Kubernetes** (Orchestration)
   - **Node.js** (Server Runtime)
   - **Express** (API Framework)
   - **MongoDB** (Document Database)
   - **Redis** (Caching)

---

### Frontend
   - **React** (UI Framework)
   - **TypeScript** (Programming Language)
   - **Material UI** (Component Library)
   - **Redux** (State Management)
   - **Axios** (HTTP Client)

---

### Communication/Integration
   - **Telegram Bot API** (Candidate Communication)
   - **OAuth** (Authentication)
   - **REST APIs** (External System Integration)
   - **WebSockets** (Real-time Updates)

---

## API Integrations
   - **LinkedIn API** (Professional Network)
   - **Indeed API** (Job Board)
   - **Telegram Bot API** (Messaging)
   - **Google Calendar API** (Interview Scheduling)

## Contact

**GitHub:** [shenyimings](https://github.com/shenyimings)
