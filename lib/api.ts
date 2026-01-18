import { SSEData } from "./types";

const ARKO_API_URL = process.env.NEXT_PUBLIC_ARKO_API_URL || "http://localhost:8080";
const ARKO_API_INTEGRATION_ID = process.env.NEXT_PUBLIC_ARKO_API_INTEGRATION_ID || "";
const ARKO_API_KEY = process.env.NEXT_PUBLIC_ARKO_API_KEY || "";

export class ArkoAPIClient {
  private baseUrl: string;
  private apiIntegrationId: string;
  private apiKey: string;

  constructor(
    baseUrl: string = ARKO_API_URL, 
    apiIntegrationId: string = ARKO_API_INTEGRATION_ID,
    apiKey: string = ARKO_API_KEY
  ) {
    this.baseUrl = baseUrl;
    this.apiIntegrationId = apiIntegrationId;
    this.apiKey = apiKey;
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
      const timeout = setTimeout(() => controller.abort(), 60000);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Use API key for authorization
      if (this.apiKey) {
        headers["Authorization"] = `Bearer ${this.apiKey}`;
      }

      const payload = {
        message,
        apiIntegrationId: this.apiIntegrationId,
      };

      console.log("[API] Sending request...");

      const response = await fetch(`${this.baseUrl}/get_completion`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      console.log(`[API] Status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[API] Error:", errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || `Request failed (${response.status})`);
        } catch {
          throw new Error(`Request failed (${response.status}): ${errorText}`);
        }
      }

      const data = await response.json();
      console.log("[API] Success");

      if (data.completion) {
        onChunk(data.completion);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("Invalid response format");
      }

    } catch (error) {
      console.error("[API] Error:", error);
      
      if (error instanceof Error && error.name === "AbortError") {
        const timeoutError = new Error("Request timeout");
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
}

export const arkoAPI = new ArkoAPIClient();
