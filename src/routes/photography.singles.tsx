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
        hotspot: true, 
      },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      description: 'The caption displayed under the photo.',
    }),
    defineField({
      name: 'sequence',
      title: 'Sequence Number',
      type: 'number',
      description: 'Determines the order (1 appears first, 2 appears second, etc.)',
    }),
  ],
});
