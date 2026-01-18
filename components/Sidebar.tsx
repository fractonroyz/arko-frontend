"use client";

import { useChatStore } from "@/lib/store";

export function Sidebar() {
  const clearMessages = useChatStore((state) => state.clearMessages);

  return (
    <div className="w-64 bg-bg-secondary border-r border-bg-tertiary flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-bg-tertiary">
        <button
          onClick={clearMessages}
          className="w-full px-4 py-2 bg-bg-tertiary hover:bg-bg-primary rounded-lg text-sm text-text-primary border border-neon-dim hover:border-neon-green transition-all"
        >
          + New Chat
        </button>
      </div>

      {/* Chat history placeholder */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="text-xs text-text-tertiary text-center mt-4">
          Chat history coming soon
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-bg-tertiary">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neon-dim rounded-full flex items-center justify-center">
            <span className="text-bg-primary font-bold text-sm">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-neon-green truncate">Arko Agency</div>
            <div className="text-xs text-text-tertiary">v1.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
