"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Scale,
  FileText,
  Copy,
  Check,
  Share2,
  PhoneCall,
  RefreshCcw,
  ArrowRight,
  Shield,
  HelpCircle,
  Home,
  Briefcase,
  ShieldAlert,
  ShoppingBag,
  UserX,
  AlertTriangle,
  CreditCard,
  Building,
} from "lucide-react";
import { PAKISTANI_LAW_CATEGORIES, LawCategory } from "@/lib/laws-db";
import type { NoticeInitialData } from "./ComplaintLetterModal";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  category?: string;
  categoryTitle?: string;
  categoryUrdu?: string;
  lawsCited?: string[];
  authority?: string;
  helpline?: string;
  portalUrl?: string;
  canGenerateLetter?: boolean;
}

interface ChatInterfaceProps {
  onOpenDraftNotice: (data?: NoticeInitialData) => void;
  onOpenHelplines: () => void;
}

const EXAMPLE_CHIPS = [
  {
    icon: Home,
    category: "tenant-deposit",
    label: "Landlord won't return my security deposit (PKR 60,000)",
    urdu: "مکان مالک سیکیورٹی ڈپازٹ واپس نہیں کر رہا",
  },
  {
    icon: Briefcase,
    category: "unpaid-salary",
    label: "Boss hasn't paid my salary in 2 months and delaying",
    urdu: "کمپنی نے 2 ماہ سے تنخواہ نہیں دی",
  },
  {
    icon: ShieldAlert,
    category: "cybercrime-harassment",
    label: "Someone is blackmailing me with private photos online",
    urdu: "واٹس ایپ پر بلیک میلنگ اور دھمکیاں",
  },
  {
    icon: ShoppingBag,
    category: "consumer-fraud",
    label: "Got a fake/damaged product on Daraz, seller won't refund",
    urdu: "آن لائن فراڈ اور خراب پراڈکٹ کی واپسی",
  },
  {
    icon: UserX,
    category: "wrongful-termination",
    label: "My employer fired me with no notice and no reason given",
    urdu: "بغیر نوٹس نوکری سے اچانک برطرفی",
  },
  {
    icon: AlertTriangle,
    category: "traffic-challan",
    label: "Warden gave unfair traffic challan for green signal",
    urdu: "غلط ٹریفک چالان کا قانونی ازالہ",
  },
  {
    icon: Building,
    category: "freelance-contract",
    label: "Client took freelance work and ghosted PKR 120,000 payment",
    urdu: "فری لانسنگ کلائنٹ نے ادائیگی روک لی",
  },
  {
    icon: CreditCard,
    category: "bank-wallet-fraud",
    label: "Unauthorized deduction from Easypaisa/Bank account",
    urdu: "بینک یا ایزی پیسہ اکاؤنٹ سے رقم غائب",
  },
];

let messageCounter = 0;
const getNextMessageId = (prefix: string) => {
  messageCounter += 1;
  return `${prefix}-${messageCounter}-${Math.random().toString(36).slice(2, 7)}`;
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onOpenDraftNotice,
  onOpenHelplines,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string, categoryHint?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMessageId = getNextMessageId("user");
    const userTimestamp = "Just now";
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: "user",
      text: query.trim(),
      timestamp: userTimestamp,
    };
    const newMessages: ChatMessage[] = [...messages, userMsg];

    setMessages(newMessages);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query.trim(),
          history: newMessages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
          categoryId: categoryHint,
        }),
      });

      const data = await response.json();

      const aiMessageId = getNextMessageId("ai");
      const aiTimestamp = "Just now";
      const aiMsg: ChatMessage = {
        id: aiMessageId,
        sender: "ai",
        text: data.text || "Aap ka poora haq hai. Under Pakistani law you have full protection.",
        timestamp: aiTimestamp,
        category: data.category,
        categoryTitle: data.categoryTitle,
        categoryUrdu: data.categoryUrdu,
        lawsCited: data.lawsCited,
        authority: data.authority,
        helpline: data.helpline,
        portalUrl: data.portalUrl,
        canGenerateLetter: data.canGenerateLetter ?? true,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat API error:", error);
      const fallbackId = getNextMessageId("ai-err");
      const fallbackTimestamp = "Just now";
      const fallbackMsg: ChatMessage = {
        id: fallbackId,
        sender: "ai",
        text: `**Aap ka poora qanooni haq hai:** Pakistani statutes provide direct remedies for this dispute.

### 📜 Qanooni Rehnnumai:
* **Applicable Law:** Punjab Rented Premises Act 2009 / Payment of Wages Act 1936 / PECA 2016 / Consumer Protection Act
* **Competent Authority:** District Rent Tribunal / Labor Court / FIA Cybercrime Wing / Consumer Court

### ⚡ Recommended Next Steps:
1. **Gather Evidence:** Keep all WhatsApp receipts, agreements, and bank records.
2. **Issue Statutory Notice:** Send a formal 7 to 14 days legal notice.
3. **Approach Forum:** File formal petition if the party refuses to settle.

Aap neeche diye gaye **"Generate Complaint Letter / Legal Notice"** button se ready-to-use notice tayyar kar sakte hain.`,
        timestamp: fallbackTimestamp,
        canGenerateLetter: true,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppShare = (msg: ChatMessage) => {
    const textToShare = `*Mera Haq — Pakistani Legal Rights Advice:*\n\n${msg.text}\n\n_Know your rights instantly at Mera Haq._`;
    const encoded = encodeURIComponent(textToShare);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="relative flex flex-col w-full h-full flex-1 px-4 py-5 sm:px-8 max-w-4xl mx-auto">
      {/* Hero Welcome Box when no messages */}
      {messages.length === 0 && (
        <div className="my-auto py-6 sm:py-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
            <span>Pakistan&apos;s 100% Free AI Legal Literacy Platform</span>
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Apna Haq Jaanein.
            </h1>
            <p className="font-serif italic text-lg sm:text-xl font-medium text-teal-800">
              مفت، فوری، اور بغیر کسی وکیل کے — اپنا قانونی حق جانیے
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1 max-w-xl mx-auto">
              Ask in plain <strong>Roman Urdu</strong> or <strong>English</strong> about landlord disputes, unpaid salary, cyber harassment, online shopping fraud, or unfair dismissal. Get exact law citations and generate ready-to-send legal notices instantly.
            </p>
          </div>

          {/* 8 Clickable example question chips */}
          <div className="pt-3 text-left max-w-3xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-3 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-teal-700" />
              Tap an everyday scenario to see your rights:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EXAMPLE_CHIPS.map((chip, idx) => {
                const IconComponent = chip.icon;
                return (
                  <button
                    key={idx}
                    id={`example-chip-${idx}`}
                    onClick={() => handleSendMessage(chip.label, chip.category)}
                    className="group flex items-start gap-3 rounded-xl border border-slate-200/90 bg-white/90 p-3 text-left shadow-2xs transition hover:border-teal-400 hover:bg-teal-50/40 hover:shadow-xs"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 group-hover:bg-teal-950 group-hover:text-teal-300 transition">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-teal-950 transition">
                        {chip.label}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 group-hover:text-teal-800 mt-0.5">
                        {chip.urdu}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Message List */}
      {messages.length > 0 && (
        <div className="flex-1 space-y-6 pb-6 pt-2">
          {/* Top Reset Button */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-200/80">
            <span className="text-xs font-medium text-slate-500">
              Mera Haq Legal Session • {messages.length} messages
            </span>
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-teal-900 transition hover:underline"
            >
              <RefreshCcw className="h-3 w-3" />
              <span>Start New Query</span>
            </button>
          </div>

          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-950 text-teal-300 shadow-sm mt-1">
                    <Scale className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`flex flex-col max-w-[92%] sm:max-w-[85%] ${
                    isUser ? "items-end" : "items-start"
                  }`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-2xs ${
                      isUser
                        ? "bg-teal-700 text-white rounded-tr-none"
                        : "bg-[#fcfcf9] sm:bg-white border border-slate-200/90 text-slate-900 rounded-tl-none"
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <div className="space-y-3">
                        {/* Category & Authority Badge Header if available */}
                        {msg.categoryTitle && (
                          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-900 border border-teal-200">
                              ⚖️ {msg.categoryTitle}
                            </span>
                            {msg.authority && (
                              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                Forum: {msg.authority}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Markdown Text Body */}
                        <div className="prose prose-sm prose-slate max-w-none space-y-2 whitespace-pre-wrap text-slate-800 font-sans">
                          {msg.text}
                        </div>

                        {/* Official Helpline pill if available */}
                        {msg.helpline && (
                          <div className="rounded-xl bg-amber-50/90 border border-amber-200 p-3 flex items-center justify-between text-xs text-amber-950">
                            <div className="flex items-center gap-2">
                              <PhoneCall className="h-4 w-4 text-amber-700 shrink-0" />
                              <span>
                                <strong>Official Helpline: </strong>
                                {msg.helpline}
                              </span>
                            </div>
                            <button
                              onClick={onOpenHelplines}
                              className="font-bold text-amber-800 underline hover:text-amber-950 text-[11px]"
                            >
                              View All Helplines
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* AI Action Toolbar directly under response */}
                  {!isUser && (
                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                      {msg.canGenerateLetter && (
                        <button
                          id={`btn-generate-notice-${msg.id}`}
                          onClick={() =>
                            onOpenDraftNotice({
                              category: msg.category || "tenant-deposit",
                              facts: `Citizen rights query: ${
                                messages.find((m) => m.sender === "user")?.text ||
                                ""
                              }`,
                            })
                          }
                          className="bg-teal-950 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2.5 shadow-md hover:bg-black uppercase tracking-widest text-[11px] transition"
                        >
                          <FileText className="h-3.5 w-3.5 text-teal-300" />
                          <span>Generate Complaint Letter (PDF)</span>
                          <ArrowRight className="h-3 w-3 text-teal-300" />
                        </button>
                      )}

                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition shadow-2xs"
                        title="Copy Rights Answer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-slate-500" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleWhatsAppShare(msg)}
                        className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition shadow-2xs"
                        title="Share advice on WhatsApp"
                      >
                        <Share2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white text-xs font-bold mt-1">
                    You
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-950 text-teal-300 shadow-sm mt-1">
                <Scale className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-white border border-slate-200 px-5 py-4 text-xs text-slate-600 shadow-2xs flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-teal-700 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-teal-700 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-teal-700 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="font-medium text-slate-700">
                  Consulting Pakistani statutes, tribunals &amp; rights...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Bottom Sticky Input Form with Editorial Pill Aesthetic */}
      <div className="sticky bottom-0 z-20 pt-2 pb-3 bg-gradient-to-t from-[#fdfdfb] via-[#fdfdfb] to-transparent">
        {/* Chips row above input when in chat mode */}
        {messages.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {EXAMPLE_CHIPS.slice(0, 4).map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.label, chip.category)}
                className="shrink-0 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-xs font-semibold text-slate-600 hover:border-teal-400 hover:bg-teal-50/60 hover:text-teal-900 transition whitespace-nowrap shadow-2xs"
              >
                {chip.label.length > 35
                  ? `${chip.label.substring(0, 35)}...`
                  : chip.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative flex items-center gap-2 rounded-full border border-slate-300/90 bg-white px-4 py-2 shadow-sm focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700/20">
          <textarea
            ref={inputRef}
            rows={1}
            id="chat-input-textarea"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your legal rights in Roman Urdu or English..."
            className="flex-1 max-h-32 resize-none bg-transparent px-2 py-1.5 text-xs sm:text-sm text-slate-900 placeholder:italic placeholder:text-slate-400 focus:outline-none font-medium"
          />

          <button
            id="send-chat-button"
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isLoading}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-800 text-white shadow-xs transition hover:bg-teal-950 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Send Question"
          >
            <Send className="h-4 w-4 text-teal-200" />
          </button>
        </div>

        <div className="mt-1.5 flex items-center justify-between px-2 text-[11px] text-slate-500">
          <span>💡 Press Enter to send, Shift+Enter for new line</span>
          <span className="hidden sm:inline">
            Roman Urdu + English supported (e.g. &quot;Makaan malik deposit wapis nahi de raha&quot;)
          </span>
        </div>
      </div>
    </div>
  );
};
