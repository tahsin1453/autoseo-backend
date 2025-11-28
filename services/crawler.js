import axios from "axios";
import * as cheerio from "cheerio";

function cleanUrl(url) {
    try {
        url = url.trim();
        if (!url.startsWith("http")) url = "https://" + url;
        if (!url.endsWith("/")) url += "/";
        return new URL(url).href;
    } catch {
        console.log("❌ Invalid URL:", url);
        return null;
    }
}

export async function crawl(url) {
    const clean = cleanUrl(url);
    if (!clean) return null;

    try {
        console.log("Tarama başlıyor:", clean);

        const response = await axios.get(clean, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
            },
            timeout: 15000
        });

        const html = response.data;
        const $ = cheerio.load(html);

        let title = $("title").text().trim() || "Başlık bulunamadı";
        let description =
            $('meta[name="description"]').attr("content")?.trim() ||
            "Açıklama bulunamadı";

        return { url: clean, title, description };
    } catch (err) {
        console.error("❌ Crawler hatası:", err.message);
        return null;
    }
}
