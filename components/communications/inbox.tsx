"use client";

import { useState } from "react";
import { toast } from "sonner";
import { mockThreads } from "@/lib/mock-data";
import type { Thread, Message } from "@/lib/types";
import { StageBadge } from "@/components/shared/stage-badge";
import { AiContentZone } from "@/components/shared/ai-content-zone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Send, Star } from "lucide-react";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  const parts = name.split(" ");
  return (
    (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")
  ).toUpperCase();
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: "short" });
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
}

type FilterTab = "all" | "unread" | "starred";

const AI_DRAFT_TEMPLATES = [
  "Thank you for your message. I'll get back to you shortly with more details about the next steps in our hiring process.",
  "We appreciate your patience. Based on your application, I'd like to schedule a brief call to discuss the role further. Would you be available this week?",
  "Following up on our last conversation — we're excited about your candidacy and are finalizing the next steps. We'll be in touch very soon.",
];

export function Inbox() {
  const [threads, setThreads] = useState<Thread[]>(mockThreads);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [composeValue, setComposeValue] = useState("");
  const [aiDraftVisible, setAiDraftVisible] = useState(false);
  const [aiDraftText, setAiDraftText] = useState("");

  const filteredThreads = threads.filter((t) => {
    if (activeFilter === "unread") return t.unread;
    if (activeFilter === "starred") return t.starred;
    return true;
  });

  const selectedThread = threads.find((t) => t.id === selectedThreadId) ?? null;

  function handleSelectThread(id: string) {
    setSelectedThreadId(id);
    setComposeValue("");
    setAiDraftVisible(false);
    setAiDraftText("");
    // Mark as read
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: false } : t))
    );
  }

  function handleBack() {
    setSelectedThreadId(null);
    setComposeValue("");
    setAiDraftVisible(false);
    setAiDraftText("");
  }

  function handleAiDraft() {
    const draft =
      AI_DRAFT_TEMPLATES[Math.floor(Math.random() * AI_DRAFT_TEMPLATES.length)];
    setAiDraftText(draft);
    setAiDraftVisible(true);
    setComposeValue(draft);
  }

  function handleSend() {
    if (!selectedThread || !composeValue.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      direction: "sent",
      content: composeValue.trim(),
      sentAt: new Date().toISOString(),
      isAiDraft: aiDraftVisible,
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedThread.id
          ? {
              ...t,
              messages: [...t.messages, newMessage],
              lastMessage: newMessage.content,
              lastMessageAt: newMessage.sentAt,
            }
          : t
      )
    );

    setComposeValue("");
    setAiDraftVisible(false);
    setAiDraftText("");
    toast.success("Message sent");
  }

  const showList = !selectedThreadId;
  const showThread = !!selectedThreadId;

  return (
    <div className="flex h-[calc(100vh-140px)] border border-[var(--gray-200)] rounded-xl overflow-hidden bg-white" style={{ boxShadow: "var(--shadow-sm)" }}>
      {/* Left Panel — Thread List */}
      <div
        className={cn(
          "flex flex-col border-r border-[var(--gray-200)] w-full md:w-80 md:flex shrink-0",
          showThread ? "hidden md:flex" : "flex"
        )}
      >
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 px-4 py-3 border-b border-[var(--gray-200)]">
          {(["all", "unread", "starred"] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
                activeFilter === tab
                  ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                  : "text-[var(--gray-500)] hover:text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Thread List */}
        <ScrollArea className="flex-1">
          <div className="divide-y divide-[var(--gray-100)]">
            {filteredThreads.length === 0 ? (
              <div className="p-6 text-center text-sm text-[var(--gray-500)]">
                No conversations found
              </div>
            ) : (
              filteredThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => handleSelectThread(thread.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 flex items-start gap-3 transition-colors hover:bg-[var(--gray-50)]",
                    selectedThreadId === thread.id && "bg-[var(--brand-50)]"
                  )}
                >
                  {/* Avatar */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "var(--brand-100)",
                      color: "var(--brand-700)",
                    }}
                  >
                    {getInitials(thread.candidateName)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-medium text-sm text-[var(--gray-900)] truncate">
                        {thread.candidateName}
                      </span>
                      <span className="text-xs text-[var(--gray-400)] shrink-0">
                        {formatTime(thread.lastMessageAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[var(--gray-500)] truncate flex-1">
                        {thread.lastMessage}
                      </p>
                      <div className="flex items-center gap-1 shrink-0">
                        {thread.starred && (
                          <Star
                            size={10}
                            className="fill-[var(--warning-400)] text-[var(--warning-400)]"
                          />
                        )}
                        {thread.unread && (
                          <span className="h-2 w-2 rounded-full bg-[var(--brand-500)]" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel — Thread View */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0",
          showList ? "hidden md:flex" : "flex"
        )}
      >
        {!selectedThread ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--gray-100)" }}
              >
                <Send size={20} style={{ color: "var(--gray-400)" }} />
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--gray-600)" }}>
                Select a conversation
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--gray-400)" }}>
                Choose a thread from the left to read messages
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Thread Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--gray-200)] bg-white">
              <button
                className="md:hidden p-1.5 rounded-md hover:bg-[var(--gray-100)] text-[var(--gray-500)] transition-colors"
                onClick={handleBack}
                aria-label="Back to inbox"
              >
                <ArrowLeft size={18} />
              </button>
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "var(--brand-100)",
                  color: "var(--brand-700)",
                }}
              >
                {getInitials(selectedThread.candidateName)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-[var(--gray-900)]">
                    {selectedThread.candidateName}
                  </span>
                  <span className="text-xs text-[var(--gray-500)]">
                    {selectedThread.role}
                  </span>
                  <StageBadge stage={selectedThread.stage} />
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="flex flex-col gap-3">
                {selectedThread.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.direction === "sent" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-lg p-3",
                        msg.direction === "sent"
                          ? "text-[var(--brand-900)]"
                          : "bg-white border border-[var(--gray-200)] text-[var(--gray-800)]"
                      )}
                      style={
                        msg.direction === "sent"
                          ? { backgroundColor: "var(--brand-50)" }
                          : undefined
                      }
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                      <p className="text-xs mt-1.5" style={{ color: "var(--gray-400)" }}>
                        {formatTime(msg.sentAt)}
                        {msg.isAiDraft && (
                          <span className="ml-1.5 inline-flex items-center gap-0.5">
                            <Sparkles size={10} />
                            AI
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Compose Area */}
            <div className="border-t border-[var(--gray-200)] p-4 bg-white">
              {aiDraftVisible && (
                <AiContentZone className="mb-3 p-3 rounded-md text-xs text-[var(--gray-600)]">
                  <div className="flex items-center gap-1.5 mb-1.5 font-medium text-[var(--brand-700)]">
                    <Sparkles size={12} />
                    AI Draft
                  </div>
                  <p className="text-xs text-[var(--gray-600)] leading-relaxed">
                    {aiDraftText}
                  </p>
                </AiContentZone>
              )}
              <Textarea
                value={composeValue}
                onChange={(e) => {
                  setComposeValue(e.target.value);
                  if (aiDraftVisible && e.target.value !== aiDraftText) {
                    setAiDraftVisible(false);
                  }
                }}
                placeholder="Write a message..."
                className="resize-none mb-3 text-sm"
                rows={3}
              />
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAiDraft}
                  className="gap-1.5 text-xs"
                  style={{ color: "var(--brand-600)", borderColor: "var(--brand-200)" }}
                >
                  <Sparkles size={13} />
                  AI Draft
                </Button>
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={!composeValue.trim()}
                  className="gap-1.5 text-xs"
                  style={{
                    backgroundColor: "var(--brand-600)",
                    color: "white",
                  }}
                >
                  <Send size={13} />
                  Send
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
