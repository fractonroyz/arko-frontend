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
        undefined, // Agent delegation callback
        (error) => {
          console.error("Stream error:", error);
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
      console.error("Submit error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t border-bg-tertiary px-4 py-4">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            rows={1}
            disabled={isLoading}
            className="w-full bg-bg-secondary text-text-primary placeholder-text-tertiary rounded-3xl px-5 py-3 pr-12 resize-none focus:outline-none focus:ring-1 focus:ring-bg-tertiary transition-all disabled:opacity-50 text-[15px]"
            style={{ minHeight: "52px", maxHeight: "200px" }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2 rounded-full bg-neon-dim hover:bg-neon-green disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg
              className="w-4 h-4 text-bg-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
