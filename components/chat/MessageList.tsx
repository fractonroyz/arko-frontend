"use client";

import { useRef, useEffect } from "react";
import { useChatStore } from "@/lib/store";
import { Message } from "./Message";

export function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6">
      <div className="py-section space-y-8">
        {messages.length === 0 && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center max-w-md">
              <h1 className="text-xl text-text-primary font-medium mb-2">
                Ready
              </h1>
              <p className="text-sm text-text-tertiary">
                Intelligence workspace active
              </p>
            </div>
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
