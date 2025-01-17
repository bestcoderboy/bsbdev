const fs = require('fs')
const path = require('path')

const commitHash = process.env.CF_PAGES_COMMIT_SHA || ''
const shortHash = commitHash.slice(0, 7)  // only the first seven chars like ab1cd2e
const filePath = path.resolve(__dirname, './website/index.html')

try {
    let html = fs.readFileSync(filePath, 'utf8')
    html = html.replaceAll('{{{COMMIT-HASH}}}', shortHash)
    fs.writeFileSync(filePath, html)
} catch (err) {
    console.error(`error while reading index.html: ${err.message}`)
    process.exit(1)
}