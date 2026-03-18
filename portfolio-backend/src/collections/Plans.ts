import type { CollectionConfig } from 'payload'

export const Plans: CollectionConfig = {
  slug: 'plans',
  admin: {
    useAsTitle: 'namePL',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'namePL',
      type: 'text',
      required: true,
      label: 'Name (PL)',
    },
    {
      name: 'nameEN',
      type: 'text',
      required: true,
      label: 'Name (EN)',
    },
    {
      name: 'descriptionPL',
      type: 'textarea',
      required: true,
      label: 'Description (PL)',
    },
    {
      name: 'descriptionEN',
      type: 'textarea',
      required: true,
      label: 'Description (EN)',
    },
    {
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'deliveryTime',
      type: 'text',
      required: true,
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
  ],
}
