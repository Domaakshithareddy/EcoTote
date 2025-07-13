import React, { useState } from "react";
import { Bot } from "lucide-react"; // Lucide bot icon

const responses = {
  hello: "Hi there! How can I help you today?",
  help: "You can ask about our products, delivery, rewards, leaderboard, or sustainable alternatives.",
  rewards: "You earn GreenPoints every time you make a sustainable purchase. You can redeem them in the Rewards section!",
  leaderboard: "The leaderboard shows top eco-conscious customers based on their GreenPoints!",
  delivery: "We usually deliver within 3-5 business days across India.",
  eco: "Our Eco Score helps you understand the environmental impact of each product.",
  recycle: "You can send back used eco-friendly items for recycling and earn bonus points!",
  toothbrush: "Instead of a plastic toothbrush, try our Bamboo Toothbrush – biodegradable and eco-friendly.",
  bottle: "Instead of single-use plastic bottles, use our stainless steel or copper water bottles.",
  bags: "Say no to plastic! Try our reusable cloth and jute bags.",
  detergent: "We offer eco-detergents made from plant-based ingredients with no microplastics.",
  default: "Sorry, I didn’t understand that. Try asking about rewards, products, leaderboard, or sustainable replacements.",
};

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const lowerInput = input.toLowerCase();

    let botReply = responses.default;
    if (lowerInput.includes("reward")) botReply = responses.rewards;
    else if (lowerInput.includes("leaderboard")) botReply = responses.leaderboard;
    else if (lowerInput.includes("eco score")) botReply = responses.eco;
    else if (lowerInput.includes("delivery")) botReply = responses.delivery;
    else if (lowerInput.includes("recycle")) botReply = responses.recycle;
    else if (lowerInput.includes("toothbrush")) botReply = responses.toothbrush;
    else if (lowerInput.includes("bottle")) botReply = responses.bottle;
    else if (lowerInput.includes("bag")) botReply = responses.bags;
    else if (lowerInput.includes("detergent")) botReply = responses.detergent;
    else if (lowerInput.includes("hello") || lowerInput.includes("hi")) botReply = responses.hello;
    else if (lowerInput.includes("help")) botReply = responses.help;

    const botMessage = { text: botReply, sender: "bot" };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans text-sm">
      {/* Floating Chatbot Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-green-600 rounded-full shadow-xl flex items-center justify-center hover:bg-green-700"
          title="Chatbot"
        >
          <Bot className="text-white" size={24} />
        </button>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div
          className="w-64 bg-white border border-gray-300 rounded-lg shadow-2xl flex flex-col justify-between"
          style={{ height: "350px", padding: "12px" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-semibold text-green-700 flex items-center gap-2">
              <Bot className="text-black" size={24} />
              Chat with us
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 border rounded-md p-2 mb-2 space-y-1 text-xs">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span
                  className={`inline-block max-w-[70%] px-2 py-1 rounded-md ${
                    msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input & Send */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="w-[170px] border border-gray-300 px-3 py-2 text-xs rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;



