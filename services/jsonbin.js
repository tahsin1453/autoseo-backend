import fetch from 'node-fetch';

export async function updateJsonBin(newData) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${process.env.BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": process.env.JSONBIN_KEY
    },
    body: JSON.stringify(newData)
  });
  return res.json();
}
