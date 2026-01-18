"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { useChatStore } from "@/lib/store";
import { arkoAPI } from "@/lib/api";

export function InputBox() {
  const [input, setInput] = useState("");
  const { addMessage, updateMessage, setLoading, setError, isLoading } =
    useChatStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Add user message
    addMessage({
      role: "user",
      content: userMessage,
    });

    // Add placeholder for assistant response
    const assistantMessageId = crypto.randomUUID();
    addMessage({
      role: "assistant",
      content: "",
      agentName: "Arko",
      isStreaming: true,
    });

    setLoading(true);

    try {
      let accumulatedContent = "";

      await arkoAPI.streamMessage(
        userMessage,
        (chunk) => {
          accumulatedContent += chunk;
          updateMessage(assistantMessageId, accumulatedContent);
        },
        (from, to) => {
          // Handle agent delegation
          useChatStore.setState({
            currentAgent: { from, to, timestamp: Date.now() },
          });
        },
        (error) => {
          setError(error.message);
          updateMessage(
            assistantMessageId,
            `Error: ${error.message}. Please try again.`
          );
        }
      );

      // Mark streaming as complete
      const messages = useChatStore.getState().messages;
      const updatedMessages = messages.map((msg) =>
        msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg
      );
      useChatStore.setState({ messages: updatedMessages });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
      useChatStore.setState({ currentAgent: null });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t border-bg-tertiary px-4 py-3">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Arko..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-bg-secondary text-text-primary placeholder-text-tertiary rounded-lg px-4 py-2.5 pr-10 resize-none focus:outline-none focus:ring-1 focus:ring-neon-dim transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            style={{ minHeight: "44px", maxHeight: "200px" }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2.5 p-1.5 rounded-md bg-bg-tertiary hover:bg-neon-dim disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg
              className="w-4 h-4 text-neon-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
