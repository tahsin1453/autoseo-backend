import express from "express";
import cron from "cron";
import { crawl } from "./services/crawler.js";
import { generateContent } from "./services/ai.js";
import { updateJsonBin } from "./services/jsonbin.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("AutoSEO Backend Running");
});

const SITES = [
    "https://www.elektrikcigelsin.com/",
    "https://serielektrik.com/",
    "https://www.7-24elektrikci.com/",
    "https://www.elektrikci.com.tr/"
];

const job = new cron.CronJob("0 */6 * * *", async () => {
    console.log("CRON started");

    const results = [];

    for (const site of SITES) {
        const crawled = await crawl(site);
        if (crawled) {
            const aiData = await generateContent(crawled.title, site);
            results.push(aiData);
        }
    }

    if (results.length > 0) {
        await updateJsonBin({ pages: results });
        console.log("JSONBin updated.");
    }
});

job.start();

app.get("/run", async (req, res) => {
    try {
        const site = "https://www.elektrikcigelsin.com/";
        const crawled = await crawl(site);
        const ai = await generateContent(crawled.title, site);

        await updateJsonBin({ pages: [ai] });

        res.send("Manual run OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => console.log("Running on " + PORT));