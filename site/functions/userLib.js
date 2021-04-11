const sanityClient = require('@sanity/client');
const {nanoid} = require('nanoid')
var NestedKeys = require('nested-keys');

require('dotenv').config()

const client = sanityClient({
    projectId: 'eyrp0gsd',
    dataset: 'production',
    token: process.env.SANITY_TOKEN, // or leave blank to be anonymous user
    useCdn: true // `false` if you want to ensure fresh data
})

function findAndReplace(pt, mods) {
    mods.forEach(mod => {
        console.log(mod)
        pt.forEach(block => {
            block.children.forEach(child => {
                if (child._key == mod.id) {
                    console.log(child.displayText)
                    child.displayText = mod.content
                    console.log(child.displayText)
                }
            })
        })
    })

    return pt
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
    // console.log(doc)
    client.create(doc).then((res) => {
        console.log(`Userlib was created, document ID is ${res._id}`)
    })
    return { statusCode: 200, body: JSON.stringify(doc) };
}
