import React from "react";
import { Plus, MessageSquare, Trash2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConversationSidebar({ conversations, activeId, onSelect, onNew, onDelete }) {
  return (
    <div className="w-72 flex-shrink-0 bg-sidebar text-sidebar-foreground flex flex-col h-full">
      <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center">
          <Cpu className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <p className="font-semibold font-heading text-sidebar-foreground leading-tight">EngBot</p>
          <p className="text-xs text-sidebar-foreground/60">Engineering assistant</p>
        </div>
      </div>
      <div className="p-3">
        <Button onClick={onNew}
          className="w-full justify-start gap-2 bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground rounded-xl">
          <Plus className="w-4 h-4" /> New chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {conversations.map((c) => (
          <div key={c.id} onClick={() => onSelect(c.id)}
            className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
              activeId === c.id ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"
            }`}>
            <MessageSquare className="w-4 h-4 flex-shrink-0 text-sidebar-foreground/60" />
            <span className="flex-1 truncate text-sm">{c.title}</span>
            <button onClick={(e) => { e.stopPropagation(); onDelete(c.id); }}
              className="opacity-0 group-hover:opacity-100 text-sidebar-foreground/60 hover:text-red-400 transition-opacity">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {conversations.length === 0 && (
          <p className="text-xs text-sidebar-foreground/50 px-3 py-4 text-center">No conversations yet</p>
        )}
      </div>
    </div>
  );
}