"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY  = "we_chats";
const MAX_CHATS    = 20;   // max number of conversations kept
const MAX_MESSAGES = 20;   // max messages per conversation

/* ── trim messages to last N ── */
const trimMessages = (messages) =>
  messages.length > MAX_MESSAGES
    ? messages.slice(-MAX_MESSAGES)
    : messages;

/* ── trim chats to last N ── */
const trimChats = (chats) =>
  chats.length > MAX_CHATS
    ? chats.slice(0, MAX_CHATS)   // newest first — keep first N
    : chats;

/* ── safe JSON save — if storage full, drop oldest chat and retry ── */
const safeSave = (chats) => {
  let toSave = [...chats];
  while (toSave.length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      return;
    } catch {
      // QuotaExceededError — drop oldest chat and retry
      toSave = toSave.slice(0, toSave.length - 1);
    }
  }
};

export function useChatHistory() {
  const [chats, setChats] = useState([]);

  /* ── load on mount ── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChats(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  /* ── persist on every change ── */
  useEffect(() => {
    if (chats.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    safeSave(chats);
  }, [chats]);

  /* ── add new chat ── */
const addChat = (id, title) => {
  setChats((prev) => {
    // لو الـ id موجود بالفعل — متضيفش تاني
    if (prev.find((c) => c.id === id)) return prev;
    const entry = { id, title, time: "Just now", messages: [] };
    return trimChats([entry, ...prev]);
  });
};

  /* ── update messages — trims to MAX_MESSAGES automatically ── */
  const updateChat = (id, messages) => {
    const trimmed = trimMessages(messages);
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages: trimmed } : c))
    );
  };

  /* ── delete one chat ── */
  const deleteChat = (id) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
  };

  /* ── clear everything ── */
  const clearAll = () => {
    setChats([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { chats, setChats, addChat, updateChat, deleteChat, clearAll };
}