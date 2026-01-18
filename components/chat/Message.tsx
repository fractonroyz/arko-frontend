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
    return null; // Hide system messages for cleaner UI
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      {/* User message - right aligned, neon green */}
      {isUser && (
        <div className="flex justify-end">
          <div className="bg-neon-dim text-bg-primary rounded-2xl px-4 py-3 max-w-[80%]">
            {message.content}
          </div>
        </div>
      )}

      {/* Assistant message - left aligned, dark bg */}
      {!isUser && (
        <div className="flex justify-start">
          <div className="space-y-1 max-w-[85%]">
            {message.agentName && (
              <div className="text-xs text-text-tertiary font-medium pl-1">
                {message.agentName}
              </div>
            )}
            <div className="bg-bg-secondary text-text-primary rounded-2xl px-4 py-3">
              {message.isStreaming ? (
                <StreamingText text={message.content} isComplete={false} />
              ) : (
                message.content
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
