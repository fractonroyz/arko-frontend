"use client";

import { useRef, useEffect } from "react";
import { useChatStore } from "@/lib/store";
import { Message } from "./Message";
import { AgentPill } from "./AgentPill";

export function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const currentAgent = useChatStore((state) => state.currentAgent);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="text-5xl mb-3">🤖</div>
            <h1 className="text-xl font-semibold text-neon-green mb-2">
              Arko Agency
            </h1>
            <p className="text-text-secondary text-sm max-w-md">
              Your AI team of specialists ready to tackle complex tasks.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {currentAgent && (
          <div className="flex justify-start mb-2">
            <AgentPill from={currentAgent.from} to={currentAgent.to} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
