const toHtml = require('@sanity/block-content-to-html')
const h = toHtml.h;

const serializers = {
    types: {
        madlibField: ({node}) => {
            return h('span', node.displayText, {id: node._key, className: 'empty'})
        }
    }
}


const prepText = (data) => {
    return {
        ...data,
        htmlText: toHtml({
            blocks: data.text, 
            serializers: serializers
        })
    }

}


module.exports = {prepText}
