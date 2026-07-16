export const skillGroup = {
  name: 'skillGroup',
  title: 'Skill Group',
  type: 'document',
  fields: [
    { name: 'id', title: 'ID (lowercase, no spaces, e.g. code)', type: 'string' },
    { name: 'label', title: 'Label (e.g., Programming)', type: 'string' },
    { name: 'title', title: 'Title (e.g., Code)', type: 'string' },
    { name: 'blurb', title: 'Description Blurb', type: 'text' },
    { name: 'items', title: 'Skills List', type: 'array', of: [{ type: 'string' }] },
    { name: 'span', title: 'Grid Span', type: 'string', initialValue: 'md:col-span-2' },
    { name: 'iconName', title: 'Icon Name (Type exactly: Cpu, Code2, Camera, or Wrench)', type: 'string' },
  ]
};

export const skillHighlights = {
  name: 'skillHighlights',
  title: 'Skill Highlights (Top Tools)',
  type: 'document',
  fields: [
    { name: 'items', title: 'Highlight Items', type: 'array', of: [{ type: 'string' }] }
  ]
};
