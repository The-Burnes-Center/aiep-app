from .celery_config import celery_app
import time

@celery_app.task
def long_running_task(param):
    time.sleep(9)  # Simulate a long-running task (15 minutes)
    return f'Task completed with param: {param}'