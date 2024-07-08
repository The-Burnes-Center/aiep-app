import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import Bull from 'bull';

const cmsBaseRoute = `${process.env.NEXT_PUBLIC_ADMIN_URL}/cms/api`;

// Initialize BullMQ queue
const jobQueue = new Bull('job-queue', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const targetLocale = formData.get('targetLocale');
  const userId = formData.get('userId');
  const files = formData.getAll('files.file');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  if (!Array.isArray(files)) {
    return NextResponse.json({ error: 'Files should be an array' }, { status: 400 });
  }

  try {
    // Create job in Payload CMS
    const response = await axios.post(
      `${cmsBaseRoute}/jobs`,
      {
        user: userId,
        targetLocale,
        files: files.map((file: any) => ({ file })),
        status: 'started',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // Attach Payload token cookie automatically
        },
        withCredentials: true,
      }
    );

    const job = response.data;

    // Add job to BullMQ queue
    await jobQueue.add('process-job', {
      jobId: job.id,
      files,
      targetLocale,
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error('Error creating job in Payload CMS:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

jobQueue.process('process-job', async (job) => {
  const { jobId, files, targetLocale } = job.data;

  try {
    // Simulate job processing (dummy code)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Update job status in Payload CMS
    await axios.patch(
      `${cmsBaseRoute}/jobs/${jobId}`,
      { status: 'completed' },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error('Error processing job:', error);

    // Update job status to 'terminatedWithError' in case of an error
    await axios.patch(
      `${cmsBaseRoute}/jobs/${jobId}`,
      { status: 'terminatedWithError' },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
  }
});
