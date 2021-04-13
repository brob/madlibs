const sanityClient = require('@sanity/client')
module.exports = sanityClient({
    projectId: 'eyrp0gsd',
    dataset: 'production',
    useCdn: true

})

