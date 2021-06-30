// Initializes the package
const toHtml = require('@sanity/block-content-to-html')
const h = toHtml.h;

const serializers = {
    types: {
        madlibField: ({node}) => {
            // Takes each node of `type` `madlibField`
            // and returns an HTML span with an id, class, and text
            return h('span', node.displayText, {id: node._key, className: 'empty'})
        }
    }
}

const prepText = (data) => {
    // Takes the data from a specific Sanity document
    // and creates a new htmlText property to contain the HTML
    // This lets us keep the Portable Text data intact and still display HTML
    return {
        ...data,
        htmlText: toHtml({
            blocks: data.text, // Portable Text data
            serializers: serializers // The serializer to use
        })
    }
}

// We only need to export prepText for our functions
module.exports = {prepText}
