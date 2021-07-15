import puppeteer from 'puppeteer';



const scrap = async (req, res, next) => {
    console.log("i am in my middleware")
    console.log(req.body.source)
    try {
        console.log("hello")
        const browser = await puppeteer.launch();   
        console.log("hello2")

        await page.waitForSelector('#is-loaded')

        await page.goto(source{});





        console.log("hello5")
        const fileName = Math.random().toString(36).substring(7) + ".pdf";
        
        console.log(fileName);
        await page.pdf({ path: `public/${fileName}`, format: 'a4' });
        console.log("good bye")

        await browser.close();  
        req.body.printedSource = `${fileName}`; 
        return next();
    } catch (error) {
        res.json(error);
    }

}

export default scrap;