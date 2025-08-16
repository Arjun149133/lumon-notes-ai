import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Mail, Plus, X, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string;
}

export function ShareModal({ isOpen, onClose, summary }: ShareModalProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [subject, setSubject] = useState("Meeting Summary");
  const [message, setMessage] = useState(
    "Please find the meeting summary below:"
  );
  const [isSending, setIsSending] = useState(false);

  const addEmail = () => {
    const email = currentEmail.trim();
    if (email && isValidEmail(email) && !emails.includes(email)) {
      setEmails([...emails, email]);
      setCurrentEmail("");
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail();
    }
  };

  const handleSend = async () => {
    if (emails.length === 0) {
      toast.error("No recipients, Please add atleast one email address");
      return;
    }

    setIsSending(true);

    try {
      const to = encodeURIComponent(emails.join(",")); // comma-separated
      const subjectEncoded = encodeURIComponent(subject);
      const bodyEncoded = encodeURIComponent(`${message}\n\n${summary}`);

      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subjectEncoded}&body=${bodyEncoded}`;

      window.open(gmailLink, "_blank");

      toast.success(
        `Summary sent to ${emails.length} recipient${
          emails.length > 1 ? "s" : ""
        }`
      );
    } catch (error) {
      console.log("eror opening");
    }

    setIsSending(false);
    onClose();

    // Reset form
    setEmails([]);
    setCurrentEmail("");
    setSubject("Meeting Summary");
    setMessage("Please find the meeting summary below:");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Share Summary via Email
          </DialogTitle>
          <DialogDescription>
            Send the generated summary to team members and stakeholders
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipients */}
          <div className="space-y-3">
            <Label htmlFor="email">Recipients</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={addEmail}
                disabled={
                  !currentEmail.trim() || !isValidEmail(currentEmail.trim())
                }
                variant="outline"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {emails.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {emails.map((email) => (
                  <Badge key={email} variant="secondary" className="gap-1">
                    {email}
                    <button
                      onClick={() => removeEmail(email)}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message"
              className="min-h-[80px]"
            />
          </div>

          {/* Summary Preview */}
          <div className="space-y-2">
            <Label>Summary Preview</Label>
            <div className="max-h-48 overflow-y-auto rounded-md bg-muted/50 p-4">
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                {summary}
              </pre>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isSending}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={isSending || emails.length === 0}
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Summary
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
