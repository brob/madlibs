const sanityClient = require('@sanity/client')
module.exports = sanityClient({
    projectId: 'eyrp0gsd',
    dataset: 'production',
    apiVersion: '2021-06-07',
    useCdn: true

})

