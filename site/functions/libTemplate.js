module.exports = function(userlib = {}) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Madlibs</title>
        <link rel="stylesheet" href="https://unpkg.com/some-nice-basic-css/global.css" />
        <link rel="stylesheet" href="/style.css">

    </head>
    <body>
        <div class="stack container bordered">
            <h1><a href="/">Madlibs</a></h1>
            <h2>${userlib.title}</h2>
            <div>
            ${userlib.htmlText}
            </div>    
        </div>
    </body>
    </html>
    `
}