import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    group: 'Admin',
  },
  access: {
    create: () => true, // Anyone can submit a contact form
    read: ({ req: { user } }) => !!user, // Only authenticated users can read inquiries
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Page or form variant where the inquiry was sent from',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'processing' },
        { label: 'Resolved', value: 'done' },
        { label: 'Spam', value: 'spam' },
      ],
    },
  ],
  timestamps: true,
}
