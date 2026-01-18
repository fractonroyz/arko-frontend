"use client";

import { motion } from "framer-motion";
import { Message as MessageType } from "@/lib/types";
import { StreamingText } from "./StreamingText";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center py-2"
      >
        <div className="px-3 py-1 bg-bg-tertiary border border-text-tertiary rounded-lg text-xs text-text-secondary">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm ${
          isUser
            ? "bg-neon-dim text-bg-primary"
            : "bg-bg-secondary text-text-primary"
        }`}
      >
        {!isUser && message.agentName && (
          <div className="text-xs text-neon-green font-mono mb-1 font-semibold">
            {message.agentName}
          </div>
        )}
        <div className="leading-relaxed">
          {message.isStreaming ? (
            <StreamingText text={message.content} isComplete={false} />
          ) : (
            message.content
          )}
        </div>
      </div>
    </motion.div>
  );
}
