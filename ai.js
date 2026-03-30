export default async function handler(req, res) {
  const { prompt } = req.body;

  const apiKey = process.env.VOLC_API_KEY;
  const targetUrl = "https://ark.cn-beijing.volcesapi.com/api/v3/chat/completions";

  try {
    const resp = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "Doubao-1.5-lite-32k",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await resp.json();
    const result = data.choices?.[0]?.message?.content || "无返回内容";

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ result: "接口请求失败：" + err.message });
  }
}
