import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'overview',
  title: 'Overview Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The main big text (e.g., Building systems & capturing quiet frames.)',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'The short paragraph about you under the headline.',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop the image inside the admin panel
      },
    }),
  ],
});
