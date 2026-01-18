"use client";

import { MessageList } from "./MessageList";
import { InputBox } from "./InputBox";

export function ChatContainer() {
  return (
    <div className="flex h-screen bg-bg-primary">
      {/* Main Chat Area - Centered */}
      <div className="flex-1 flex flex-col items-center">
        {/* Chat Messages - Max width container */}
        <div className="w-full max-w-3xl flex-1 overflow-hidden">
          <MessageList />
        </div>

        {/* Input Box - Max width container */}
        <div className="w-full max-w-3xl">
          <InputBox />
        </div>
      </div>
    </div>
  );
}
