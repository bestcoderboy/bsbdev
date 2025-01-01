const fs = require('fs')
const path = require('path')

const commitHash = process.env.CF_PAGES_COMMIT_SHA || ''
const shortHash = commitHash.slice(0, 6)  // only the first six chars like ab1cd2
const filePath = path.resolve(__dirname, './website/index.html')

try {
    let html = fs.readFileSync(filePath, 'utf8')
    html = html.replace('{{{COMMIT-HASH}}}', shortHash)
    fs.writeFileSync(filePath, html)
} catch (err) {
    console.error(`error while reading index.html: ${err.message}`)
    process.exit(1)
}