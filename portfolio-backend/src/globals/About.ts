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
      name: 'biography',
      type: 'richText',
      required: true,
      localized: true,
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
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
  ],
}
