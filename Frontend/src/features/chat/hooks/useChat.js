import { initializeSocketConnection } from "../services/chat.socket.js";
import { sendMessage, getChats, getMessages, deleteChat } from "../services/chat.api.js";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages } from "../chat.slice.js";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()


    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId })
        const { chat, aiMessage } = data
        const currentId = chatId || chat._id

        if (!chatId) {
            dispatch(createNewChat({
                chatId: currentId,
                title: chat.title,
            }))
        }

        dispatch(addNewMessage({
            chatId: currentId,
            content: message,
            role: "user",
        }))
        dispatch(addNewMessage({
            chatId: currentId,
            content: aiMessage.content,
            role: aiMessage.role,
        }))
        dispatch(setCurrentChatId(currentId))
        localStorage.setItem('currentChatId', currentId)
    }

    async function handleGetChats({ restoreChatId } = {}) {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        const chatMap = chats.reduce((acc, chat) => {
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})
        dispatch(setChats(chatMap))

        if (restoreChatId && chatMap[restoreChatId]) {
            await handleOpenChat(restoreChatId, chatMap)
        } else if (restoreChatId) {
            localStorage.removeItem('currentChatId')
        }

        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId, chats) {

        if (chats[ chatId ]?.messages.length === 0) {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        }
        dispatch(setCurrentChatId(chatId))
        localStorage.setItem('currentChatId', chatId)
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }

}