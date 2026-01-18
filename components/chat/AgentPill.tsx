"use client";

import { motion } from "framer-motion";

interface AgentPillProps {
  from: string;
  to: string;
}

export function AgentPill({ from, to }: AgentPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary border border-neon-dim rounded-full text-xs font-mono"
    >
      <span className="text-text-secondary">{from}</span>
      <svg
        className="w-3 h-3 text-neon-green"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
      <span className="text-neon-green font-semibold">{to}</span>
      <div className="ml-1 flex gap-0.5">
        <motion.div
          className="w-1 h-1 rounded-full bg-neon-green"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-1 h-1 rounded-full bg-neon-green"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-1 h-1 rounded-full bg-neon-green"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}
