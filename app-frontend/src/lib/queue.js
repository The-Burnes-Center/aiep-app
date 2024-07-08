// lib/queue.js
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();

const queue = new Queue('etl-queue', { connection });

const worker = new Worker('etl-queue', async job => {
  const { data } = job;
  
  // Perform ETL tasks
  await performETL(data);

  // Make synchronous API calls
  await makeSynchronousAPICalls(data);

  return { success: true };
}, { connection });

worker.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result ${result.success}`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error ${err.message}`);
});

const performETL = async (data) => {
  // Your ETL logic here
  console.log('Performing ETL tasks...');
  await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate ETL processing
};

const makeSynchronousAPICalls = async (data) => {
  for (let i = 0; i < 50; i++) {
    await makeAPICall(data);
  }
};

const makeAPICall = async (data) => {
  // Replace with your actual API call logic
  console.log('Making API call...');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call delay
};

export default queue;
