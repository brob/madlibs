const client = require('../utils/sanityClient')
const madlibTemplate = require('./libTemplate')
const toHtml = require('@sanity/block-content-to-html')
const h = toHtml.h;
const { builder } = require("@netlify/functions")


async function buildLib(event) {
    console.log('ran the full build')
    const {path} = event;
    const id = path.split('/').pop()
    const query = `*[_id == '${id}']{
        title,
        "slug": slug.current,
        text,
        _id
      }`

    return client.fetch(query).then(lib => {

        const preppedLib = lib.map(prepText)[0]
    
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

exports.handler = builder(buildLib)


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