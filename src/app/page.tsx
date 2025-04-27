"use client";
import { useState } from "react";
import ChatInput from "@/components/custom/chat-input";
import ChatMessage from "@/components/custom/chat-message";
import TemplateQuestions from "@/components/custom/template-question";

interface Message {
  text: string;
  isAI: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isAI: false }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      // Add AI response
      setMessages((prev) => [...prev, { text: data.message, isAI: true }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I encountered an error. Please try again.", isAI: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <h1 className="text-2xl font-bold mb-4">Welcome to AI Chat</h1>
            <p className="mb-4">Start a conversation or try one of the template questions below.</p>
            <TemplateQuestions onSelectQuestion={handleSendMessage} />
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isAI={message.isAI}
            />
          ))
        )}
        {isLoading && (
          <div className="text-center text-muted-foreground">
            AI is thinking...
          </div>
        )}
      </div>
      <div className="sticky bottom-0 bg-background pt-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Chat;