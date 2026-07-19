import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'photographyStory',
  title: 'Photo Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'The thumbnail image shown on the main photography page.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Main Story Description',
      type: 'text',
      description: 'The main text that appears at the top of the story.',
    }),
    defineField({
      name: 'photos',
      title: 'Story Photos',
      type: 'array',
      description: 'Add as many photos as you want to this story.',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'image', 
              type: 'image', 
              title: 'Photo',
              options: { hotspot: true }
            },
            { 
              name: 'caption', 
              type: 'text', 
              title: 'Individual Photo Caption' 
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'date',
      title: 'Date Published',
      type: 'date',
    }),
  ],
});
