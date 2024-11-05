"use client";
import { useState, useEffect } from "react";
import PortalMenu from "@/components/PortalMenu";
import FileUploadModal from "@/components/upload/FileUploadModal";
import { getAllJobs } from "@/lib/JobProcessing";
import useJobStore from "@/store/jobStore";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const { setJobId, setResultData } = useJobStore(); // Destructure actions from job store

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      const jobsData = await getAllJobs();
      setJobs(jobsData);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs(); // Initial load of jobs
  }, []);

  const handleChooseJob = (job) => {
    setJobId(job.id);
    setResultData(job.resultData);
    router.push("/portal/summary");
  };

  return (
    <div className="w-screen overflow-auto flex flex-col">
      <div className="fixed top-0 left-0 w-full z-10">
        <PortalMenu />
      </div>

      <div className="mx-12 mt-44 border-b-4 border-black w-2/3">
        <h2 className="leading-relaxed">Summary of your IEP</h2>
        <h3 className="leading-loose">
          Open each box to get summary of your IEP by section.
        </h3>
      </div>

      {/* Upload Button */}
      <div className="mx-12 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("file-upload").showModal()}
        >
          Upload your IEP
        </button>
        <button
          className="btn btn-secondary ml-4"
          onClick={fetchJobs} // Refresh jobs list
        >
          Refresh
        </button>
      </div>

      <FileUploadModal modal_id="file-upload" />

      {/* Jobs Table */}
      <div className="mx-12 mt-6 overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Date Created</th>
              <th>Last Updated</th>
              <th>File Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id}>
                <th>{index + 1}</th>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                <td>{new Date(job.updatedAt).toLocaleDateString()}</td>
                <td>{job.files[0]?.file.filename}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleChooseJob(job)}
                  >
                    Choose
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
