import { create } from "zustand";
import { ChatState, Message } from "./types";

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentAgent: null,
  isLoading: false,
  error: null,

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      ],
    })),

  updateMessage: (id, content) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content } : msg
      ),
    })),

  setCurrentAgent: (delegation) =>
    set(() => ({ currentAgent: delegation })),

  setLoading: (loading) => set(() => ({ isLoading: loading })),

  setError: (error) => set(() => ({ error })),

  clearMessages: () =>
    set(() => ({
      messages: [],
      currentAgent: null,
      isLoading: false,
      error: null,
    })),
}));
