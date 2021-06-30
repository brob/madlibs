export default {
  // Name in the data
  name: 'madlib',
  // Title visible to editors
  title: 'Madlib Template',
  // Type of schema (at this stage either document or object)
  type: 'document',
  // An array of fields
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // // will be ignored if slugify is set
      }
    },
    {
      title: 'Madlib Text',
      name: 'text',
      type: 'array',
      of: [
        // A list of "block types" to include
        {
          // Creates the standard blocks
          type: 'block',
          name: 'block',
          of: [
            // An array of "inline" blocks
            { type: 'madlibField' }
          ]
        },
      ]
    },
  ]
}