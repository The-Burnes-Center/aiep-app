import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  },
  fields: [],
};

export default Media;
