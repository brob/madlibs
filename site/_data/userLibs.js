const client = require('../utils/sanityClient')
const toHtml = require('@sanity/block-content-to-html')
const h = toHtml.h;
const query = `*[_type == "userLib"]{
    title,
    "slug": slug.current,
    text,
    _id
  }`

module.exports = async function() {
    const madlibs = await client.fetch(query);


    const preppedMadlib = madlibs.map(prepText)
    return preppedMadlib

}

function prepText(data) {
    return {
        ...data,
        htmlText: toHtml({
            blocks: data.text, 
            serializers: serializers
        })
    }

}
const serializers = {
    types: {
        madlibField: ({node}) => {
            return h('span', node.displayText, {id: node._key, className: 'empty'})
        }
    }
}