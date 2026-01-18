"use client";

import { Sidebar } from "../Sidebar";
import { MessageList } from "./MessageList";
import { InputBox } from "./InputBox";

export function ChatContainer() {
  return (
    <div className="flex h-screen bg-bg-primary">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden">
          <MessageList />
        </div>

        {/* Input Box */}
        <InputBox />
      </div>
    </div>
  );
}
