
# Maintaining the Application

## Application Overview

### Admin Interface (Payload CMS):
The app-admin directory contains the Payload CMS, running Payload 2.0. It utilizes an Express server with MongoDB as the database, initialized through Docker Compose. This CMS allows non-developers to manage user access and manually mutate objects, useful for assisting users (such as parents) who may have difficulty interacting with the frontend interface. The CMS is mounted at `a-iep.org/cms/admin`, and visiting `a-iep.org/cms` redirects to the admin console.
### Frontend (Next.js):
The app-frontend directory contains a Next.js application that leverages server-side rendering (SSR) to serve pages. The application’s routing follows the folder structure in the app folder, with individual components stored in the components directory and API operations stored in the lib directory. This app is mounted at the root of the domain (`a-iep.org`).
### Backend (FastAPI):
The FastAPI-based backend serves as the middleware between the frontend and CMS. The entry point is main.py, and it is mounted at `a-iep.org/api`. For developers, the FastAPI docs are accessible at `a-iep.org/api/docs`, where backend processes can be tested individually without frontend interaction. The backend includes Celery processes for handling asynchronous tasks (e.g., processing IEP data via VLM, extracting structured data for storage, taking ~10 minutes). Extracted data is stored in a Qdrant instance for retrieval as embeddings.

## Environment Variables

Here are the key environment variables necessary for configuring the application:

| Variable                      | Description                            | Format  | Required |
|-------------------------------|---------------------------------------|---------|----------|
| MONGO_INITDB_ROOT_USERNAME    | MongoDB root username                 | String  | Yes      |
| MONGO_INITDB_ROOT_PASSWORD    | MongoDB root password                 | String  | Yes      |
| PAYLOAD_SECRET                | PayloadCMS secret key                 | String  | Yes      |
| DOMAIN                        | The domain for the deployed application (e.g., a-iep.org) | String | Yes |
| OPENAI_API_KEY                | API key for OpenAI integration        | String  | Yes      |
| ASTRA_DB_NAMESPACE            | Namespace for AstraDB                 | String  | Yes      |
| ASTRA_DB_ENDPOINT             | Endpoint for AstraDB                  | URL     | Yes      |
| ASTRA_DB_APPLICATION_TOKEN    | Authentication token for AstraDB      | String  | Yes      |

Ensure these variables are configured properly in your environment before deploying or running the app locally.

## Local Development

### Run Locally:
To spin up the application locally using Docker Compose, run:

docker-compose -f docker-compose.local.yml up --build -d

To shut down and clean up:

docker-compose -f docker-compose.local.yml down


### Access Services:
	•	Frontend: Accessible at http://localhost:3000
	•	Admin Console: Accessible at http://localhost:3000/cms/admin
	•	Backend API Docs: Accessible at http://localhost:8000/docs

## Deployment

You can choose to deploy on 

### Deploy on Managed Server:
After SSH-ing into your managed server, verify Git is installed and then proceed with the following steps:
```
git clone https://github.com/xuhongkang/aiep-app.git
cd ./aiep-app
sudo sh deploy-server.sh
```
On the first run, you will be prompted to configure any missing environment variables. Don't forget to set environment variables as stored in `.example.env`.
 This script will set up the application and start the necessary services using Docker Compose.

### Deploy Locally
Same process as below, don't forget to set environment variables as stored in `.example.env`.

### Rebuilding the Application:
If you’ve made local changes that need to be deployed on-prem, push them to the Git repository and rebuild the application by running:
```
sudo sh rebuild-<env>.sh
```
This script pulls the latest changes and restarts the application. Ensure all required environment variables are available as they are only set per session for security purposes.

## Additional Notes

### Qdrant: 
The Qdrant instance handles storing and retrieving embeddings for IEP data. Currently, it can be tested locally but isn’t mounted on the Nginx server yet.
### Celery and Async Processing: 
IEP document processing is handled asynchronously via Celery workers, with tasks such as data extraction typically taking 10 minutes. The system is designed to scale based on the number of workers.
### Nginx Configuration: 
Deployment on a managed server includes setting up Nginx as a reverse proxy for serving the frontend and backend applications, as well as the CMS. If you’re deploying to a new server, ensure Nginx is configured correctly and has the appropriate SSL certificates.