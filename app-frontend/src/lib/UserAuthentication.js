import useUserStore from '../store/userStore';

const cmsBaseRoute = `${process.env.NEXT_PUBLIC_ADMIN_URL}/cms/api`;

export async function login(formData) {
  try {
    const response = await fetch(`${cmsBaseRoute}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      useUserStore.getState().setUserId(data.user.id); // Store user ID in Zustand
    }
    return response;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}

export async function signup(formData) {
  try {
    const response = await fetch(`${cmsBaseRoute}/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        role: 'user'
      }),
    });
    const data = await response.json();
    if (response.ok) {
      useUserStore.getState().setUserId(data.user.id); // Store user ID in Zustand
    }
    return response;
  } catch (err) {
    console.error('Signup error:', err);
    throw err;
  }
}

export async function logout() {
  try {
    const response = await fetch(`${cmsBaseRoute}/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      useUserStore.getState().clearUserId(); // Clear user ID from Zustand
    }
    return response;
  } catch (err) {
    console.error('Logout error:', err);
    throw err;
  }
}
