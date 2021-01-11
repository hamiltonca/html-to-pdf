const puppeteer = require ('puppeteer')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.raw({type:'*/*'}))
app.get('/health', async (req, res) => {
    res
        .set({"Content-type": "text/plain", "Cache-Control": "no-cache"})
        .status(200)
        .send('OK')
})
app.post( '/', async (req, res) => {
    const reqBody = await req.body.toString()
    const contentType = req.header('Content-type')
    console.log("Content type:" + contentType)
    console.log("body:" + reqBody)
    const browser = await puppeteer.launch( {product:'chrome'})
    const page = await browser.newPage()
    await page.emulateMediaType('screen')
    await page.setViewport( {
        width: 800,
        height: 1200,
        isMobile: false
    })
    const loaded = await page.setContent(reqBody)
    console.log("loaded: " + loaded)
    // await page.emulate(options: { viewport:{ isMobile: false}})
    pdf = await page.pdf( {
        format: "letter",
        printBackground: true,
        margin: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    })
    return res.set('Content-Type',"application/pdf")
        .send(pdf)
} )
//
// async function topdf(html) {
//
// }

var port = 3000
app.listen(port, () => {
    console.log("Server is running on " + port)
})