import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
    // model: "gemini-1.5-flash"
    model: "gemini-3.1-flash-lite-preview"
})

/*
История диалога
*/
let history = []

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body

        if (!message) {
            return res.status(400).json({
                error: "Empty message"
            })
        }

        history.push({
            role: "user",
            parts: [{ text: message }]
        })

        const chat = model.startChat({
            history: history
        })

        const result = await chat.sendMessage(message)

        const response = await result.response
        const text = response.text()

        history.push({
            role: "model",
            parts: [{ text }]
        })

        res.json({
            reply: text
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            error: "Gemini API error"
        })

    }

})
app.post("/chat-stream", async (req, res) => {

    try {

        const { message } = req.body

        const chat = model.startChat()

        const result = await chat.sendMessageStream(message)

        res.setHeader("Content-Type", "text/plain")

        for await (const chunk of result.stream) {

            const text = chunk.text()

            res.write(text)

        }

        res.end()

    } catch (error) {

        console.error(error)

        res.status(500).send("Streaming error")

    }

})
app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT)
})