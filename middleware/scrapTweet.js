import fetch from 'node-fetch';
import fs from 'fs';

const scrapTweet = async (req, res, next) => {
    console.log("in scrap tweet")

    if(req.body.printedSource) {
      return next()
    }

    try {
      const parts = req.body.source.split("/");
      const tweetId = parts[parts.length - 1];
      const response = await fetch('https://tweetpik.com/api/images', { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "d9a695ff-306a-4a3e-9aa1-dac67b50bd18"
        },
        body: JSON.stringify({
          tweetId,
          dimension: "autoHeight",
          displayLikes: true,
          displayReplies: false,
          displayVerified: true,
          displayRetweets: true,
          displayTime: true,
          backgroundColor: "hexa — #264653",
          textPrimaryColor: "hexa — #C0D7E3",
          textSecondaryColor: "hexa — #788E9B",
          linkColor: "hexa — #1189C4",
          verifiedIcon: "hexa — #1189C4",
        })
      })

      const data = await response.json()
      console.log(data)
      const img = await fetch(data.url);
      const buffer = await img.buffer();
      const fileName = Math.random().toString(36).substring(7) + ".png";
      console.log(fileName);
      fs.writeFile(`public/${fileName}`, buffer, () => console.log('finished downloading!'));
      req.body.printedSource = `${fileName}`; 
      return next();
    } catch (err){
      res.error(err)
    }
}

export default scrapTweet;