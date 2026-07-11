import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'
import { Paperclip, Plus, Send, Menu, Moon, Sun, X } from 'lucide-react'
import { setCurrentChatId } from '../chat.slice'

const Dashboard = () => {
  const chat = useChat()
  const dispatch = useDispatch()
  const [chatInput, setChatInput] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isChatListOpen, setIsChatListOpen] = useState(false)
  const [isReplyLoading, setIsReplyLoading] = useState(false)
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = async (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage || isReplyLoading) {
      return
    }

    setChatInput('')
    setIsReplyLoading(true)

    try {
      await chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    } finally {
      setIsReplyLoading(false)
    }
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
    setIsChatListOpen(false)
  }

  const handleNewChat = () => {
    setChatInput('')
    dispatch(setCurrentChatId(null))
    setIsChatListOpen(false)
  }

  const isDark = isDarkMode
  
  const pageBg = isDark
    ? 'bg-gradient-to-b from-[#071726] via-[#04121a] to-[#020615] text-slate-100'
    : 'bg-white text-slate-900'
  const sidebarBg = isDark ? 'border-[#0b2f33] bg-[#07121a]/95' : 'border-gray-200 bg-white'
  const teal = '#24c2c6'
  const sidebarButton = isDark
    ? `border-[#0b2f33] bg-[#07121a] text-slate-100 hover:bg-[#062628]`
    : `border-gray-200 bg-white text-gray-700 hover:bg-gray-100`
  const primaryButton = 'rounded-xl bg-[#24c2c6] p-3 text-slate-900 transition hover:scale-105 hover:shadow-[0_10px_30px_rgba(36,194,198,0.18)] disabled:opacity-50'
  const headerBg = isDark ? 'border-transparent bg-transparent' : 'border-gray-200 bg-white'
  const inputPanel = isDark
    ? 'border-[#12373a] bg-[#07121a]/90 shadow-[0_30px_60px_rgba(2,12,19,0.6)]'
    : 'border-gray-200 bg-white shadow-[0_10px_40px_rgba(98,114,255,0.18)]'
  const messageSurface = isDark
    ? 'border-[#0b2f33] bg-[#07121a] text-slate-100'
    : 'border-gray-200 bg-white text-gray-800'
  const iconButton = isDark
    ? 'border-[#0b2f33] bg-[#07121a] text-slate-100 hover:bg-[#062628]'
    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
  const codeBlock = isDark ? 'bg-[#02242a] text-slate-100' : 'bg-gray-100 text-gray-800'
  const codeInline = isDark ? 'bg-[#023336] text-slate-100' : 'bg-gray-200 text-gray-800'

  return (
    <main className={`relative min-h-screen overflow-hidden ${pageBg}`}>
      <div
        className={`absolute left-1/2 top-40 h-80 w-80 -translate-x-1/2 rounded-full blur-[140px] ${
          isDark ? 'bg-cyan-500/20' : 'bg-blue-300/30'
        }`}
      />
      <div
        className={`absolute left-1/3 top-32 h-72 w-72 rounded-full blur-[140px] ${
          isDark ? 'bg-orange-400/20' : 'bg-orange-300/30'
        }`}
      />

      <section className="relative mx-auto flex h-screen max-w-7xl">
        {isChatListOpen && (
          <button
            type="button"
            aria-label="Close chat list"
            onClick={() => setIsChatListOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 ml-0 mt-0 flex h-[calc(100vh-1.5rem)] w-72 flex-col border-r rounded-r-3xl shadow-sm transition-transform duration-300 lg:ml-3 lg:mt-3 lg:static lg:h-auto lg:translate-x-0 ${sidebarBg} ${
            isChatListOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className={`flex items-center justify-between border-b p-6 ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
            <h1 className="text-2xl font-bold">Cortex AI</h1>
            <button
              type="button"
              onClick={() => setIsChatListOpen(false)}
              aria-label="Close chat list"
              className={`rounded-xl border p-2 lg:hidden ${iconButton}`}
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-5 py-4">
            <button
              type="button"
              onClick={handleNewChat}
              className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 font-medium transition bg-[#24c2c6] text-slate-900 border-[#24c2c6] hover:shadow-[0_8px_30px_rgba(36,194,198,0.12)]`}
            >
              <Plus size={18} />
              New chat
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto px-5 py-4 scrollbar-none">
            {Object.values(chats).map((chatItem, index) => (
              <button
                key={index}
                onClick={() => openChat(chatItem.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${sidebarButton}`}
              >
                {chatItem.title}
              </button>
            ))}
          </div>
        </aside>

        <section className="relative flex flex-1 flex-col">
          <header className={`mx-3 mt-3 flex items-center justify-between rounded-2xl border-b px-4 py-3 shadow-sm sm:px-6 ${headerBg}`}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsChatListOpen(true)}
                className={`rounded-xl border p-2 lg:hidden ${iconButton}`}
              >
                <Menu size={18} />
              </button>
              <div>
                <p className="text-sm font-semibold">Current chat</p>
                <p className="text-xs opacity-70">{chats[currentChatId]?.title || 'Start a new conversation'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsDarkMode((value) => !value)}
              className={`rounded-xl border p-2 transition ${iconButton}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </header>

          <div className="mx-auto w-full max-w-4xl flex-1 overflow-y-auto px-5 py-10 pb-44 scrollbar-none">
            {chats[currentChatId]?.messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-3xl px-5 py-4 shadow-sm ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-black text-white'
                      : `rounded-bl-md border ${messageSurface}`
                  }`}
                >
                  {message.role === 'user' ? (
                    <p>{message.content}</p>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-2">{children}</p>,
                        ul: ({ children }) => <ul className="mb-2 list-disc pl-5">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-2 list-decimal pl-5">{children}</ol>,
                        pre: ({ children }) => <pre className={`overflow-auto rounded-xl p-4 ${codeBlock}`}>{children}</pre>,
                        code: ({ children }) => <code className={`rounded px-1 ${codeInline}`}>{children}</code>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {isReplyLoading && (
              <div className="mb-6 flex justify-start">
                <div className={`max-w-xs rounded-3xl rounded-bl-md border px-5 py-4 shadow-sm ${messageSurface}`}>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400" />
                  </div>
                  <p className="mt-2 text-sm opacity-80">AI is thinking...</p>
                </div>
              </div>
            )}
          </div>

          <footer className="absolute bottom-6 left-1/2 w-[95%] max-w-4xl -translate-x-1/2">
            <form
              onSubmit={handleSubmitMessage}
              className={`rounded-[28px] border p-4 ${inputPanel}`}
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask anything..."
                disabled={isReplyLoading}
                className={`mb-4 w-full bg-transparent text-lg outline-none placeholder:text-gray-400 ${isDark ? 'text-slate-100' : 'text-gray-700'} ${isReplyLoading ? 'cursor-not-allowed opacity-70' : ''}`}
              />

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`rounded-xl border p-3 transition ${iconButton}`}
                  >
                    <Paperclip size={20} />
                  </button>

                  <button
                    type="button"
                    className={`rounded-xl border p-3 transition ${iconButton}`}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!chatInput.trim() || isReplyLoading}
                  className={primaryButton}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </footer>
        </section>
      </section>
    </main>
  )
}

export default Dashboard