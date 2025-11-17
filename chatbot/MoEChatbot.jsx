import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import { Bot, User, Send, Loader, Sparkles } from "lucide-react";

// Helper component to render markdown content safely
const MarkdownRenderer = ({ content, className }) => {
  if (!content) return null;
  const html = marked(content, { gfm: true, breaks: true });
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

// Header Component
const ChatHeader = () => (
  <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
    <div className="px-6 py-4">
      <div className="flex items-center justify-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            MoE Summarizer <span className="text-blue-600"></span>
          </h1>
        </div>
      </div>
    </div>
  </header>
);

// User Message Component
const UserMessage = ({ message }) => {
  return (
    <div className="px-6 py-4 animate-fadeIn">
      <div className="max-w-5xl mx-auto flex justify-end">
        <div className="flex items-end gap-3 max-w-3xl">
          <div className="bg-neutral-900 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-md">
            <MarkdownRenderer
              content={message.text}
              className="prose prose-invert max-w-none text-base"
            />
          </div>
          <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Bot Message Component
const BotMessage = ({ message }) => {
  return (
    <div className="bg-neutral-50 px-6 py-6 animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-neutral-700" />
          </div>
          <div className="flex-1 min-w-0">
            <MarkdownRenderer
              content={message.text}
              className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Message Component
const LoadingMessage = () => (
  <div className="px-6 py-6 animate-fadeIn">
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-neutral-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
            </div>
            <span className="text-sm text-neutral-600">Thinking...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Welcome Card Component
const WelcomeCard = () => (
  <div className="max-w-5xl mx-auto px-6 py-8">
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-neutral-900 rounded-lg flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-neutral-800 tracking-tight">
              Welcome
            </h2>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-neutral-700 leading-relaxed">
            Paste or type any text (English, Hindi or Punjabi) and click
            "Summarize" to get a summary powered by the Mixture of Experts
            model.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Main Text Summarizer Component
const MoEChatbot = () => {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      setSummary("");
      try {
        // TODO: Replace with your actual summarization API endpoint
        const response = await fetch("/api/moe/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input }),
        });
        if (!response.ok) {
          throw new Error("Failed to get summary from MoE model");
        }
        const data = await response.json();
        setSummary(data.summary || "Sorry, I couldn't generate a summary.");
      } catch (error) {
        setSummary(
          `**Error:** ${error.message}\n\nPlease make sure your MoE API endpoint is configured correctly.`
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSummarize();
    }
  };

  const summarizeButtonClasses =
    "bg-[linear-gradient(135deg,#171717_0%,#262626_50%,#171717_100%)] shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all ease-in-out duration-200 hover:not(:disabled):bg-[linear-gradient(135deg,#262626_0%,#404040_50%,#262626_100%)] hover:not(:disabled):shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] hover:not(:disabled):-translate-y-px disabled:bg-neutral-300 disabled:shadow-none";

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto">
        <WelcomeCard />
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">
              Enter text to summarize:
            </h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Paste or type your text here..."
              className="w-full px-5 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none text-base bg-white transition-all duration-200 placeholder-neutral-400 shadow-sm mb-4"
              disabled={isLoading}
              rows={6}
              style={{ minHeight: "120px", maxHeight: "300px" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 300) + "px";
              }}
            />
            <button
              onClick={handleSummarize}
              disabled={isLoading || !input.trim()}
              className={`${summarizeButtonClasses} text-white rounded-xl disabled:cursor-not-allowed flex items-center justify-center w-32 h-11 transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none mt-2`}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Summarize"
              )}
            </button>
            {summary && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                  Summary:
                </h3>
                <MarkdownRenderer
                  content={summary}
                  className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed text-base"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoEChatbot;
