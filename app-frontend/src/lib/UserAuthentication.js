import axios from 'axios';
import useUserStore from '../store/userStore';

const backendBaseRoute = 'http://a-iep.com/api/auth';

export async function login(formData) {
  try {
    const response = await axios.post(`${backendBaseRoute}/login`, {
      email: formData.email,
      password: formData.password,
    }, {
      withCredentials: true,
    });
    const data = response.data;
    useUserStore.getState().setUserId(data.user.id);
    return response;
  } catch (err) {
    return {"Error": err.response.data};
  }
}

export async function signup(formData) {
  try {
    const response = await axios.post(`${backendBaseRoute}/signup`, {
      email: formData.email,
      password: formData.password,
      role: 'user',
    }, {
      withCredentials: true,
    });
    const data = response.data;
    useUserStore.getState().setUserId(data.user.id);
    return response;
  } catch (err) {
    return {"Error": err.response.data};
  }
}

export async function logout() {
  try {
    const response = await axios.post(`${backendBaseRoute}/logout`, 
    // Need to pass empty body for cookies to attach
    {}, 
    {
      withCredentials: true,
    });
    if (response.status === 200) {
      useUserStore.getState().clearUserId();
    }
    return response;
  } catch (err) {
    return {"Error": err.detail}
  }
}