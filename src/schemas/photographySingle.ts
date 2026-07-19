import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'photographySingle',
  title: 'Single Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title (For your reference)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop/focus the image in the admin panel
      },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      description: 'The caption displayed under the photo.',
    }),
    defineField({
      name: 'date',
      title: 'Date Taken',
      type: 'date',
      description: 'Used to sort your photos from newest to oldest.',
    }),
  ],
});
