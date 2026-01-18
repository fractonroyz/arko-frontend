"use client";

import { Message as MessageType } from "@/lib/types";
import { StreamingText } from "./StreamingText";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  if (message.role === "system") {
    return null;
  }

  return (
    <div className="animate-fade-in">
      {/* User message */}
      {isUser && (
        <div className="mb-8">
          <div className="text-sm text-text-tertiary mb-2 font-mono">Query</div>
          <div className="text-text-primary leading-relaxed">
            {message.content}
          </div>
        </div>
      )}

      {/* System response */}
      {!isUser && (
        <div className="mb-8">
          <div className="text-sm text-text-tertiary mb-2 font-mono">
            {message.agentName || "Response"}
          </div>
          <div className="text-text-primary leading-relaxed max-w-none prose-sm">
            {message.isStreaming ? (
              <StreamingText text={message.content} isComplete={false} />
            ) : (
              message.content
            )}
          </div>
        </div>
      )}
    </div>
  );
}
