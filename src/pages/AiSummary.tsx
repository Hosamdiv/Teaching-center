import axios from "axios";
import { useState } from "react";

export function AiSummary() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSummarize = async () => {
    const { data } = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `لخّص هذا النص: ${text}` }],
    }, {
      headers: { Authorization: `Bearer YOUR_API_KEY` }
    });
    setResult(data.choices[0].message.content);
  };

  return (
    <div className="p-4">
      <textarea onChange={(e) => setText(e.target.value)} className="border p-2 w-full" />
      <button onClick={handleSummarize} className="bg-blue-500 text-white p-2 mt-2">تلخيص</button>
      <p className="mt-4">{result}</p>
    </div>
  );
}
