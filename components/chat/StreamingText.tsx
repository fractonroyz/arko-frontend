"use client";

import { useEffect, useState } from "react";

interface StreamingTextProps {
  text: string;
  isComplete?: boolean;
}

export function StreamingText({ text, isComplete = false }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(text);
  }, [text]);

  return (
    <span className="whitespace-pre-wrap">
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-text-secondary ml-[2px] animate-pulse" />
      )}
    </span>
  );
}
