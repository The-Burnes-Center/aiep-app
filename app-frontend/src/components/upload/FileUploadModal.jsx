'use client';

import { useState, useCallback } from 'react';
import { upload } from '@/lib/JobProcessing';
import { useDropzone } from 'react-dropzone';

export default function FileUploadModal({ modal_id }) {
  const [files, setFiles] = useState([]);
  const [targetLocale, setTargetLocale] = useState('en');

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleDelete = (fileToDelete) => {
    setFiles((prevFiles) => prevFiles.filter(file => file !== fileToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Ensure each file is appended with the correct key
    files.forEach(file => {
      formData.append('files', file);
    });

    formData.append('targetLocale', targetLocale);

    try {
      const response = await upload(formData);
      console.log('Job created successfully:', response);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <dialog id={modal_id} className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit} className="flex flex-col p-4 bg-white items-center">
          <div className="mt-4">
            <h3 className="block text-gray-700">Upload Files</h3>
            <DropzoneArea onDrop={onDrop} />
          </div>
          <div className="mt-4">
            <label htmlFor="targetLocale" className="block text-gray-700">Target Locale</label>
            <select
              id="targetLocale"
              name="targetLocale"
              value={targetLocale}
              onChange={(e) => setTargetLocale(e.target.value)}
              className="mt-1 block w-full"
            >
              <option value="en">English</option>
              <option value="cn">Chinese</option>
              <option value="tl">Tagalog</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div className="mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Process IEP
            </button>
          </div>
          <div className="mt-4">
            {files.length > 0 && (
              <ul>
                {files.map((file, index) => (
                  <li key={index} className="mb-2 flex items-center justify-between">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                      onClick={() => handleDelete(file)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='p-4 flex flex-row gap-10 items-center'>
            <img
              src="/images/uploadicon2.svg"
              alt="Upload"
              className="w-12"
            />
            <div className='flex-col items-center'>
              <p>Need Help Uploading Your IEP?</p>
              <p>Contact us at XXX.XXX.XXXX</p>
            </div>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const DropzoneArea = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
    >
      <input {...getInputProps()} className="sr-only" />
      <div className="flex flex-col space-y-1 text-center items-center">
        <img
          src="/images/uploadicon.svg"
          alt="Upload"
          className="w-12"
        />
        <div className="flex text-sm text-gray-600">
          <p className="pl-1">Drag & drop files here, or click to select files</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF, PDF up to 10MB</p>
      </div>
    </div>
  );
};