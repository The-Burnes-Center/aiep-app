import axios from 'axios';
import useUserStore from '../store/userStore';

export const upload = async (formData) => {
  const userId = useUserStore.getState().userId;

  if (!userId) {
    throw new Error('User ID is not available');
  }

  formData.append('userId', userId); // Append the user ID to the FormData

  try {
    const response = await axios.post('/api/upload', formData, {
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
