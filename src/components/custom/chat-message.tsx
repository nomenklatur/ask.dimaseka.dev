import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isAI: boolean;
}

const ChatMessage = ({ message, isAI }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isAI ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isAI
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;