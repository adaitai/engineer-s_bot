import React from "react";
import { Cpu } from "lucide-react";

const SUGGESTIONS = [
  "Explain the difference between REST and GraphQL",
  "How do I optimize a slow SQL query?",
  "Design a rate limiter for an API",
  "What is a memory leak and how do I find one?",
];

export default function WelcomeScreen({ onPick }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
        <Cpu className="w-8 h-8 text-primary-foreground" />
      </div>
      <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Engineering Assistant</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Ask about architecture, debugging, algorithms, best practices, or any technical challenge you're facing.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => onPick(s)}
            className="text-left text-sm text-foreground bg-card border border-border rounded-xl px-4 py-3 hover:border-primary hover:shadow-sm transition-all">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}