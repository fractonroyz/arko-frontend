"use client";

import { useRef, useEffect } from "react";
import { useChatStore } from "@/lib/store";
import { Message } from "./Message";

export function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 py-8 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h1 className="text-3xl font-semibold text-text-primary mb-4">
              Where should we begin?
            </h1>
          </div>
        )}

        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
