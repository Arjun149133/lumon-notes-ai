# 📝 AI-Powered Transcript Summarizer

This project is a web application that enables users to upload text-based transcripts (e.g., meeting notes, call transcripts), input custom prompts (e.g., "Summarize in bullet points for executives", "Extract only action items"), and receive an AI-generated, editable summary. Users can then share this summary directly via Gmail with just a few clicks.

---

## 🔗 Deployed Version

👉 [Live Demo on Vercel](https://your-project-name.vercel.app)  
_(Replace the URL above with your actual Vercel deployment)_

---

## 🚀 Features

- **Transcript Upload**  
  Upload `.txt` files containing transcripts or notes.

- **Custom Instructions**  
  Users can input their own prompt to guide the summary generation (e.g., tone, format, key focus).

- **AI-Powered Summarization**  
  Uses **GROQ LLM** to generate structured, context-aware summaries tailored to user prompts.

- **Editable Output**  
  Summaries are fully editable in the frontend before sharing.

- **Email Integration**  
  Users can send the final summary via Gmail by pre-filling the email using the Gmail compose link.

---

## 🧠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **AI/LLM**: [GROQ](https://groq.com/)
- **Email Sharing**: Gmail prefill link via `window.open`
- **Deployment**: [Vercel](https://vercel.com/)
- **Package Manager**: npm or bun

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

#### Using **npm**/**yarn** or similar:

```bash
npm install
```

#### Using **bun**:

```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add any required environment variables such as your GROQ API key:

```env
GROQ_API_KEY=your_groq_api_key
```

### 4. Run the Development Server

#### Using **npm**/**yarn** or similar:

```bash
npm run dev
```

#### Using **bun**:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

---

## ⚙️ How It Works

1. **Upload Transcript**  
   Users upload a plain text transcript via the UI.

2. **Input Prompt**  
   A custom prompt is entered to specify how the summary should be generated.

3. **Generate Summary**  
   The app sends a request to the `/api/generate-summary` route with:

   - The raw transcript
   - The user’s custom prompt
   - Additional system prompt to instruct the LLM

4. **LLM Processing (GROQ)**  
   The backend enriches the prompt and calls GROQ to generate the summary.

5. **Display & Edit**  
   The structured summary is displayed on the frontend. Users can edit the output inline.

6. **Share via Gmail**  
   After editing, users can share the summary by opening a prefilled Gmail compose window:

   ```ts
   const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subjectEncoded}&body=${bodyEncoded}`;
   window.open(gmailLink, "_blank");
   ```

---

## 📬 Email Sharing Flow

- **To**: One or multiple recipients
- **Subject**: Prefilled with a generic or user-defined title
- **Body**: Prefilled with the final edited summary

This uses Gmail’s URL schema to open a pre-filled draft email.

---

## 🛠 API Route (`/api/generate-summary`)

- Receives:

  ```json
  {
    "transcript": "<raw-text>",
    "userPrompt": "<custom-instruction>"
  }
  ```

- Constructs a combined prompt:

  - Includes a system prompt that sets the tone/structure
  - Appends user transcript and prompt

- Calls GROQ LLM and sends the response back to the frontend.

---

## 📁 Project Structure (Simplified)

```
/pages
  /api
    generate-summary.js   // Handles summary generation via GROQ
/components
  UploadInput.js
  PromptInput.js
  SummaryEditor.js
  EmailButton.js
```

---

## 💡 Use Cases

- Executive summaries of meeting transcripts
- Extracting action items from calls
- Preparing client-ready briefs
- Collaborative editing and sharing of notes

---

## ✅ Future Improvements

- Support for PDF or DOCX upload
- User authentication and summary history
- Gmail API integration for direct sending (instead of link-based)
- Summary versioning or export as PDF

---

## 🧑‍💻 Author

Made with ❤️ using Next.js and GROQ as part of a recruiter assignment project.
