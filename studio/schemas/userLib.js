export default {
  name: 'userLib',
  title: 'User Generated Madlibs',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      readOnly: true,
      options: {
        source: 'title',
        maxLength: 200, // // will be ignored if slugify is set
      },
    },
    {
      title: 'Madlib Text',
      name: 'text',
      type: 'array',
      readOnly: true,
      of: [
        {
          type: 'block',
          name: 'block',
          of: [
            { type: 'madlibField' }
          ]
        },
      ]
    },
  ]
}