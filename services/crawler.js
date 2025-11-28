import cheerio from 'cheerio';
import fetch from 'node-fetch';

export async function crawl(url) {
  const html = await (await fetch(url)).text();
  const $ = cheerio.load(html);
  return {
    title: $("title").text(),
    h1: $("h1").text(),
    meta_desc: $('meta[name="description"]').attr("content") || "",
    content_length: $("body").text().length
  };
}
