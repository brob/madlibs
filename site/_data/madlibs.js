const client = require('../utils/sanityClient')
const toHtml = require('@sanity/block-content-to-html')
const h = toHtml.h;
const query = `*[_type == "madlib"]{
    title,
    "slug": slug.current,
    text,
    _id,
    "formFields": text[]{
        children[_type == "madlibField"]{
        displayText,
        grammar,
        _key
      }
      }[].children
  
  }`

module.exports = async function() {
    const madlibs = await client.fetch(query);

    const processedMadlibs = madlibs.map(madlib =>{
        const flatFields = madlib.formFields.flat(2);
        madlib.formFields = flatFields

        return madlib
    })
    const preppedMadlib = processedMadlibs.map(prepText)
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