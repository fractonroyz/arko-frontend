export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  agentName?: string;
  isStreaming?: boolean;
}

export interface AgentDelegation {
  from: string;
  to: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  currentAgent: AgentDelegation | null;
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  updateMessage: (id: string, content: string) => void;
  setCurrentAgent: (delegation: AgentDelegation | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
}

export interface SSEData {
  event: string;
  data: {
    id?: string;
    delta?: {
      content?: Array<{
        type: string;
        text?: {
          value: string;
        };
      }>;
    };
    object?: string;
  };
}
