import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'biographyPL',
      type: 'richText',
      required: true,
      label: 'Biography (PL)',
    },
    {
      name: 'biographyEN',
      type: 'richText',
      required: true,
      label: 'Biography (EN)',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'labelPL',
          type: 'text',
        },
        {
          name: 'labelEN',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
  ],
}
