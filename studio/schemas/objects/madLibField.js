import React from 'react'

function madlibPreview({value}) {
    const {text, grammar} = value
    console.log({text, grammar})
    return <span style={{backgroundColor: 'transparent', width: '300px'}}>{text} ({grammar})</span>;

}

export default {
    title: 'Madlib Field Details',
    name: 'madlibField',
    type: 'object',
    preview: {
        select: {
            text: 'displayText',
            grammar: 'grammar'
        },
        prepare(selection) {
            return selection
        },
        component: madlibPreview,

    },
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
    ]
} 
    