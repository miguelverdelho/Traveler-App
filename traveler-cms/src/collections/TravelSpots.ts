import { CollectionConfig } from 'payload';

export const TravelSpots: CollectionConfig = {
  slug: 'travel-spots',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'lat',
      type: 'number',
      required: true,
    },
    {
      name: 'lng',
      type: 'number',
      required: true,
    },
    {
      name: 'photos',
      type: 'text',
      required: false,
      hasMany: true,
    }
  ],
};

export default TravelSpots;
