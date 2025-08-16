import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TranscriptUploaderProps {
  onTranscriptLoad: (content: string, filename: string) => void;
  transcript: string | null;
  filename: string | null;
}

export function TranscriptUploader({
  onTranscriptLoad,
  transcript,
  filename,
}: TranscriptUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileRead = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onTranscriptLoad(content, file.name);
      };
      reader.readAsText(file);
    },
    [onTranscriptLoad]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const textFile = files.find(
        (file) => file.type === "text/plain" || file.name.endsWith(".txt")
      );

      if (textFile) {
        handleFileRead(textFile);
      }
    },
    [handleFileRead]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileRead(file);
      }
    },
    [handleFileRead]
  );

  const clearTranscript = () => {
    onTranscriptLoad("", "");
  };

  if (transcript) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <FileText className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-medium">Transcript Loaded</h3>
              <p className="text-sm text-muted-foreground">{filename}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearTranscript}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-32 overflow-y-auto rounded-md bg-muted/50 p-3">
          <p className="text-sm text-muted-foreground">
            {transcript.substring(0, 200)}
            {transcript.length > 200 && "..."}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "relative border-2 border-dashed transition-all duration-300",
        isDragOver
          ? "border-primary bg-primary/5 shadow-glow"
          : "border-border hover:border-primary/50 bg-gradient-to-br from-card to-muted/20"
      )}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
    >
      <div className="p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Upload
            className={cn(
              "h-8 w-8",
              isDragOver ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        <h3 className="mb-2 text-lg font-semibold">Upload Transcript</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Drag and drop your text file here, or click to browse
        </p>
        <div className="space-y-2">
          <Button variant="default" className="relative">
            <input
              type="file"
              accept=".txt,text/plain"
              onChange={handleFileInput}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            Choose File
          </Button>
          <p className="text-xs text-muted-foreground">Supports .txt files</p>
        </div>
      </div>
    </Card>
  );
}
