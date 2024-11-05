import axios from 'axios';
import useUserStore from '../store/userStore';

const backendBaseRoute = `${process.env.NEXT_PUBLIC_BACKEND_URL_PREFIX}/api/jobs`;

export const upload = async (formData) => {
  const userId = useUserStore.getState().userId;

  if (!userId) {
    throw new Error('User ID is not available');
  }

  // Ensure files are appended to FormData before sending
  if (!formData.has('files') || formData.get('files') === null) {
    throw new Error('Files are required for upload');
  }

  formData.append('userId', userId);

  try {
    const response = await axios.post(`${backendBaseRoute}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await axios.get(`${backendBaseRoute}/get-all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    throw error;
  }
};
