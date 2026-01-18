import { SSEData } from "./types";

const ARKO_API_URL = process.env.NEXT_PUBLIC_ARKO_API_URL || "http://localhost:8080";

export class ArkoAPIClient {
  private baseUrl: string;

  constructor(baseUrl: string = ARKO_API_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Send a message and stream the response using SSE
   */
  async streamMessage(
    message: string,
    onChunk: (text: string) => void,
    onAgent?: (from: string, to: string) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/my-agency-streaming`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable");
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data: SSEData = JSON.parse(line.slice(6));

              // Handle text delta
              if (
                data.event === "thread.message.delta" &&
                data.data.delta?.content?.[0]?.text?.value
              ) {
                onChunk(data.data.delta.content[0].text.value);
              }

              // Handle agent delegation (custom event if your API supports it)
              if (data.event === "agent.switch" && onAgent) {
                // Parse agent names from your API format
                // This is a placeholder - adjust based on your actual API response
                onAgent("Arko", "PLANNER");
              }
            } catch (e) {
              console.error("Failed to parse SSE data:", e);
            }
          }
        }
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      } else {
        throw error;
      }
    }
  }

  /**
   * Send a message without streaming (fallback)
   */
  async sendMessage(message: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/my-agency`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }
}

export const arkoAPI = new ArkoAPIClient();
