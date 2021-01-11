const puppeteer = require ('puppeteer')
const fs = require('fs')

async function runit() {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.setContent("<html><body><h1>Hello</h1><div>This is a test</div></body></html>")
        await page.emulateMediaType('screen')
        const pdf = await page.pdf({
            format: "letter",
            printBackground: true,
        })
        console.log("pdf generated")
        await browser.close()
        console.log("were done.")
        return pdf
    } catch (error) {
        console.error("an error occurred...", error)
    }
}

const pdf = runit()
    .then( console.log ("function completed."))
    .catch(error => console.log("Error: ", error))
const content = pdf.then( content => {
        fs.writeFileSync("testpdf.pdf", content)
    }

)
console.log("exiting")

