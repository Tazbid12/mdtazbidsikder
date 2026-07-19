import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Browser Tab Title',
      type: 'string',
      description: 'The main title of your website that appears in the browser tab.',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon (Web Icon)',
      type: 'image',
      description: 'Upload your website icon here. Square images (e.g., 512x512) work best.',
    }),
  ],
});
