import puppeteer from 'puppeteer';

const scrap = async (req, res, next) => {
    console.log("in scrap")
    if(req.body.source.includes("twitter.com") ) {
        return next()
        } 
    try {
        const browser = await puppeteer.launch({  });  
        const page = await browser.newPage();
        await page.goto(req.body.source, {
            waitUntil: 'networkidle2',
        });
        const fileName = Math.random().toString(36).substring(7) + ".pdf";
        console.log(fileName);
        await page.pdf({ path: `public/${fileName}`, format: 'a4' });
        await browser.close();  
        req.body.printedSource = `${fileName}`; 
        return next();
    } catch (error) {
        res.json(error);
    };
};

export default scrap;