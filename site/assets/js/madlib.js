// Attach the form handler
const form = document.querySelector('.madlibForm')
form.addEventListener('submit', completeLib);



function completeLib(event) {
    // Don't submit the form
    event.preventDefault();
    const { target } = event // The target is the form element

    // Get all inputs from the form in array format
    const inputs = Array.from(target.elements)
    
    inputs.forEach(input => {
        // Make sure the input type is text
        if (input.type != 'text') return
        // Find an element by the input's name
        const replacedContent = document.getElementById(input.name)
        // Replace the content of the span with the input's value
        replacedContent.innerHTML = input.value
    })
    // Show the completed madlib
    showText();
    
}

const saver = document.querySelector('.saver')
saver.addEventListener('click', saveLib)

async function saveLib(event) {
    event.preventDefault();

    // Return an Map of ids and content to turn into an object
    const blocks = Array.from(document.querySelectorAll('.empty')).map(item => {
        return [item.id, {content: item.outerText}]
    })
    // Creates Object ready for storage from blocks map
    const userContentBlocks = Object.fromEntries(blocks);

    // Formats the data for posting
    const finalData = {
        userContentBlocks,
        pt,
        ...data
    }
    debugger
    // Runs the post data function for createLib
    postData('/.netlify/functions/createLib', finalData)
    .then(data => {
        const landingZone = document.createElement('div')
        landingZone.className = "libUrl"
        saver.after(landingZone)
        landingZone.innerHTML = `<a href="/userlibs/${data._id}/" class="savedUrl">Your url is /userlibs/${data._id}/</a>`

        return data; 
    });
}

function showText() {
    const textDiv = document.querySelector('.madlibtext')
    textDiv.classList.toggle('show')
}

async function postData(url = '', data = {}) {

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

