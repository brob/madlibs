import React from 'react'

// A React Component that takes hte value of data
// and returns a simple preview of the data that can be used
// in the rich text editor
function madlibPreview({ value }) {
  const { text, grammar } = value

  return (
    <span>
      {text} ({grammar})
    </span>
  );
}

export default {
  title: 'Madlib Field Details',
  name: 'madlibField',
  type: 'object',
  fields: [
    {
      name: 'displayText',
      title: 'Display Text',
      type: 'string'
    },
    {
      name: 'grammar',
      title: 'Grammar Type',
      type: 'string'
    }
  ],
  // Defines a preview for the data in the Rich Text editor
  preview: {
    select: {
      // Selects data to pass to our component
      text: 'displayText',
      grammar: 'grammar'
    },
    
    // Tells the field which preview to use
    component: madlibPreview,
  },
}
