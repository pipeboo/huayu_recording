# Huayu Web Recording 套件

## 說明
此專案為錄音與 Cloudinary 上傳 + 回傳 WIX CMS 的完整流程，包含：

- index.html：錄音 UI + 上傳功能
- /api/updateWixRecording：Vercel Proxy API 用於繞過 CORS 限制
- 呼叫 Cloudinary 上傳預設為 `huayu_recording`

## 使用方式
1. 上傳至 Vercel
2. 設定 domain，驗證可從 WIX 導入 `/record?code=XXX&key=XXX`
3. Cloudinary 請使用你的 `cloud_name` 與 unsigned preset
