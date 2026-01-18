"use client";

import { MessageList } from "./MessageList";
import { InputBox } from "./InputBox";

export function ChatContainer() {
  return (
    <div className="flex flex-col h-screen bg-bg-primary">
      {/* Main conversation - centered, no chrome */}
      <main className="flex-1 flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-[46rem] flex flex-col h-full">
          <MessageList />
        </div>
      </main>

      {/* Input - fixed bottom, centered */}
      <div className="flex justify-center border-t border-border-subtle">
        <div className="w-full max-w-[46rem]">
          <InputBox />
        </div>
      </div>
    </div>
  );
}
