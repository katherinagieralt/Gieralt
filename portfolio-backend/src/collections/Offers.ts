import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'namePL',
    defaultColumns: ['namePL', 'price', 'updatedAt'],
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
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Zap', value: 'Zap' },
        { label: 'Rocket', value: 'Rocket' },
        { label: 'Crown', value: 'Crown' },
        { label: 'Cpu', value: 'Cpu' },
        { label: 'Shield', value: 'Shield' },
      ],
      defaultValue: 'Zap',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Included', value: 'included' },
            { label: 'Not Included', value: 'excluded' },
          ],
          defaultValue: 'included',
          required: true,
        },
      ],
    },
    {
      name: 'techFlow',
      type: 'array',
      label: 'Tech Flow Diagram Steps',
      fields: [
        {
          name: 'step',
          type: 'text',
        },
      ],
    },
  ],
}
