import React from 'react'

const fieldRender = props => {

    return (
    <span style={{ 
        borderBottom: '1px solid #999',
        backgroundColor: 'transparent',
        padding: '0 15px'
    }}>{props.children} (<span style={{color:'#888', fontStyle: 'italic'}}>{props.type}</span>)</span>
)}


export default {
    name: 'madlib',
    title: 'Madlib Template',
    type: 'document',
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
                slugify: input => input
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .slice(0, 200),
                isUnique: proposedSlug => true,
            },
        },
        {
            title: 'Madlib Text',
            name: 'text',
            type: 'array',
            of: [
                {
                    type: 'block',
                    name: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'field',
                                title: 'Field',
                                type: 'object',
                                fields: [
                                    {
                                        name: 'type',
                                        title: 'Field Type',
                                        type: 'string'
                                    }
                                ],
                                blockEditor: {
                                    icon: () => 'F',
                                    render: fieldRender
                                }
                            }
                        ],

                    },
                    of: [
                        {type: 'madlibField'}
                    ]
                },
            ]
        },

        
        
    ]
}