# AIEP Core Functionalities Guide

This guide provides an overview of the three main functionalities of the AIEP application: **File Uploading**, **Generating Summaries**, and **Interacting with the Chatbot**.

---

## 1. Uploading Files

Users can upload files and retrieve all uploaded files through specific endpoints in the backend. Follow these steps:

### Upload Files
- **Endpoint:** `/jobs/create`
- **Location of Code:** `app-backend/app/jobs.py`
- **Testing:** Use the FastAPI playground at [AIEP API Docs](https://a-iep.org/api/docs#/).
- **Sample Files:** Test with sample files available in the [Google Drive folder](https://drive.google.com/drive/folders/1jdZ8Oj8ouW7FS5_jrzAD8rGQNnT6voq9?usp=drive_link).

### Retrieve All Uploaded Files
- **Endpoint:** `/jobs/all-jobs`
- **Instructions:** This endpoint returns a list of all uploaded files. You can also test it in the [FastAPI playground](https://a-iep.org/api/docs#/).

### Notes
- Ensure you’ve processed the file before accessing the summary or interacting with it in the CMS.

---

## 2. Generating Summaries

Summaries are generated automatically after a file upload job is completed.

### Accessing Summaries
- **CMS Location:** Once the job is finished, you can view the processed summaries in the [Payload CMS](https://a-iep.org/cms/admin/collections/jobs?limit=10).
- **Note:** Do not directly access or modify items in the MongoDB database. Always use the CMS for any data management.

### Frontend Display
- **Summary Cards Structure:** Summaries are displayed in the frontend with a structure similar to the schema defined in `app-backend/app/extract.py`.
- **Frontend Data Handling:** When a processed job is selected, its data is stored in a zustand store located at `app-frontend/src/store/jobStore.js`.

### Developer Tip
For frontend development, use the summary schema from `extract.py` for consistent data structure.

---

## 3. Chatbot Interaction

The chatbot allows users to interact with uploaded content through semantic retrieval.

### Implementation Details
- **Code Location:** `app-frontend/src/app/[locale]/api/chat/route.js`
- **Backend Integration:** Initially, this functionality was integrated with **AstraDB**, but the current on-prem setup does not support this.
- **Current Database Solution:** In the on-prem Dockerized version, **Qdrant** is being explored as an open-source, self-hosted vector database solution.

### Data Embeddings with Qdrant
- **Job Processing:** The `/jobs/create` endpoint loads processed output data as embeddings into the Qdrant collection, using `job_id` as `collection_id`.
- **Local Testing:** When running locally, view items in Qdrant at `localhost:6333/dashboard`.

### Data Retrieval
- **Endpoint:** `/rag/doc-search` — retrieves semantically related data.
- **Testing:** You can test this endpoint via the hosted UI playground; however, it is currently **not integrated** in the frontend.
