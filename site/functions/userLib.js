const sanityClient = require('@sanity/client');
const {nanoid} = require('nanoid')

require('dotenv').config()

const client = sanityClient({
    projectId: 'eyrp0gsd',
    dataset: 'production',
    token: process.env.SANITY_TOKEN, // or leave blank to be anonymous user
    useCdn: true // `false` if you want to ensure fresh data
})

function findAndReplace(pt, mods) {
    const newPT = pt.map((block) => ({
        ...block,
        children: block.children.map(span => {
            const modContent = mods[span._key] ? mods[span._key].content : span.text
            return {
                ...span,
                displayText: modContent
            }
        })
    }))
    return newPT
}

exports.handler = async (event, context) => { 
    
    const body = JSON.parse(event.body)
    const newBlocks = findAndReplace(body.pt, body.userContentBlocks)
    const doc = {
        _type: "userLib",
        _id: nanoid(),
        madlib: body.id,
        title: `${body.libTitle} creation`,
        text: newBlocks,
        ugc: body.userContentBlocks,
    }
    doc.slug = {current: doc._id}
    return client.create(doc).then((res) => {
        console.log(`Userlib was created, document ID is ${res._id}`)
        return { statusCode: 200, body: JSON.stringify(doc) };
    }).catch(err => {
        console.log(err)
        return {
            statusCode: 500, body: JSON.stringify(err)
        }
    })
}