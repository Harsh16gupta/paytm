import React, { useState } from "react";
import { marked } from "marked";

const Ai_final = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false); // ✅ Modal toggle state

    const sendMessage = async () => {
        if (!input.trim()) {
            setError("Please enter a message.");
            return;
        }

        setLoading(true);
        setError("");
        setResponse("");

        try {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",
                    messages: [{ role: "user", content: input }],
                }),
            });

            const data = await res.json();

            if (res.status === 401) {
                setError("Error: Unauthorized API key.");
                setLoading(false);
                return;
            }

            if (!res.ok) {
                throw new Error(data.error?.message || "Failed to fetch response.");
            }

            const markdownText = data.choices?.[0]?.message?.content || "No response received.";
            setResponse(marked.parse(markdownText));
            setShowModal(true); // ✅ Open modal when response is received
        } catch (error) {
            setError("Error Occurred", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            {/* ✅ Input & Button Section */}
            <div className="bg-cyan-500/20 rounded-3xl flex justify-between h-12">
                <input
                    type="text"
                    placeholder="Enter your question"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="outline-none pl-6 text-white w-1/2 bg-transparent"
                    onKeyDown={(e)=>{
                        if(e.key==='Enter' && !loading){
                            sendMessage()
                        }
                    }}
                />
                <button
                    onClick={sendMessage}
                    className="bg-cyan-300 rounded-4xl hover:bg-cyan-600 px-4 cursor-pointer w-1/4 text-lg text-gray-900 font-semibold "
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Ask AI"}
                </button>
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            {/* ✅ Modal: Show Response in New Interface */}
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-40">
                    {/* Glass Morphism Modal */}
                    <div className="bg-gray-600/50 backdrop-blur-md p-5 rounded-xl shadow-lg w-1/4 border border-gray-500/30">
                        <div className="flex justify-between items-center">

                            <h2 className="text-2xl font-bold text-white flex-grow text-center mt-1">
                                AI Chat Response
                            </h2>
                            {/* Close button for interface */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="material-icons text-white hover:text-gray-300 cursor-pointer"
                                style={{ fontSize: "30px" }}
                                onKeyDown={(e)=>{
                                    if(e.key==='Escape'){
                                        setShowModal(false)
                                    }
                                }}
                            >
                                close
                            </button>
                        </div>
                        <div
                            className="mt-4 border border-none p-3 bg-transparent rounded text-gray-100 text-lg ml-6 mr-6 overflow-y-auto scrollbar-hide text-left"
                            style={{ maxHeight: "70vh" }} 
                            dangerouslySetInnerHTML={{ __html: response }}
                        />
                        {/* adding input bar for more chats */}
                            <div>

                            </div>
                        {/* Close Modal Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors block m-auto"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ai_final;
