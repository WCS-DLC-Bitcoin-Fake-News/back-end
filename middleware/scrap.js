import puppeteer from 'puppeteer';

const uncompressedTweetsDir = 'uncompressed_tweets';
const compressedTweetsDir = 'compressed_tweets';
const compressedFileSuffix = '_compressed';
const jpegCompression = 90;

const scrap = async (req, res, next) => {
    let url = req.body.source
    try {
        console.log(url);
        if(!url.includes('twitter.com')){
            return;
          }
          
        let urlArray = url.match(/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/);
        console.log(urlArray);
        let id = urlArray[4];
        console.log(id)
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle0',
          });
        console.log("i went to url")
       
        if (await page.$(`h1[data-testid="error-detail"]`) !== null) {
            console.log(`Tweet: ${id} looks to have been deleted.`);
            fs.writeFile(`public/${id}.txt`, `There was an error with this tweet (${id}). Has it been deleted?\r\n\r\n${url}`, function (err) {
              if (err) return console.log(err);
            });
            await browser.close();
            console.log("tweet exists")
            return;
          } else {
            // tweet hasn't been deleted so wait for the tweet to exist in the DOM
            await page.waitForSelector('article[role="article"]');
            // select the tweet in the page
            const tweet = await page.$('article[role="article"]');
            // select the tweets main body text
            const tweetBodyText = await page.$('article[role="article"] div[lang="en"]');
            // select the tweets date
            const tweetDateText = await page.$('article[role="article"] div[dir="auto"] > a[role="link"] > span');
        
            // we need to manipulate the page as by default the login / sticky header are included in the screenshot
            await page.evaluate(() => {
              // target the sticky header
              let topElement = document.querySelector('div[data-testid="titleContainer"]');
              // target the sign in and cookie banner
              let bottomElement = document.querySelector('#layers > div');
        
              // remove these elements as we don't want them in the screenshot
              topElement.parentNode.removeChild(topElement);
              bottomElement.parentNode.removeChild(bottomElement);
            });
        
            // extract the body and date text
            const bodyText = await page.evaluate(tweetBodyText => tweetBodyText.textContent, tweetBodyText);
            const dateText = await page.evaluate(tweetDateText => tweetDateText.textContent, tweetDateText);
        
            // write the tweet text and date to a txt file with the same ID as the screenshot
            fs.writeFile(`public/${id}.txt`, `${bodyText} - ${dateText}\r\n\r\n${url}`, function (err) {
              if (err) return console.log(err);
            });
        
            // screenshot the tweet, save to uncompressed folder
            await tweet.screenshot({path: `public/${id}.png`});
            // run the uncompressed image through the Squoosh CLI tool to convert it to a JPEG
            await exec(`squoosh-cli -d ${compressedTweetsDir} --mozjpeg ${jpegCompression} -s ${compressedFileSuffix} ${uncompressedTweetsDir}/${id}.png`);
          }
        
          // close the browser
          await browser.close();
          req.body.printedSource = `${id}`; 
          return next();
    } catch (error) {
        res.json(error);
    }
};












//         const browser = await puppeteer.launch();  
//         const page = await browser.newPage();
//         await page.goto(req.body.source, {
//             waitUntil: 'networkidle2',
//         });
//         const fileName = Math.random().toString(36).substring(7) + ".pdf";
//         console.log(fileName);
//         await page.pdf({ path: `public/${fileName}`, format: 'a4' });
//         await browser.close();  
//         req.body.printedSource = `${fileName}`; 
//         return next();
//     } catch (error) {
//         res.json(error);
//     }


export default scrap;