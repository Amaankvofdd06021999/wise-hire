"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, X, SendHorizontal, MessageSquarePlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScoreBadge } from "@/components/shared/score-badge";
import { mockCandidates, mockJobs } from "@/lib/mock-data";
import type { AriaMessage, AriaCard } from "@/lib/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function now() {
  return new Date().toISOString();
}

// ---------------------------------------------------------------------------
// Mock response engine
// ---------------------------------------------------------------------------

function getAriaResponse(input: string): { content: string; embeddedCards?: AriaCard[] } {
  const lower = input.toLowerCase();

  // Top candidates
  if (lower.includes("top candidate")) {
    const top3 = [...mockCandidates]
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 3);
    return {
      content: `Here are your top-scoring candidates right now. ${top3[0].name} leads with a score of ${top3[0].aiScore}.`,
      embeddedCards: top3.map((c) => ({
        type: "candidate",
        data: {
          name: c.name,
          score: c.aiScore,
          role: c.currentRole,
          stage: c.stage,
        },
      })),
    };
  }

  // Screen candidates
  if (lower.includes("screen")) {
    return {
      content: "I'll screen all pending candidates now. This will apply your configured screening weights and scoring rules.",
      embeddedCards: [
        {
          type: "action_confirm",
          data: {
            description: "Run AI screening on all pending applicants across active jobs?",
            confirmLabel: "Yes, screen now",
            cancelLabel: "Cancel",
          },
        },
      ],
    };
  }

  // Draft rejection / rejection email
  if (lower.includes("reject") || lower.includes("draft")) {
    return {
      content: `Here is a draft rejection email you can use:\n\n---\n\nSubject: Your application for [Role] at WiseHire\n\nHi [Candidate Name],\n\nThank you for taking the time to apply for the [Role] position at WiseHire. We carefully reviewed your application and, after consideration, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.\n\nWe were impressed by your background and encourage you to apply for future openings that match your skills.\n\nBest regards,\nThe WiseHire Team\n\n---\n\nWould you like me to personalise this or send it to a specific candidate?`,
    };
  }

  // Time to hire / TTH
  if (lower.includes("tth") || lower.includes("time to hire")) {
    return {
      content: "Your current average time to hire is trending well below benchmark.",
      embeddedCards: [
        {
          type: "stat",
          data: {
            label: "Avg. Time to Hire",
            value: "32 days",
            trend: "-8%",
          },
        },
      ],
    };
  }

  // Compare
  if (lower.includes("compare")) {
    return {
      content: "Opening comparison view for top candidates.",
      embeddedCards: [
        {
          type: "link",
          data: {
            description: "Compare top candidates side-by-side",
            url: "/candidates?compare=true",
          },
        },
      ],
    };
  }

  // Post / create job
  if (lower.includes("post") || lower.includes("create job")) {
    return {
      content: "I'll set up a new job posting for you.",
      embeddedCards: [
        {
          type: "link",
          data: {
            description: "Create a new job posting with AI-assisted JD writing",
            url: "/jobs/new",
          },
        },
      ],
    };
  }

  // Jobs open 30+ days
  if (lower.includes("open") && (lower.includes("30") || lower.includes("longer"))) {
    const longOpenJobs = mockJobs.filter((j) => j.daysOpen >= 30).slice(0, 2);
    const jobs = longOpenJobs.length > 0 ? longOpenJobs : mockJobs.slice(0, 2);
    return {
      content: `Found ${jobs.length} job${jobs.length !== 1 ? "s" : ""} that have been open for 30+ days. These may need attention.`,
      embeddedCards: jobs.map((j) => ({
        type: "candidate",
        data: {
          name: j.title,
          score: j.daysOpen,
          role: `${j.daysOpen} days open · ${j.applicantsCount} applicants`,
          stage: j.status,
        },
      })),
    };
  }

  // Default
  return {
    content:
      "I can help with screening candidates, showing top candidates, drafting emails, and more. Try asking me something specific!",
  };
}

// ---------------------------------------------------------------------------
// Embedded card renderers
// ---------------------------------------------------------------------------

function CandidateCard({ data }: { data: Record<string, unknown> }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border p-2.5 mt-2"
      style={{ borderColor: "var(--gray-200)", backgroundColor: "var(--gray-50)" }}
    >
      <div className="min-w-0">
        <p className="text-xs font-semibold truncate" style={{ color: "var(--gray-900)" }}>
          {String(data.name ?? "")}
        </p>
        <p className="text-xs truncate mt-0.5" style={{ color: "var(--gray-500)" }}>
          {String(data.role ?? "")}
        </p>
      </div>
      {typeof data.score === "number" && (
        <div className="ml-2 shrink-0">
          <ScoreBadge score={data.score} showLabel={false} size="sm" />
        </div>
      )}
    </div>
  );
}

function StatCard({ data }: { data: Record<string, unknown> }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border p-2.5 mt-2"
      style={{ borderColor: "var(--gray-200)", backgroundColor: "var(--gray-50)" }}
    >
      <p className="text-xs font-medium" style={{ color: "var(--gray-700)" }}>
        {String(data.label ?? "")}
      </p>
      <div className="flex items-center gap-2 ml-2">
        <span className="text-sm font-bold" style={{ color: "var(--gray-900)" }}>
          {String(data.value ?? "")}
        </span>
        {data.trend ? (
          <span
            className="text-xs font-medium"
            style={{ color: String(data.trend).startsWith("-") ? "var(--green-600, #16a34a)" : "var(--red-500, #ef4444)" }}
          >
            {String(data.trend)}
          </span>
        ) : null}
        {data.benchmark ? (
          <span className="text-xs" style={{ color: "var(--gray-400)" }}>
            bench: {String(data.benchmark)}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function LinkCard({ data }: { data: Record<string, unknown> }) {
  return (
    <a
      href={String(data.url ?? "#")}
      className="flex items-center justify-between rounded-lg border p-2.5 mt-2 hover:bg-[var(--brand-50)] transition-colors"
      style={{ borderColor: "var(--brand-200, #BFDBFE)" }}
    >
      <p className="text-xs font-medium" style={{ color: "var(--gray-700)" }}>
        {String(data.description ?? data.label ?? "")}
      </p>
      <span className="text-xs font-semibold ml-2 shrink-0" style={{ color: "var(--brand-600)" }}>
        Go →
      </span>
    </a>
  );
}

function ActionConfirmCard({
  data,
  onConfirm,
  onCancel,
  confirmed,
}: {
  data: Record<string, unknown>;
  onConfirm: () => void;
  onCancel: () => void;
  confirmed?: boolean;
}) {
  if (confirmed !== undefined) {
    return (
      <div
        className="rounded-lg border p-2.5 mt-2 text-xs"
        style={{ borderColor: "var(--gray-200)", color: "var(--gray-500)" }}
      >
        {confirmed ? "Action confirmed." : "Action cancelled."}
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border p-2.5 mt-2"
      style={{ borderColor: "var(--brand-200, #BFDBFE)", backgroundColor: "var(--brand-50)" }}
    >
      <p className="text-xs mb-2" style={{ color: "var(--gray-700)" }}>
        {String(data.description ?? "")}
      </p>
      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          className="rounded-md px-3 py-1 text-xs font-semibold text-white transition-colors"
          style={{ backgroundColor: "var(--brand-600)" }}
        >
          {String(data.confirmLabel ?? "Confirm")}
        </button>
        <button
          onClick={onCancel}
          className="rounded-md border px-3 py-1 text-xs font-medium transition-colors"
          style={{ borderColor: "var(--gray-300)", color: "var(--gray-600)" }}
        >
          {String(data.cancelLabel ?? "Cancel")}
        </button>
      </div>
    </div>
  );
}

function EmbeddedCard({
  card,
  onConfirm,
  onCancel,
  confirmed,
}: {
  card: AriaCard;
  onConfirm: () => void;
  onCancel: () => void;
  confirmed?: boolean;
}) {
  switch (card.type) {
    case "candidate":
      return <CandidateCard data={card.data} />;
    case "stat":
      return <StatCard data={card.data} />;
    case "link":
      return <LinkCard data={card.data} />;
    case "action_confirm":
      return (
        <ActionConfirmCard
          data={card.data}
          onConfirm={onConfirm}
          onCancel={onCancel}
          confirmed={confirmed}
        />
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Loading dots
// ---------------------------------------------------------------------------

function LoadingDots() {
  return (
    <div className="flex items-center gap-1 py-1 px-1" aria-label="ARIA is typing">
      <span
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: "var(--gray-400)",
          animation: "aria-dot-pulse 1.2s infinite ease-in-out",
          animationDelay: "0s",
        }}
      />
      <span
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: "var(--gray-400)",
          animation: "aria-dot-pulse 1.2s infinite ease-in-out",
          animationDelay: "0.2s",
        }}
      />
      <span
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: "var(--gray-400)",
          animation: "aria-dot-pulse 1.2s infinite ease-in-out",
          animationDelay: "0.4s",
        }}
      />
      <style>{`
        @keyframes aria-dot-pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.9); }
          40% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Suggested command chips
// ---------------------------------------------------------------------------

const SUGGESTED_COMMANDS = ["Screen candidates", "Show top candidates", "Draft rejection email"];

// ---------------------------------------------------------------------------
// Welcome message
// ---------------------------------------------------------------------------

const WELCOME_MESSAGE: AriaMessage = {
  id: "welcome",
  role: "aria",
  content: "Hi! I'm ARIA, your recruitment assistant. Ask me anything or give me a command.",
  timestamp: new Date().toISOString(),
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function AriaPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AriaMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Map from message id to confirmed state for action_confirm cards
  const [confirmStates, setConfirmStates] = useState<Record<string, boolean | undefined>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Escape closes, focus trap
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      // Focus trap: keep tab inside panel
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: AriaMessage = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setIsLoading(true);

      setTimeout(() => {
        const response = getAriaResponse(trimmed);
        const ariaMsg: AriaMessage = {
          id: generateId(),
          role: "aria",
          content: response.content,
          timestamp: now(),
          embeddedCards: response.embeddedCards,
        };
        setMessages((prev) => [...prev, ariaMsg]);
        setIsLoading(false);
      }, 1500);
    },
    [isLoading]
  );

  function handleSend() {
    sendMessage(inputValue);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  }

  function handleNewChat() {
    setMessages([WELCOME_MESSAGE]);
    setConfirmStates({});
    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function handleConfirm(messageId: string) {
    setConfirmStates((prev) => ({ ...prev, [messageId]: true }));
  }

  function handleCancel(messageId: string) {
    setConfirmStates((prev) => ({ ...prev, [messageId]: false }));
  }

  // Floating button positioning: above mobile nav on mobile
  const floatingBtnClass =
    "fixed z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bottom-20 right-4 md:bottom-6 md:right-6";

  // Panel classes — slide in from right on desktop, full screen on mobile
  const panelBaseClass =
    "fixed z-50 bg-white flex flex-col transition-transform duration-300 ease-in-out";
  const panelDesktopClass = "inset-0 md:inset-auto md:right-0 md:top-0 md:w-[400px] md:h-full md:border-l md:shadow-xl";

  return (
    <>
      {/* Floating button — hidden when panel is open to avoid overlap */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={floatingBtnClass}
          style={{
            backgroundColor: "var(--brand-600)",
            color: "white",
            boxShadow: "var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05))",
          }}
          aria-label="Open ARIA assistant"
        >
          <Sparkles size={24} />
        </button>
      )}

      {/* Overlay backdrop on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="ARIA Assistant"
        className={`${panelBaseClass} ${panelDesktopClass} ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          // On mobile the translate-x-full/0 handles slide; on desktop same
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b shrink-0"
          style={{ borderColor: "var(--gray-200)" }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={18} style={{ color: "var(--brand-600)" }} />
            <span className="text-lg font-semibold" style={{ color: "var(--gray-900)" }}>
              ARIA
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors hover:bg-gray-100"
              style={{ color: "var(--gray-600)" }}
              aria-label="New chat"
            >
              <MessageSquarePlus size={14} />
              New Chat
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1.5 transition-colors hover:bg-gray-100"
              style={{ color: "var(--gray-500)" }}
              aria-label="Close ARIA panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4 flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-xl p-3 text-sm ${
                    msg.role === "user"
                      ? "max-w-[80%]"
                      : "max-w-[85%]"
                  }`}
                  style={
                    msg.role === "user"
                      ? {
                          backgroundColor: "var(--brand-50)",
                          color: "var(--gray-900)",
                        }
                      : {
                          backgroundColor: "white",
                          border: "1px solid var(--gray-200)",
                          color: "var(--gray-800)",
                        }
                  }
                >
                  {/* Render message content — preserve newlines */}
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                  {/* Suggested chips — only on welcome message */}
                  {msg.id === "welcome" && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {SUGGESTED_COMMANDS.map((cmd) => (
                        <button
                          key={cmd}
                          onClick={() => sendMessage(cmd)}
                          className="rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-gray-50"
                          style={{
                            borderColor: "var(--gray-300)",
                            color: "var(--gray-600)",
                          }}
                        >
                          {cmd}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Embedded cards */}
                  {msg.embeddedCards && msg.embeddedCards.length > 0 && (
                    <div className="mt-1 flex flex-col gap-1">
                      {msg.embeddedCards.map((card, idx) => (
                        <EmbeddedCard
                          key={idx}
                          card={card}
                          onConfirm={() => handleConfirm(msg.id)}
                          onCancel={() => handleCancel(msg.id)}
                          confirmed={confirmStates[msg.id]}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="rounded-xl p-3"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid var(--gray-200)",
                  }}
                >
                  <LoadingDots />
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input area */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-t shrink-0"
          style={{ borderColor: "var(--gray-200)" }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask ARIA anything..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition-shadow"
            style={{
              borderColor: "var(--gray-300)",
              color: "var(--gray-900)",
              // @ts-expect-error CSS custom property
              "--tw-ring-color": "var(--brand-300)",
            }}
            disabled={isLoading}
            aria-label="Message ARIA"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="rounded-lg p-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "var(--brand-600)",
              color: "white",
            }}
            aria-label="Send message"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
