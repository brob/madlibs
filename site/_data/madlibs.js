// Get our utilities
const client = require('../utils/sanityClient')
const {prepText} = require('../utils/portableTextUtils')
// The GROQ query used to find specific documents and 
// shape the output 
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
      }.children[]
  }`

module.exports = async function() {
    // Fetch data based on the query
    const madlibs = await client.fetch(query);

    // Prepare the Portable Text data
    const preppedMadlib = madlibs.map(prepText)
    // Return the full array
    return preppedMadlib
}
