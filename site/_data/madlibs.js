const client = require('../utils/sanityClient')
const {prepText} = require('../utils/portableTextUtils')
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
    const madlibs = await client.fetch(query);

    const preppedMadlib = madlibs.map(prepText)
    return preppedMadlib
}
