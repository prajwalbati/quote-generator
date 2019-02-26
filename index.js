const axios = require('axios');
const cheerio = require('cheerio');

const SOURCE_URL = 'https://www.goodreads.com/quotes';

axios.get(SOURCE_URL).then(response => {
    getData(response.data);
})
.catch(error => {
    console.log(error);
});

let getData = html => {
    data = [];
    html = html.replace(/<br>/g, "-split-");
    html = html.replace(/&ldquo;/g, "");
    html = html.replace(/&rdquo;/g, "");
    const $ = cheerio.load(html);
    $('.quoteText').each((i, elem) => {
        let desc = $(elem).text();
        let quoteSplit = desc.split("-split-");
        let quote = quoteSplit[0];
        data.push({
            quote : quote.trim(),
            author: $(elem).find("span.authorOrTitle").text().trim()
        });
    });
    console.log(data);
}