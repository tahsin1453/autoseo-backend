import axios from "axios";

const BIN_ID = process.env.BIN_ID;
const MASTER_KEY = process.env.X_MASTER_KEY;

export async function updateJsonBin(data) {
    try {
        await axios.put(
            `https://api.jsonbin.io/v3/b/${BIN_ID}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": MASTER_KEY
                }
            }
        );
        console.log("JSONBin updated");
    } catch (err) {
        console.error("JSONBin error:", err.message);
    }
}
