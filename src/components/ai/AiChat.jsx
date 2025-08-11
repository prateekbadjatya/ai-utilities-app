"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import useLocalStorage from "use-local-storage";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Copy, Loader2, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";

// https://www.npmjs.com/package/react-markdown
const AiChat = () => {
  const [messages, setMessages] = useLocalStorage("llm-chats", []);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const userMessage = { role: "user", content: input.trim() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");

      const response = await fetch("/api/generate/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || `Failed to get response! status: ${response.status}`
        );
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data.message]);

      console.log("data", data.message);
    } catch (error) {
      setError(error.message || "Failed to get response");
      console.log("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const renderMarkdownWithCode = (content) => {
    // https://www.npmjs.com/package/react-markdown
    return (
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          p({ node, children, ...props }) {
            return <div {...props}>{children}</div>;
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            if (!inline) {
              const codeContent = String(children).replace(/\n$/, "");

              return (
                <div className="relative my-4 rounded-lg overflow-hidden border border-gray-700 group">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(codeContent);
                    }}
                    className="absolute right-2 top-2 p-1.5 rounded bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600 cursor-pointer"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>

                  <SyntaxHighlighter
                    language={match?.[1] || "javascript"}
                    style={oneDark}
                    showLineNumbers={true}
                    lineNumberStyle={{
                      color: "#6b7280",
                      paddingRight: "1em",
                      textAlign: "right",
                      userSelect: "none",
                      minWidth: "2em",
                    }}
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      background: "#1f2937",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                    }}
                    codeTagProps={{
                      style: {
                        background: "transparent",
                        padding: 0,
                        margin: 0,
                      },
                    }}
                    lineProps={{
                      style: { display: "block", width: "100%" },
                    }}
                    wrapLines={true}
                    wrapLongLines={true}
                    {...props}
                  >
                    {codeContent}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code
                className={`${className} bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono`}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div className="flex flex-col h--screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4 shadow-sm">
        <h2 className="text-xl font-semibold">AI Chat Assistant</h2>
      </div>
      {/* ----------------------------------------------------- */}
      {/* chat messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Bot className="w-12 h-12 mb-4" />
              <p className="text-lg mb-2">
                Start a conversation with the AI assistant
              </p>
              <p>Ask anything or get help with coding!</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 pb-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                        <AvatarFallback className="bg-blue-500 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border"
                      }`}
                    >
                      {renderMarkdownWithCode(message.content)}
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                        <AvatarFallback className="bg-green-500 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {/* Loading */}
                {isLoading && (
                  <div className="flex justify-start gap-3">
                    <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                      <AvatarFallback className="bg-blue-500 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    {/* dot animation */}
                    <div className="bg-card border rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          AI is thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error state */}
                {error && (
                  <div className="flex justify-center">
                    <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-2xl max-w-[85%] border border-destructive/20">
                      <p className="text-sm">⚠️ {error}</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef}></div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
      {/* ----------------------------------------------------- */}
      {/* input Fields */}
      <div className="border-t bg-card/95 backdrop-blur-sm p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                name="text-area"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                style={{ wordBreak: "break-word" }}
                className="min-h-[48px] max-h-[200px] resize-none text-base rounded-2xl border-2 focus:border-primary transition-colors "
                maxLength={1000}
                rows={1}
              />
              {/* Chatacter Counter */}
              {input.length > 0 && (
                <div className="absolute -top-6 right-0 text-xs text-muted-foreground">
                  {input.length}/1000
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 rounded-2xl h-12 w-12 transition-all hover:scale-105 disabled:scale-100 flex-shrink-0"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send • Shift+Enter or Ctrl+Enter for new line
            </p>
            <p
              onClick={() => setMessages([])}
              className="font-semibold text-xs text-muted-foreground mt-2 text-center cursor-pointer hover:text-red-500 transition-colors"
            >
              Clear Chat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
