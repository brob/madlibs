const client = require('../utils/sanityClient')
const madlibTemplate = require('./libTemplate')
const toHtml = require('@sanity/block-content-to-html')
const h = toHtml.h;


exports.handler = async (event, context) => { 
    const {queryStringParameters} = event;
    console.log(queryStringParameters)
    const query = `*[_id == '${queryStringParameters.id}']{
        title,
        "slug": slug.current,
        text,
        _id
      }`
      console.log(query)

    return client.fetch(query).then(lib => {
        console.log(lib)

        const preppedLib = lib.map(prepText)[0]
        console.log(preppedLib)
    
        return { statusCode: 200, body: madlibTemplate({title: preppedLib.title, htmlText: preppedLib.htmlText}) };
    
    }).catch(err => {
        console.log(err)
        return { 
            body: JSON.stringify(err),
            statusCode: 301,
            headers: {
              Location: '/404',
            }            
        }
    });
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
            console.log(node)
            return h('span', node.displayText, {id: node._key, className: 'empty'})
        }
    }
}