// /api/updateWixRecording.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { code, audioUrl } = req.body;

    if (!code || !audioUrl) {
        return res.status(400).json({ success: false, error: '缺少必要欄位' });
    }

    try {
        const proxyRes = await fetch("https://huayu-recording.vercel.app/api/updateWixRecording", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: code, audioUrl: data.secure_url })
        });

        const result = await proxyRes.json();
        if (!result.success) {
            throw new Error(result.error || "更新失敗");
        }

        document.getElementById("status").innerText = "✅ 上傳成功！即將跳轉...";
        setTimeout(() => {
            window.location.href = `https://kps0980.wixsite.com/huayu-dryflower/playback-entry?code=${code}`;
        }, 2000);

    } catch (err) {
        console.error("更新 WIX 時出錯", err);
        document.getElementById("status").innerText = "❌ 音訊已上傳但無法寫入 WIX，請手動聯絡支援";
    }
}

