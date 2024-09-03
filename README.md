# AIEP-APP
## Tools and Architecture
```
aiep-app/
├── app-admin/ (Dev Only Frontend for Web Content Management)
├── app-frontend/ (Frontend Servicing Web Application)
├── llm-service/ (Abstracted FastAPI Backend for LLM Operations)
├── app-backend/ (Unified FastAPI Backend)
├── nginx/ (Web Server & Reverse Proxy for Web App Hosting)
├── postgresql/ (SQL Database for User and Shared Document Data Source)
├── mongodb/ (NoSQL Database for Payload CMS Data Source)
└── qdrant/ (Vector Database for RAG data retreival)
```

## Overview
### Environment Variables
'''
'''
### Quickstart 
To Test Locally:
```
# To build and run
docker-compose -f docker-compose.local.yml up --build -d
# To close & cleanup
docker-compose -f docker-compose.local.yml down
```
To Deploy on Managed Server:
```
# SSH Into Server
# Check Git version
git --version
# Install Git if not found
sudo apt-get install git 
# sudo yum install git for RHEL-based Environments such as Amazon Linux
# Clone repository
git clone https://github.com/xuhongkang/aiep-app.git 
# Enter repository
cd ./aiep-app 
# Run deployment script
sudo sh deploy.sh
# On first run you will be prompted to enter unconfigured environment variables
```
To Rebuild Project After Pushing Local Changes:
```
# Ensure you're at the root of the repository
sudo sh rebuild.sh
# Remember to check the availability of environment variables, which are only set per session (for security reasons and best practices)
```


### Frontend Application w/ NextJS

The user-facing frontend web application hosted at a-iep.org. It serves users the below content:
1. Landing Page (What's an IEP? What's our Goal? Who are we?)
2. Login Page (Signup, User & Guest Login)
3. User Home Page (Select Tasks)
4. Upload Page (Upload Wizard, Contact Information)
5. Chatbot Page (Messaging Interface for back-and-forth interaction)
6. Summary Page (Overview of personal IEP information)

### Content Management System w/ PayloadCMS

The content management system for the frontend application using MongoDB as the NoSQL data source. It manages the following:

1. Users & Authentication: Stores User Signup Data & Handles JWT Authentication
2. Static Page Content (Headers, Titles, Text) 
3. Blog Posts (Structured RichText Content)

### Backend Application w/ FastAPI, Celery & RabbitMQ

The unified backend FastAPI application aims to serve all the business logic for the frontend application. It is proposed that Celery can be used for long running async tasks and RabbitMQ as a message broker which can better handling scalling and queuing. FastAPI implementation includes pydantic defined schema models, router and middleware configuration.  

Functions include:
1. Handling authentication calls between the frontend and cms
2. Handling heavy long running document upload & extraction process >10 minutes
3. Handling user specific database operations including sign up, chat history update & preferences updates
4. Handling LLM calls between the frontend LLM microservice

### Abstracted LLM Microservice w/ FastAPI, Celery & RabbitMQ

This follows a very similar architecture to the backend. The separation of this responsibility is motivated by increasing demand to switch away from OpenAI's microservice to support other LLM powered tools due to pricing or performance. However, the current OpenAI API is still the best amongst competitors and in light of future changes in the stack it would be beneficial to abstract this logic. It's also not performance heavy as it will almost always be using an external paid commerical microservice due to the high costs of local hosting.

Functions include:
1. Wrapper for a streaming response request for chat completion (OpenAI API)
2. Wrapper for an asyncronous response request for chat completion (OpenAI API)
3. Wrapper for speech/audio to text (OpenAI API)
4. Wrapper for vision to text via VLM (OpenAI API)
5. Wrapper for ai assisted translation (AWS Translate)

### Web Server w/ Nginx

With properly configured DNS routing & SSL certificates via Domain Provider, the nginx server hosts the 2 frontend web apps and the 2 backend apps.

### Data Solutions w/ PostgreSQL, MongoDB & Qdrant

Database services such as PostgreSQL, MongoDB & Qdrant are run in Docker Containers specified by Docker Compose. For security reasons, they also keep periodic snapshots in disk storage.

## Change Log:
- Jun 10: Resolved SSL-Related Proxy Issues, Login & Signup
- Jun 07: Deployed to Debian-Based internal environment
- Jun 05: Subpath Routing Implemented
- Jun 03: Deployed to RHEL-Based self-managed environment
- May 24: Content Management System Approved and Implemented
- May 23: Chatbot User Workflow Revision Approved
- May 22: Backend Architecture Approved
- May 20: Landing Page UI Implemented
- May 17: UI/UX Design Revision Approved
- May 13: Final Sprint Started

## Considerations:
### Scalling
Docker Compose supports manual scalling on a single server via changing worker thread count. Deployment on single/multiple clusters will involve custom orchestration via Kubernetes or Docker Swarm.