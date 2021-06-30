// Attach the form handler
const form = document.querySelector('.madlibForm')
form.addEventListener('submit', completeLib);

function showText() {
  // Find the madlib text in the document
  const textDiv = document.querySelector('.madlibtext')
  // Toggle the class "show" to be present
  textDiv.classList.toggle('show')
}

// A function that takes the submit event
// From the event, it will get the contents of the inputs
// and write them to page and show the full text
function completeLib(event) {
  // Don't submit the form
  event.preventDefault();
  const { target } = event // The target is the form element

  // Get all inputs from the form in array format
  const inputs = Array.from(target.elements)

  inputs.forEach(input => {
    // The button is an input and we don't want that in the final data
    if (input.type != 'text') return
    // Find a span by the input's name
    // These will both be the _key value
    const replacedContent = document.getElementById(input.name)
    // Replace the content of the span with the input's value
    replacedContent.innerHTML = input.value
  })
  // Show the completed madlib
  showText();
}

// Find and attach listener to save link
const saver = document.querySelector('.saver')
saver.addEventListener('click', saveLib)

async function saveLib(event) {
  event.preventDefault();

  // Return an Map of ids and content to turn into an object
  const blocks = Array.from(document.querySelectorAll('.empty')).map(item => {
    return [item.id, { content: item.outerText }]
  })
  // Creates Object ready for storage from blocks map
  const userContentBlocks = Object.fromEntries(blocks);

  // Formats the data for posting
  const finalData = {
    userContentBlocks,
    pt, // From nunjucks on page
    ...data // From nunjucks on page
  }

  // Runs the post data function for createLib
  postData('/.netlify/functions/createLib', finalData)
    .then(data => {
      // When post is successful
      // Create a div for the final link
      const landingZone = document.createElement('div')
      // Give the link a class
      landingZone.className = "libUrl"
      // Add the div after the saving link
      saver.after(landingZone)
      // Add the new link inside the landing zone
      landingZone.innerHTML = `<a href="/userlibs/${data._id}/" class="savedUrl">Your url is /userlibs/${data._id}/</a>`

    }).catch(error => {
      // When errors happen, do something with them
      console.log(error)
    });
}



async function postData(url = '', data = {}) {
  // A wrapper function for standard JS fetch
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

