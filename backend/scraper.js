const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const parser = require("word-salience");
const dotenv = require("dotenv");

app.use(cors());
const jsonParser = bodyParser.json();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running...");
});

// app.get("/", (req, res) => {
//   res.send("welcome to linkeeper");
// });

const fetchKeyWords = (url) => {
  const keywordsMeta = url('meta[name="keywords"]').attr("content");
  if (keywordsMeta) {
    return keywordsMeta;
  }
  return "";
};

const fetchDescription = (url) => {
  const descriptionMetaName = url('meta[name="description"]').attr("content");
  if (descriptionMetaName) {
    return descriptionMetaName;
  }
  return "";
};

const fetchTitle = (url) => {
  const title = url("title").html();
  if (title) {
    return title;
  }
  return "";
};

const fetchDomainName = (url) => {
  let { hostname } = new URL(url);
  let logoUrl = `https://logo.clearbit.com/${hostname}`;
  return logoUrl;
};

app.post("/parse", jsonParser, (req, res) => {
  request(req.body.url, async (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let keyWordFlag = fetchKeyWords($);
      let titleFlag = fetchTitle($);
      let descriptionFlag = fetchDescription($);
      let results = keyWordFlag + " " + titleFlag + " " + descriptionFlag;
      let parsedResult = parser.getSalientWords(results).slice(0, 5);
      let logoImgUrl = fetchDomainName(req.body.url);
      let shortTitleParent = titleFlag.split(/[.^$*+-?()[]{}\/|—]/);
      let shortTitle = shortTitleParent[0];
     
      return res.send({
        results: parsedResult,
        logo: logoImgUrl,
        title: shortTitle,
      });
    }
  });
});
