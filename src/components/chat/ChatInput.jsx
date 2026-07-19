import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  return (
    <div className="flex items-end gap-3 bg-card border border-border rounded-2xl p-2 shadow-sm">
      <textarea value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}
        rows={1} placeholder="Ask an engineering question..."
        className="flex-1 resize-none bg-transparent px-3 py-2 text-[15px] outline-none max-h-40" />
      <Button onClick={submit} disabled={disabled || !value.trim()}
        className="rounded-xl bg-primary hover:bg-primary/90 h-10 w-10 p-0 flex-shrink-0">
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}