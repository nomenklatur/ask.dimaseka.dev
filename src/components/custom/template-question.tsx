import { Button } from "@/components/ui/button";

interface TemplateQuestionsProps {
  onSelectQuestion: (question: string) => void;
}

const TemplateQuestions = ({ onSelectQuestion }: TemplateQuestionsProps) => {
  const questions = [
    "What is artificial intelligence?",
    "How does machine learning work?",
    "What are neural networks?",
    "Explain deep learning in simple terms",
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {questions.map((question) => (
        <Button
          key={question}
          variant="outline"
          className="h-auto py-2 px-4 text-sm text-left whitespace-normal"
          onClick={() => onSelectQuestion(question)}
        >
          {question}
        </Button>
      ))}
    </div>
  );
};

export default TemplateQuestions;