import {getAIResponse} from "../services/aiServices.js"

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    await getAIResponse(message, (chunk) => {
        
      res.write(chunk);
    });

    

    res.end();
  } catch (error) {
    console.log(error);

    if (!res.headersSent) {
      res.status(500).json({ error: "AI Error" });
    } else {
      res.end();
    }
  }
};