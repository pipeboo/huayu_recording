// /api/updateWixRecording.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, audioUrl,recipientName } = req.body;

  if (!code || !audioUrl || !recipientName) {
    return res.status(400).json({ error: 'Missing code or audioUrl' });
  }

  try {
    const wixResponse = await fetch('https://kps0980.wixsite.com/huayu-dryflower/_functions/updateRecording', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, audioUrl,recipientName })
    });

    const data = await wixResponse.json();

    if (!wixResponse.ok) {
      throw new Error(data.error || 'WIX request failed');
    }

    res.status(200).json({ message: 'Success', wixResult: data });
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  }
}