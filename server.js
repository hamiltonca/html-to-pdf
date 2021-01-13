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
    const browser = await puppeteer.launch(
        {product:'chrome',
            executablePath :'/opt/google/chrome/chrome',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        })
    const page = await browser.newPage()
    await page.emulateMediaType('screen')
    await page.setViewport( {
        width: 800,
        height: 1200,
        isMobile: false
    })
    await page.setContent(reqBody)
    // await page.emulate(options: { viewport:{ isMobile: false}})
    pdf = await page.pdf( {
        format: "letter",
        printBackground: true
    })
    return res.set('Content-Type',"application/pdf")
        .send(pdf)
} )
//
// async function topdf(html) {
//
// }

const port = 8080
app.listen(port, () => {
    console.log("Server is running on " + port)
})
