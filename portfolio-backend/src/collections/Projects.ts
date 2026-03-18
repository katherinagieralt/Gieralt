import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'SaaS', value: 'SaaS' },
        { label: 'FinTech', value: 'FinTech' },
        { label: 'eCommerce', value: 'eCommerce' },
        { label: 'AI Tools', value: 'AI Tools' },
        { label: 'Mobile App', value: 'Mobile App' },
      ],
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: false,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}
