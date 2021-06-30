// Grabs local env variables from .env file
// Not necessary if using Netlify Dev CLI
require('dotenv').config()

// Sanity JS Client
// The build client is read-only
// To use to write, we need to add an API token with proper permissions
const client = require('../utils/sanityClient')
client.config({
    token: process.env.SANITY_TOKEN,
    useCdn: false
})

// Small ID creation package
const {nanoid} = require('nanoid')

exports.handler = async (event) => { 
    // Get data off the event body
    const {
        pt, 
        userContentBlocks,
        id,
        libTitle
    } = JSON.parse(event.body)

    // Create new Portable Text JSON
    // from the old PT and the user submissions
    const newBlocks = findAndReplace(pt, userContentBlocks)
    
    // Create new Sanity document object
    // The doc's _id and slug are based on a unique ID from nanoid
    const docId = nanoid()
    const doc = {
        _type: "userLib",
        _id: docId,
        slug: { current: docId },
        madlib: id,
        title: `${libTitle} creation`,
        text: newBlocks,
    }

    // Submit the new document object to Sanity
    // Return the response back to the browser
    return client.create(doc).then((res) => {
        // Log the success into our function log
        console.log(`Userlib was created, document ID is ${res._id}`)
        // return with a 200 status and a stringified JSON object we get from the Sanity API
        return { statusCode: 200, body: JSON.stringify(doc) };
    }).catch(err => {
        // If there's an error, log it
        // and return a 500 error and a JSON string of the error
        console.log(err)
        return {
            statusCode: 500, body: JSON.stringify(err)
        }
    })
}

// Function for modifying the Portable Text JSON
// pt is the original portable Text
// mods is an object of modifications to make 
function findAndReplace(pt, mods) {
    // For each block object, check to see if a mod is needed and return an object
    const newPT = pt.map((block) => ({
        ...block, // Insert all current data
        children: block.children.map(span => {
            // For every item in children, see if there's a modification on the mods object
            // If there is, set modContent to the new content, if not, set it to the original text 
            const modContent = mods[span._key] ? mods[span._key].content : span.text
            // Return an object with all the original data, and a new property
            // displayText for use in the frontends
            return {
                ...span,
                displayText: modContent
            }
        })
    }))
    // Return the new Portable Text JSON
    return newPT
}