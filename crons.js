import cron from 'cron';
import { crawl } from './services/crawler.js';
import { generateContent } from './services/ai.js';
import { updateJsonBin } from './services/jsonbin.js';

const job = new cron.CronJob('0 2 * * *', async () => {
    console.log("Running cron job...");
    // Placeholder demo logic
    const rakip = await crawl("https://example.com");
    const ai = await generateContent("Demo Title", "https://example.com");
    await updateJsonBin({ pages: [ai] });
});

job.start();
