import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith("https://www.swiggy.com")) {
    return res.status(400).json({ error: "Invalid or missing Swiggy URL" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Proxy fetch failed" });
  }
}
