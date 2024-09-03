import { CollectionConfig } from 'payload/types';

const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    create: ({ req: { user } }) => {
      return !!user; // Allow authenticated users to create jobs
    },
    read: () => true, // Allow all users to read jobs
    update: ({ req: { user } }) => {
      return !!user; // Allow authenticated users to update their own jobs
    },
    delete: ({ req: { user } }) => {
      return !!user; // Allow authenticated users to delete their own jobs
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users', // Assuming you have a 'users' collection
      required: true,
    },
    {
      name: 'files',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Started', value: 'started' },
        { label: 'Completed', value: 'completed' },
        { label: 'Terminated with Error', value: 'terminatedWithError' },
      ],
      defaultValue: 'started',
      required: true,
    },
    {
      name: 'resultData',
      type: 'json',
      required: false
    }
  ],
};

export default Jobs;
