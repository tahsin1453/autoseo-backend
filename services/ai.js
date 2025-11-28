import fetch from 'node-fetch';

export async function generateContent(title, rakipUrl) {
  const payload = { instances: [{ title, rakip_url: rakipUrl }] };
  const res = await fetch(process.env.AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  return data.predictions ? data.predictions[0] : {};
}
