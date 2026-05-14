import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

/**
 * ChatBot Component
 * Integrated with n8n Webhook
 * 
 * PASTE YOUR WEBHOOK URL BELOW:
 */
const N8N_WEBHOOK_URL = 'https://siddu-vadla22.app.n8n.cloud/webhook/859f5af1-d693-44ca-acff-15a038e37d6f/chat'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Nutrition Assistant. How can I help you today?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { id: Date.now(), text: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsLoading(true)

    try {
      // If the user hasn't set the URL yet, show a helpful message
      if (N8N_WEBHOOK_URL === 'YOUR_N8N_WEBHOOK_URL_HERE' || !N8N_WEBHOOK_URL) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: "Hello! To make this chat work, please paste your n8n webhook URL in `src/components/ChatBot.jsx` on line 10.",
            sender: 'bot'
          }])
          setIsLoading(false)
        }, 1000)
        return
      }

      const response = await axios.post(N8N_WEBHOOK_URL, {
        chatInput: currentInput,
        sessionId: 'session-' + Date.now() // Optional: for maintaining context in n8n
      })

      // n8n response handling (adjust based on your workflow output)
      // Standard n8n chat trigger usually returns data directly or in an 'output' field
      const botText = response.data.output || response.data.message || response.data[0]?.message || "I've received your message, but my response logic needs to be configured in n8n!"

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }])
    } catch (error) {
      console.error("ChatBot Error:", error)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting to the assistant. Please verify your webhook URL and n8n workflow.",
        sender: 'bot'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[320px] sm:w-[380px] h-[500px] max-h-[70vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-600 to-brand-700 flex items-center justify-between text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl shadow-inner">
                🥦
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none mb-1">Nutrition Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                  <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                  ? 'bg-brand-600 text-white rounded-br-none shadow-lg shadow-brand-600/10'
                  : 'bg-white/10 text-slate-100 border border-white/5 rounded-bl-none backdrop-blur-sm'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/10 text-slate-100 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none backdrop-blur-sm">
                  <div className="flex gap-1.5 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-slate-900/50 border-t border-white/5 backdrop-blur-md">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about nutrition, recipes..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-500 hover:text-brand-400 disabled:opacity-20 disabled:hover:text-brand-500 transition-all duration-200 hover:scale-110 active:scale-90"
              >
                <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 opacity-30">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Powered by n8n Intelligence</span>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(22,163,74,0.3)] transition-all duration-500 hover:scale-110 active:scale-95 ${isOpen
          ? 'bg-slate-800 text-white rotate-90 shadow-none'
          : 'bg-brand-600 text-white hover:shadow-[0_12px_40px_rgba(22,163,74,0.5)]'
          }`}
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-brand-600 rounded-full animate-bounce"></span>
          </div>
        )}
      </button>
    </div>
  )
}
