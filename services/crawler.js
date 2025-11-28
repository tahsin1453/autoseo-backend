import axios from "axios";
import cheerio from "cheerio";

// TARANACAK RAKİP SİTELER
const RAKIPLER = [
    "https://www.elektrikcigelsin.com/",
    "https://serielektrik.com/",
    "https://www.7-24elektrikci.com/",
    "https://www.elektrikci.com.tr/"
];

// URL TEMİZLEME
function cleanUrl(url) {
    try {
        url = url.trim();

        if (!url.startsWith("http"))
            url = "https://" + url;

        if (!url.endsWith("/"))
            url += "/";

        return new URL(url).href;
    } catch {
        console.log("❌ Geçersiz URL:", url);
        return null;
    }
}

export async function crawl(url) {
    const clean = cleanUrl(url);
    if (!clean) return null;

    try {
        console.log("Tarama:", clean);

        const res = await axios.get(clean, {
            headers: {
                "User-Agent": "Mozilla/5.0 Chrome/120"
            },
            timeout: 15000
        });

        const $ = cheerio.load(res.data);

        return {
            url: clean,
            title: $("title").text().trim() || "Başlık bulunamadı",
            description:
                $('meta[name="description"]').attr("content")?.trim() ||
                "Açıklama yok"
        };
    } catch (err) {
        console.log("Crawler error:", err.message);
        r
