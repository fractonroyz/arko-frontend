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
      {!isComplete && <span className="animate-typing text-neon-green"></span>}
    </span>
  );
}
