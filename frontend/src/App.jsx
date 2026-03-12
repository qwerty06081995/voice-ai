import { useState } from "react"
import axios from "axios"

function App() {

    const [message, setMessage] = useState("")
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {

        if (!message) return

        setLoading(true)

        try {

            const res = await axios.post("http://localhost:5000/chat", {
                message: message
            })

            setResponse(res.data.reply)

        } catch (error) {

            alert("Ошибка при запросе")

        }

        setLoading(false)

    }
    const startVoice = () => {

        const recognition = new window.webkitSpeechRecognition()

        recognition.lang = "ru-RU"

        recognition.onresult = (event) => {

            const text = event.results[0][0].transcript
            setMessage(text)

        }

        recognition.start()

    }
    return (
        <div className="flex flex-col justify-center h-screen root-div">
            <div className="top-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="top-header">
                <h2>Hi there!</h2>
                <h1>What would you like to know?</h1>
                <p>Use one of the most common prompts below or ask your own question</p>
            </div>
            <div className="w-full max-w-3 xl mx-auto p-4">
                <div className="chat-area">
                    <button className="chat-controls audio-btn"
                            onClick={startVoice}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                    </button>

                    <input
                        type="text"
                        placeholder="Ask whatever you want"
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    />

                    <button className="chat-controls send-btn"
                            onClick={sendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </button>

                </div>
                <div className="response-area">
                    {loading && <p>Loading...</p>}
                    {response && (
                        <div className="border response-area_block">
                            {response}
                        </div>
                    )}
                </div>
            </div>
        </div>

        // <div className="flex flex-col items-center justify-center h-screen gap-4">
        //
        //     <h1 className="text-2xl font-bold">
        //         ChatGPT Demo
        //     </h1>
        //
        //     <textarea
        //         className="border p-2 w-96 h-24"
        //         value={message}
        //         onChange={(e)=>setMessage(e.target.value)}
        //         placeholder="Введите текст..."
        //     />
        //     <button
        //         onClick={startVoice}
        //         className="bg-green-500 text-white px-4 py-2 rounded"
        //     >
        //         🎤
        //     </button>
        //     <button
        //         onClick={sendMessage}
        //         className="bg-blue-500 text-white px-4 py-2 rounded"
        //     >
        //         Отправить
        //     </button>
        //
        //     {loading && <p>Загрузка...</p>}
        //
        //     {response && (
        //         <div className="border p-4 w-96">
        //             {response}
        //         </div>
        //     )}
        //
        // </div>
    )
}

export default App