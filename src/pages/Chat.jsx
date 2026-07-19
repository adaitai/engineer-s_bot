import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Bot } from "lucide-react";
import ConversationSidebar from "@/components/chat/ConversationSidebar";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import WelcomeScreen from "@/components/chat/WelcomeScreen";

const SYSTEM_PROMPT =
  "You are EngBot, an expert senior software engineer. Answer engineering and technical questions with accuracy and clarity. Use markdown formatting with code blocks where helpful. Be concise but thorough.";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  const loadConversations = async () => {
    const list = await base44.entities.Conversation.list("-updated_date");
    setConversations(list);
  };

  useEffect(() => { loadConversations(); }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  const selectConversation = async (id) => {
    const conv = await base44.entities.Conversation.get(id);
    setActiveId(id);
    setMessages(conv.messages || []);
  };

  const newChat = () => { setActiveId(null); setMessages([]); };

  const deleteConversation = async (id) => {
    await base44.entities.Conversation.delete(id);
    if (activeId === id) newChat();
    loadConversations();
  };

  const sendMessage = async (text) => {
    const userMsg = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setIsThinking(true);

    const history = nextMessages
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n\n");

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${SYSTEM_PROMPT}\n\nConversation so far:\n${history}\n\nAssistant:`,
    });

    const assistantMsg = { role: "assistant", content: response };
    const finalMessages = [...nextMessages, assistantMsg];
    setMessages(finalMessages);
    setIsThinking(false);

    let convId = activeId;
    if (convId) {
      await base44.entities.Conversation.update(convId, { messages: finalMessages });
    } else {
      const title = text.length > 40 ? text.slice(0, 40) + "…" : text;
      const created = await base44.entities.Conversation.create({ title, messages: finalMessages });
      convId = created.id;
      setActiveId(convId);
    }
    loadConversations();
  };

  return (
    <div className="flex h-screen bg-background">
      <ConversationSidebar conversations={conversations} activeId={activeId}
        onSelect={selectConversation} onNew={newChat} onDelete={deleteConversation} />
      <div className="flex-1 flex flex-col h-full">
        {messages.length === 0 && !isThinking ? (
          <WelcomeScreen onPick={sendMessage} />
        ) : (
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((m, i) => (
                <ChatMessage key={i} role={m.role} content={m.content} />
              ))}
              {isThinking && (
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl px-5 py-4 flex gap-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="px-6 pb-6 pt-2">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSend={sendMessage} disabled={isThinking} />
          </div>
        </div>
      </div>
    </div>
  );
}