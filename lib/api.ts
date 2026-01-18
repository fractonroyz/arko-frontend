import { SSEData } from "./types";

const ARKO_API_URL = process.env.NEXT_PUBLIC_ARKO_API_URL || "http://localhost:8080";
const ARKO_API_INTEGRATION_ID = process.env.NEXT_PUBLIC_ARKO_API_INTEGRATION_ID || "";

export class ArkoAPIClient {
  private baseUrl: string;
  private apiIntegrationId: string;

  constructor(baseUrl: string = ARKO_API_URL, apiIntegrationId: string = ARKO_API_INTEGRATION_ID) {
    this.baseUrl = baseUrl;
    this.apiIntegrationId = apiIntegrationId;
  }

  /**
   * Send a message using agencii.ai API integration
   */
  async streamMessage(
    message: string,
    onChunk: (text: string) => void,
    onAgent?: (from: string, to: string) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    console.log(`[API] Connecting to: ${this.baseUrl}/get_completion`);
    
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const payload: any = {
        message,
      };

      // Add apiIntegrationId if available
      if (this.apiIntegrationId) {
        payload.apiIntegrationId = this.apiIntegrationId;
      }

      console.log("[API] Payload:", payload);

      const response = await fetch(`${this.baseUrl}/get_completion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      console.log(`[API] Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[API] Error response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("[API] Response data:", data);

      // agencii.ai returns { completion: "..." }
      if (data.completion) {
        onChunk(data.completion);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("Unexpected API response format");
      }

    } catch (error) {
      console.error("[API] Error:", error);
      
      if (error instanceof Error && error.name === "AbortError") {
        const timeoutError = new Error("Request timed out after 60 seconds");
        if (onError) onError(timeoutError);
        else throw timeoutError;
        return;
      }

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
    console.log(`[API] Non-streaming request to: ${this.baseUrl}/get_completion`);
    
    const payload: any = {
      message,
    };

    if (this.apiIntegrationId) {
      payload.apiIntegrationId = this.apiIntegrationId;
    }

    const response = await fetch(`${this.baseUrl}/get_completion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("[API] Response:", data);
    return data.completion || data.response || "";
  }
}

export const arkoAPI = new ArkoAPIClient();
