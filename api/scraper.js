const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.fcmobileforum.com/';

async function scrapeEventInfo() {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const imageContainers = $('.v__F4U');

    const imageUrls = imageContainers.map((_, element) => {
      const imageUrl = $(element).find('wow-image img').attr('data-src');
      return imageUrl;
    }).get();

    const links = $('a').map((_, element) => $(element).attr('href')).get();

    const validLinks = links.filter(link => link && link.startsWith('http'));

    return {
      urls: validLinks,
      eventImages: imageUrls,
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      error: error.message,
    };
  }
}

async function scrapeEventImages() {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const imageContainers = $('.v__F4U');

    const imageUrls = imageContainers.map((_, element) => {
      const imageUrl = $(element).find('img').attr('src');
      return imageUrl;
    }).get();

    return {
      eventImages: imageUrls,
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      error: error.message,
    };
  }
}

module.exports = {
  scrapeEventInfo,
  scrapeEventImages,
};