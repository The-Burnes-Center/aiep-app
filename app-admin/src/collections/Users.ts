import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'password',
      type: 'text',
      validate: (value) => {
        if (!value) {
          return 'Password is required';
        }
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(value)) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!/[0-9]/.test(value)) {
          return 'Password must contain at least one number';
        }
        if (!/[!@#$%^&*]/.test(value)) {
          return 'Password must contain at least one special character';
        }
        return true;
      },
      admin: {
        readOnly: true, // Ensures the password field is not editable in the admin panel
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        'user',
        'advocate',
        'admin',
      ],
    },
  ],
};

export default Users;
