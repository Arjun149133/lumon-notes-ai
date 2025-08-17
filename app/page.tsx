"use client";
import { useState } from "react";
import { TranscriptUploader } from "@/components/TranscriptUploader";
import { InstructionInput } from "@/components/InstructionInput";
import { SummaryEditor } from "@/components/SummaryEditor";
import { ShareModal } from "@/components/ShareModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FileText, Sparkles, Share } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const Home = () => {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [instruction, setInstruction] = useState("");
  const [summary, setSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleTranscriptLoad = (content: string, name: string) => {
    setTranscript(content);
    setFilename(name);
    setSummary(""); // Clear previous summary
  };

  const handleGenerate = async () => {
    if (!transcript || !instruction.trim()) return;

    setIsGenerating(true);
    try {
      const res = await axios.post("/api/generate-summary", {
        userText: transcript,
        userPrompt: instruction,
      });

      console.log("res", res.data);
      if (res.status === 200) {
        setSummary(res.data.ai);
      }
    } catch (error) {
      toast.error("Something went wrong!, Please try again Later");
    } finally {
      setIsGenerating(false);
    }
  };

  const currentStep = transcript ? (summary ? 3 : 2) : 1;
  const steps = [
    {
      number: 1,
      title: "Upload",
      icon: FileText,
      description: "Add your transcript",
    },
    {
      number: 2,
      title: "Instruct",
      icon: Sparkles,
      description: "Define summary style",
    },
    {
      number: 3,
      title: "Share",
      icon: Share,
      description: "Send to stakeholders",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Transcript Summarizer</h1>
                <p className="text-sm text-muted-foreground">
                  Transform meeting notes into actionable insights
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep >= step.number;
                  const isCurrent = currentStep === step.number;

                  return (
                    <div key={step.number} className="flex items-center gap-2">
                      <div
                        className={`flex items-center bg-sucess gap-2 px-3 py-1.5 rounded-full border transition-all ${
                          isCurrent
                            ? "border-primary bg-primary/10 text-primary"
                            : isActive
                            ? "border-success bg-success/10 text-success"
                            : "border-border bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium hidden sm:inline">
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`hidden sm:block w-8 h-px ${
                            currentStep > step.number
                              ? "bg-success"
                              : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <section>
            <TranscriptUploader
              onTranscriptLoad={handleTranscriptLoad}
              transcript={transcript}
              filename={filename}
            />
          </section>

          {/* Instructions Section */}
          <section>
            <InstructionInput
              instruction={instruction}
              onInstructionChange={setInstruction}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              disabled={!transcript}
            />
          </section>

          {/* Summary Section */}
          <section>
            <SummaryEditor
              summary={summary}
              onSummaryChange={setSummary}
              onShare={() => setIsShareModalOpen(true)}
              isGenerating={isGenerating}
            />
          </section>
        </div>
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        summary={summary}
      />
    </div>
  );
};

export default Home;
