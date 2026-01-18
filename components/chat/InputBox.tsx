"use client";

import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from "react";
import { useChatStore } from "@/lib/store";
import { arkoAPI } from "@/lib/api";

export function InputBox() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, updateMessage, setLoading, setError, isLoading } =
    useChatStore();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

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
      agentName: "System",
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
        undefined,
        (error) => {
          console.error("[InputBox] Error:", error);
          setError(error.message);
          updateMessage(
            assistantMessageId,
            `Connection failed: ${error.message}`
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
      console.error("[InputBox] Catch error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
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
    <div className="px-6 py-4">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter query"
          disabled={isLoading}
          rows={1}
          className="w-full bg-bg-secondary text-text-primary placeholder-text-ghost 
                     border border-border-visible rounded-none
                     px-4 py-3 pr-12
                     resize-none
                     focus:border-accent-dim focus:bg-bg-tertiary
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200
                     font-sans text-base"
          style={{ 
            minHeight: "52px",
            maxHeight: "200px",
            overflow: "hidden"
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-3 bottom-6
                     px-2 py-1
                     text-text-tertiary hover:text-text-primary
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors duration-150
                     text-sm font-mono"
        >
          {isLoading ? "..." : "→"}
        </button>
      </form>
    </div>
  );
}
