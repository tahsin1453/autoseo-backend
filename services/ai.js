export async function generateContent(title, url) {
    return {
        generatedTitle: "AI Title for " + title,
        generatedSlug: url,
        generatedDescription: "AI generated description for " + title
    };
}
