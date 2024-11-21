import Header from "../components/Header"
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/useMessageStore.js";
import MessageInput from "../components/MessageInput";
import { useMatchesStore } from "../store/useMatchesStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const ChatPage = () => {
  const { messages } = useMessageStore();
  const { authUser } = useAuthStore();
  const { getMyMatches, matches, isLoadingMyMatches } = useMatchesStore();

  const { id } = useParams();

  const match = matches.find(m => m._id === id);
  useEffect(() => {
    if (authUser) {
      getMyMatches();

    }
  }, [getMyMatches, authUser])

  if(!match) return <div>Match not found</div>
  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-opacity-50">

      <Header />

      <div className="flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full">
        <div className="flex items-center mb-4 bg-white rounded-lg shadow p-3">
          <img src={match.image || "/avatar.png"} alt={match.name} className="size-12 object-cover rounded-full mr-3 border-2 border-pink-300" />
          <h2 className="text-xl font-semibold text-gray-800">{match.name || "User"}</h2>
        </div>
        <div className="flex-grow overflow-y-auto mb-4  bg-white rounded-lg shadow p-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Start your conversation with {match.name}</p>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className={`mb-3 ${msg.sender === authUser._id ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md 
                    ${msg.sender === authUser._id
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-gray-800"
                    }`}>
                  {msg.content}
                </span>
              </div>
            ))
          )}
        </div>
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatPage