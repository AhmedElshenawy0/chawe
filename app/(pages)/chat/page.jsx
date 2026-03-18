"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useChatHistory } from "@/app/hooks/Usechathistory";
import Image from "next/image";
import Link from "next/link";

/* ─── brand ─── */
const brandGrad    = "linear-gradient(135deg, #603394 0%, #8b5cf6 50%, #ec4899 100%)";
const brandGradSub = "linear-gradient(135deg, #603394 0%, #7c3aed 100%)";

/* ─── suggestion chips ─── */
const suggestions = [
  { icon: "✍️", label: "Write something",   prompt: "Help me write a professional email to my team."             },
  { icon: "💻", label: "Code something",    prompt: "Write a React hook for debouncing an input field."          },
  { icon: "🧠", label: "Explain a concept", prompt: "Explain how transformer models work simply."                },
  { icon: "📋", label: "Summarize text",    prompt: "What are the key points I should cover in a product spec?" },
];

/* ════════════════════════════════════════════
   sendMessage — SSE stream
════════════════════════════════════════════ */
async function sendMessage({ messages, onChunk, onDone, signal }) {
  const res = await fetch("/api/chat", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ messages }),
    signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  const reader  = res.body.getReader();
  const decoder = new TextDecoder();
  let   full    = "";
  let   buffer  = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const raw = line.slice(5).trim();
      if (raw === "[DONE]") continue;
      try {
        const chunk = JSON.parse(raw)?.delta?.text ?? "";
        if (chunk) { full += chunk; onChunk(full); }
      } catch { /* ignore */ }
    }
  }
  onDone(full);
  return full;
}

/* ─── typing indicator ─── */
function TypingDots() {
  return (
    <div className="flex gap-3 items-end">
      <div className="w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-lg" style={{ background: brandGrad }}>
        W
      </div>
      <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-2 shadow-md">
        {[0, 150, 300].map((delay) => (
          <span key={delay} className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
        ))}
      </div>
    </div>
  );
}

/* ─── message bubble ─── */
function Message({ msg, isNew }) {
  const isUser = msg.role === "user";

  return (
    <div
      className={`flex gap-3 items-end group ${isUser ? "flex-row-reverse" : ""} ${isNew ? "animate-slideUp" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center text-sm font-bold shadow-md transition-transform duration-200 group-hover:scale-105`}
        style={isUser
          ? { background: "linear-gradient(135deg,#e0e7ff,#c7d2fe)", color: "#4f46e5" }
          : { background: brandGrad, color: "white" }
        }
      >
        {isUser ? "Y" : "W"}
      </div>

      {/* Bubble */}
      <div className={`max-w-[78%] sm:max-w-[70%] flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl text-[15px] sm:text-base leading-relaxed whitespace-pre-wrap break-words transition-all duration-200 ${
            isUser
              ? "text-white rounded-tr-sm shadow-lg shadow-violet-200/50"
              : "bg-white/90 backdrop-blur-sm border border-white/60 text-gray-800 rounded-tl-sm shadow-md"
          }`}
          style={isUser ? { background: brandGrad } : {}}
        >
          {msg.content}
          {msg.streaming && (
            <span className="inline-block w-0.5 h-[1.1em] bg-violet-400 ml-1 animate-pulse align-middle rounded-full" />
          )}
        </div>

        {!msg.streaming && (
          <button
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs text-gray-400 hover:text-violet-500 px-2 py-0.5 rounded-full hover:bg-violet-50"
            onClick={() => navigator.clipboard?.writeText(msg.content)}
          >
            copy
          </button>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { chats, addChat, updateChat } = useChatHistory();
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages,     setMessages]     = useState([]);
  const [input,        setInput]        = useState("");
  const [newMsgIdx,    setNewMsgIdx]    = useState(null);

  const bottomRef   = useRef(null);
  const textareaRef = useRef(null);
  const abortRef    = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const resizeTA = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  };

  const mutation = useMutation({
    mutationFn: ({ messages, onChunk, onDone, signal }) =>
      sendMessage({ messages, onChunk, onDone, signal }),
  });

  const send = () => {
    const text = input.trim();
    if (!text || mutation.isPending) return;

    const history  = messages.map(({ role, content }) => ({ role, content }));
    const userMsg  = { role: "user", content: text };
    const withUser = [...messages, { role: "user", content: text }];

    setNewMsgIdx(withUser.length - 1);
    setMessages(withUser);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const streamPlaceholder = { role: "assistant", content: "", streaming: true };
    setMessages([...withUser, streamPlaceholder]);

    abortRef.current = new AbortController();

    mutation.mutate(
      {
        messages: [...history, userMsg],
        signal:   abortRef.current.signal,
        onChunk:  (partial) => {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: partial, streaming: true };
            return copy;
          });
        },
        onDone: (full) => {
          setMessages((prev) => {
            const updated = [
              ...prev.filter((m) => !m.streaming),
              { role: "assistant", content: full, streaming: false },
            ];
            if (!activeChatId) {
              const id = Date.now();
              addChat(id, text.slice(0, 42));
              updateChat(id, updated);
              setActiveChatId(id);
            } else {
              updateChat(activeChatId, updated);
            }
            return updated;
          });
        },
      },
      {
        onError: (err) => {
          if (err.name === "AbortError") return;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: `❌ Error: ${err.message}`, streaming: false };
            return copy;
          });
        },
      }
    );
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const newChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setActiveChatId(null);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const selectChat = (id) => {
    const chat = chats.find((c) => c.id === id);
    setActiveChatId(id);
    setMessages(chat?.messages ?? []);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const isStreaming = mutation.isPending;

  return (
    <>
      {/* Global styles for custom animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%;   }
          50%       { background-position: 100% 50%; }
        }
        .animate-slideUp   { animation: slideUp 0.3s ease forwards; }
        .sidebar-glow      { box-shadow: inset -1px 0 0 rgba(139,92,246,0.15); }
        .input-glow:focus-within {
          border-color: rgba(139,92,246,0.5) !important;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.08), 0 4px 20px rgba(96,51,148,0.1);
        }
        .chip-hover:hover {
          border-color: rgba(139,92,246,0.35);
          box-shadow: 0 6px 20px rgba(96,51,148,0.12);
          transform: translateY(-2px);
        }
        .send-btn:not(:disabled):hover {
          box-shadow: 0 6px 20px rgba(96,51,148,0.4);
          transform: translateY(-1px);
        }
        .scrollbar-thin::-webkit-scrollbar       { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track  { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb  { background: rgba(255,255,255,0.1); border-radius: 99px; }
      `}</style>

      <div className="flex bg-[#f8f7ff] overflow-hidden h-screen">

        {/* ══════ SIDEBAR ══════ */}
        <aside
          className="flex-shrink-0 flex flex-col border-r border-white/[0.05] transition-all duration-300 overflow-hidden fixed md:relative inset-y-0 left-0 z-30 md:z-auto sidebar-glow"
          style={{
            width: sidebarOpen ? 272 : 0,
            height: "100%",
            background: "linear-gradient(180deg, #0d0d12 0%, #111118 100%)",
          }}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg" style={{ background: brandGrad }} />
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Chats</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <button
                onClick={newChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white border-none cursor-pointer transition-all duration-200 hover:opacity-90"
                style={{ background: brandGradSub, boxShadow: "0 2px 12px rgba(96,51,148,0.4)" }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New
              </button>
              <button className="cursor-pointer p-1.5 rounded-lg hover:bg-white/5 transition-colors" onClick={() => setSidebarOpen((p) => !p)}>
                <HiOutlineMenuAlt2 color="rgba(255,255,255,0.5)" size={18} />
              </button>
            </div>
          </div>

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin">
            {chats.length === 0 ? (
              <div className="flex flex-col items-center pt-12 gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.15)" }}>
                  <svg className="w-5 h-5" style={{ color: "rgba(139,92,246,0.5)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 text-center leading-relaxed">No conversations yet.<br/>Start a new chat above.</p>
              </div>
            ) : (
              chats.map((chat) => {
                const active = activeChatId === chat.id;
                return (
                  <button
                    key={chat.id}
                    onClick={() => selectChat(chat.id)}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-150 border-none cursor-pointer mb-0.5 group"
                    style={{ backgroundColor: active ? "rgba(139,92,246,0.15)" : "transparent" }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{ background: active ? brandGrad : "rgba(255,255,255,0.06)", boxShadow: active ? "0 2px 8px rgba(96,51,148,0.3)" : "none" }}
                    >
                      <svg className="w-3.5 h-3.5" style={{ color: active ? "white" : "rgba(255,255,255,0.3)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate transition-colors ${active ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>{chat.title}</p>
                      <p className="text-[11px] text-gray-700 mt-0.5">{chat.time}</p>
                    </div>
                    {active && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: brandGrad }} />}
                  </button>
                );
              })
            )}
          </div>

          {/* User footer */}
          <div className="p-3 flex items-center gap-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md" style={{ background: brandGrad }}>Y</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-300 truncate">You</p>
              <p className="text-[11px] text-gray-600">Free plan</p>
            </div>
            <button className="w-8 h-8 rounded-xl flex items-center justify-center border-none bg-transparent cursor-pointer hover:bg-white/8 transition-colors duration-150">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-20" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ══════ MAIN ══════ */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Top bar */}
          <div
            className="flex items-center gap-3 px-4 sm:px-5 py-3.5 flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(139,92,246,0.08)",
              boxShadow: "0 1px 20px rgba(96,51,148,0.06)",
            }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center border-none bg-transparent cursor-pointer hover:bg-violet-50 transition-colors duration-150 flex-shrink-0"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {sidebarOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                }
              </svg>
            </button>

            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                {activeChatId
                  ? chats.find((c) => c.id === activeChatId)?.title ?? "Conversation"
                  : "New conversation"
                }
              </h1>
              {messages.length > 0 && (
                <p className="text-xs text-gray-400">{messages.filter(m => !m.streaming).length} messages</p>
              )}
            </div>

            {/* Status pill */}
<div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(139,92,246,0.08)", color: "#7c3aed" }}>
  <span className="hidden sm:flex items-center gap-2">
    
    <Link href="/" className=" opacity-70 hover:opacity-100 transition-opacity font-semibold">
      Home
    </Link>
  </span>
</div>

            {isStreaming && (
              <button
                onClick={() => abortRef.current?.abort()}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors duration-150 cursor-pointer border-none"
                style={{ border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
                <span className="hidden sm:inline">Stop</span>
              </button>
            )}
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ background: "linear-gradient(180deg, #f8f7ff 0%, #faf9ff 100%)" }}>
            {messages.length === 0 ? (

              /* ── Welcome ── */
              <div className="flex flex-col items-center justify-center h-full px-4 sm:px-8 py-16 text-center">
                {/* Decorative background orbs */}
                <div className="absolute top-24 left-1/4 w-64 h-64 rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: brandGrad }} />
                <div className="absolute bottom-32 right-1/4 w-48 h-48 rounded-full opacity-[0.06] blur-3xl pointer-events-none" style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)" }} />

                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-3xl blur-xl opacity-30" style={{ background: brandGrad, transform: "scale(1.2)" }} />
                  <Image src="/We_logo.svg.png" alt="Logo" width={88} height={88} className="relative rounded-3xl" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                  What can I help with?
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mb-10 max-w-sm leading-relaxed">
                  Ask me anything — I can write, code, analyze, explain, and brainstorm with you.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {suggestions.map(({ icon, label, prompt }, i) => (
                    <button
                      key={label}
                      onClick={() => { setInput(prompt); textareaRef.current?.focus(); }}
                      className="chip-hover flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-sm text-sm sm:text-base font-medium text-gray-700 text-left cursor-pointer transition-all duration-200"
                      style={{
                        border: "1px solid rgba(139,92,246,0.12)",
                        boxShadow: "0 2px 12px rgba(96,51,148,0.06)",
                        animationDelay: `${i * 60}ms`,
                      }}
                    >
                      <span className="text-xl w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139,92,246,0.08)" }}>{icon}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

            ) : (

              /* ── Messages ── */
              <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-5">
                {messages.map((msg, i) => (
                  <Message key={i} msg={msg} isNew={i === newMsgIdx} />
                ))}
                {isStreaming && messages[messages.length - 1]?.role !== "assistant" && <TypingDots />}
                <div ref={bottomRef} />
              </div>

            )}
          </div>

          {/* ── Input bar ── */}
          <div
            className="flex-shrink-0 px-3 sm:px-5 py-3 sm:py-4"
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid rgba(139,92,246,0.08)",
            }}
          >
            <div
              className="max-w-3xl mx-auto flex items-end gap-2 rounded-2xl px-3 sm:px-4 py-3 transition-all duration-200 input-glow"
              style={{
                background: "rgba(248,247,255,0.9)",
                border: "1.5px solid rgba(139,92,246,0.15)",
                boxShadow: "0 2px 16px rgba(96,51,148,0.06)",
              }}
            >
              {/* Attach */}
              <button
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-violet-500 hover:bg-violet-50 transition-all duration-150 flex-shrink-0 mb-0.5 border-none bg-transparent cursor-pointer"
                title="Attach file"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => { setInput(e.target.value); resizeTA(); }}
                onKeyDown={onKey}
                placeholder="Message we..."
                className="flex-1 bg-transparent border-none outline-none resize-none text-sm sm:text-base text-gray-800 placeholder-gray-400 leading-relaxed py-1.5"
                style={{ maxHeight: "160px", overflowY: "auto" }}
              />

              {/* Send */}
              <button
                onClick={send}
                disabled={!input.trim() || isStreaming}
                className="send-btn w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 mb-0.5 border-none cursor-pointer transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
                style={{ background: brandGrad, boxShadow: "0 4px 14px rgba(96,51,148,0.35)" }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-2.5">
              We can make mistakes. Consider checking important info.
            </p>
          </div>

        </main>
      </div>
    </>
  );
}