import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
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
          localized: true,
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
          localized: true,
        },
      ],
    },
  ],
}
