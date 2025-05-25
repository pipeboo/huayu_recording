export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method Not Allowed' });

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ success: false, error: '無法解析 JSON' });
  }

  const { code, audioUrl } = body;
  if (!code || !audioUrl) {
    return res.status(400).json({ success: false, error: '缺少必要欄位' });
  }

  try {
    const wixRes = await fetch(
      'https://kps0980.wixsite.com/_functions/updateRecording',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, audioUrl })
      }
    );
    const data = await wixRes.json();
    if (!wixRes.ok) return res.status(500).json({ success: false, error: 'WIX 回傳錯誤', detail: data });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: '伺服器錯誤' });
  }
}
