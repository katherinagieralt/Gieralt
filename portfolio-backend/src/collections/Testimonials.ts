import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'contentPL',
      type: 'textarea',
      required: true,
      label: 'Content (PL)',
    },
    {
      name: 'contentEN',
      type: 'textarea',
      required: true,
      label: 'Content (EN)',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'projectImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'linkedInUrl',
      type: 'text',
      required: false,
    },
  ],
}
