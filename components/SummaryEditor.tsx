import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit3, Share, Sparkles, CheckCircle } from "lucide-react";

interface SummaryEditorProps {
  summary: string;
  onSummaryChange: (summary: string) => void;
  onShare: () => void;
  isGenerating: boolean;
}

export function SummaryEditor({
  summary,
  onSummaryChange,
  onShare,
  isGenerating,
}: SummaryEditorProps) {
  const [isEdited, setIsEdited] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = summary
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [summary]);

  const handleSummaryChange = (value: string) => {
    onSummaryChange(value);
    setIsEdited(true);
  };

  if (isGenerating) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border shadow-soft">
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Generating Summary</h3>
              <p className="text-muted-foreground">
                AI is analyzing your transcript and creating a structured
                summary...
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (!summary) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border shadow-soft opacity-50">
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg text-muted-foreground">
                Ready to Generate
              </h3>
              <p className="text-muted-foreground">
                Upload a transcript and add instructions to get started
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border shadow-soft">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <Label className="text-base font-medium">Generated Summary</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {wordCount} words
                </Badge>
                {isEdited && (
                  <Badge variant="outline" className="text-xs">
                    <Edit3 className="h-3 w-3 mr-1" />
                    Edited
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button onClick={onShare} variant="default" className="gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
        </div>

        <Textarea
          value={summary}
          onChange={(e) => handleSummaryChange(e.target.value)}
          className="min-h-[300px] resize-none font-mono text-sm leading-relaxed"
          placeholder="Your generated summary will appear here..."
        />

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Edit3 className="h-3 w-3" />
          <span>Click in the text area above to edit your summary</span>
        </div>
      </div>
    </Card>
  );
}
