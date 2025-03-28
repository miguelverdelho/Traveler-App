import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
  },
  fields: [],
};

export default Media;
