import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, BookOpen, Users, ListChecks } from "lucide-react";

interface InstructionInputProps {
  instruction: string;
  onInstructionChange: (instruction: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

export function InstructionInput({
  instruction,
  onInstructionChange,
  onGenerate,
  isGenerating,
  disabled,
}: InstructionInputProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: "executive",
      icon: Users,
      title: "Executive Summary",
      description: "High-level overview for leadership",
      prompt:
        "Create an executive summary with key insights, strategic decisions, and high-level action items. Focus on business impact and strategic implications.",
    },
    {
      id: "detailed",
      icon: BookOpen,
      title: "Detailed Summary",
      description: "Comprehensive breakdown",
      prompt:
        "Provide a detailed summary organized by topics discussed, including context, decisions made, and follow-up items. Include participant insights and detailed action items.",
    },
    {
      id: "actionItems",
      icon: ListChecks,
      title: "Action Items",
      description: "Focus on tasks and next steps",
      prompt:
        "Extract and organize all action items, deadlines, and responsibilities. Format as a clear task list with owners and due dates where mentioned.",
    },
  ];

  const handleTemplateSelect = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template.id);
    onInstructionChange(template.prompt);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border shadow-soft">
      <div className="space-y-4">
        <div>
          <Label htmlFor="instruction" className="text-base font-medium">
            Summary Instructions
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Describe how you want the AI to summarize your transcript
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {templates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedTemplate === template.id;

            return (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1.5 rounded-md ${
                      isSelected ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isSelected ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{template.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {template.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Textarea
          id="instruction"
          placeholder="Enter custom instructions or select a template above..."
          value={instruction}
          onChange={(e) => onInstructionChange(e.target.value)}
          className="min-h-[100px] resize-none"
          disabled={disabled}
        />

        <Button
          onClick={onGenerate}
          disabled={disabled || !instruction.trim()}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
              Generating Summary...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Summary
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
