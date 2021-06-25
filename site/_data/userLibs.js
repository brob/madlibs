const client = require('../utils/sanityClient')
const {prepText} = require('../utils/portableTextUtils')

const query = `*[_type == "userLib"]{
    title,
    "slug": slug.current,
    text,
    _id
  }`

module.exports = async function() {
    const madlibs = await client.fetch(query);
    // Protect against no madlibs returning
    if (madlibs.length == 0) return {"404": {}} 

    // Run through our portable text serializer
    const preppedMadlib = madlibs.map(prepText)

    // Convert the array of documents into an object
    // Each item in the Object will have a key of the item slug
    // 11ty's Pagination will create pages for each one
    const mapLibs = preppedMadlib.map(item => ([item.slug, item]))
    const objLibs = Object.fromEntries(mapLibs)
    return objLibs
}
