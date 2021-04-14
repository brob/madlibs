module.exports = function(userlib = {}) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Madlibs</title>
        <link rel="stylesheet" href="https://unpkg.com/some-nice-basic-css/global.css" />
        <style>
        html {
            font-size: 110%;
            line-height: 1.4em;
        }
        label {
            display: block;
        }
        input {
            display: block;
            width: 100%;
            padding: 1ex;
        }
        .empty {
            border-bottom: 1px dashed;
            padding: 0 2ch;
        }
        .container {
            width: 95vw;
            max-width: 80ch;
            margin: auto;
        }
        .stack > * + * {
            display: block;
            margin-top: 1rem;
        }
    </style>
    </head>
    <body>
        <div class="stack container">
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