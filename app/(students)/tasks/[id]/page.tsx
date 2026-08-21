"use client";

import { useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Paperclip,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  Download,
  Trash2,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
type TaskStatus = "pending" | "submitted" | "overdue" | "graded";
interface Task {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: TaskStatus;
  grade: string | null;
  description: string;
  attachedFiles: { name: string; size: string; type: string }[];
}

// ─── Mock Data ──────────────────────────────────────────────────────────────
const mockTasks: Task[] = [
  {
    id: "1",
    title: "React Quiz 2",
    course: "Advanced React Patterns",
    dueDate: "Aug 21, 2026 11:59 PM",
    status: "pending",
    grade: null,
    description:
      "Answer all 15 questions covering React hooks, context API, performance optimization patterns, and component composition. You have 60 minutes once started. Each question is worth equal marks. Partial credit is awarded for multi-part questions.",
    attachedFiles: [{ name: "quiz-guidelines.pdf", size: "245 KB", type: "PDF" }],
  },
  {
    id: "2",
    title: "Binary Tree Implementation",
    course: "Data Structures & Algorithms",
    dueDate: "Aug 22, 2026 11:59 PM",
    status: "pending",
    grade: null,
    description:
      "Implement a fully functional binary search tree in your preferred language. Your implementation must support: insertion, deletion, in-order traversal, pre-order traversal, post-order traversal, and height calculation. Include unit tests for each operation.",
    attachedFiles: [
      { name: "bst-specification.pdf", size: "512 KB", type: "PDF" },
      { name: "starter-code.zip", size: "12 KB", type: "ZIP" },
    ],
  },
  {
    id: "3",
    title: "Design System Proposal",
    course: "UI/UX Design Principles",
    dueDate: "Aug 24, 2026 11:59 PM",
    status: "submitted",
    grade: null,
    description:
      "Create a comprehensive mini design system for a fictional SaaS product. Include color tokens (primary, neutral, semantic), typography scale with at least 4 levels, spacing system, and 3 reusable component variants (button, input, card).",
    attachedFiles: [{ name: "design-template.fig", size: "2.1 MB", type: "Figma" }],
  },
  {
    id: "4",
    title: "ML Model Evaluation",
    course: "Machine Learning Fundamentals",
    dueDate: "Aug 20, 2026 11:59 PM",
    status: "overdue",
    grade: null,
    description:
      "Train a classification model on the provided dataset. Submit a report containing: accuracy score, precision, recall, F1-score, confusion matrix visualization, and a brief analysis of model performance with suggestions for improvement.",
    attachedFiles: [
      { name: "dataset.csv", size: "4.8 MB", type: "CSV" },
      { name: "evaluation-rubric.pdf", size: "320 KB", type: "PDF" },
    ],
  },
  {
    id: "5",
    title: "API Design Exercise",
    course: "Advanced React Patterns",
    dueDate: "Aug 16, 2026 11:59 PM",
    status: "graded",
    grade: "95/100",
    description:
      "Design and document a RESTful API for an e-commerce platform. Include endpoint specifications, request/response schemas, authentication strategy, and rate limiting approach. Submit as a Swagger/OpenAPI specification file.",
    attachedFiles: [{ name: "api-rubric.pdf", size: "180 KB", type: "PDF" }],
  },
  {
    id: "6",
    title: "Sorting Algorithm Comparison",
    course: "Data Structures & Algorithms",
    dueDate: "Aug 12, 2026 11:59 PM",
    status: "graded",
    grade: "88/100",
    description:
      "Implement and benchmark at least 4 sorting algorithms (quicksort, mergesort, heapsort, and one non-comparison sort). Create a report comparing their time and space complexity with empirical results from your benchmarks.",
    attachedFiles: [],
  },
];

// ─── Config ─────────────────────────────────────────────────────────────────
const statusConfig: Record<TaskStatus, { label: string; bg: string; text: string; icon: typeof CheckCircle2 }> = {
  pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", icon: Clock },
  submitted: { label: "Submitted", bg: "bg-blue-50", text: "text-blue-700", icon: Send },
  overdue: { label: "Overdue", bg: "bg-red-50", text: "text-red-600", icon: AlertCircle },
  graded: { label: "Graded", bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle2 },
};


// ─── Page ───────────────────────────────────────────────────────────────────
export default function TaskDetailPage() {
  const params = useParams();
  const taskId = params.id as string;
  const task = mockTasks.find((t) => t.id === taskId);

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-slate-300" />
          <h1 className="mt-3 text-lg font-semibold text-slate-900">Task not found</h1>
          <p className="mt-1 text-sm text-slate-500">
            The task you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[task.status];

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-4 px-4 sm:px-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold text-slate-900">
              {task.title}
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}
          >
            <status.icon className="h-3 w-3" />
            {status.label}
          </span>
          {task.grade && (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              {task.grade}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
            {task.course}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
            <Calendar className="h-4 w-4 text-slate-400" />
            Due: {task.dueDate}
          </span>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Instructions
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {task.description}
          </p>
        </div>

        {task.attachedFiles.length > 0 && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Resources
            </h2>
            <div className="mt-3 space-y-2">
              {task.attachedFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 transition-colors duration-200 hover:bg-slate-100"
                >
                  <Paperclip className="h-4 w-4 shrink-0 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {file.type} · {file.size}
                    </p>
                  </div>
                  <button
                    className="rounded p-1 text-slate-400 transition-colors duration-200 hover:text-slate-600"
                    aria-label={`Download ${file.name}`}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {task.status !== "graded" && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Your Submission
            </h2>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 transition-all duration-200 ${
                isDragging
                  ? "border-slate-900 bg-slate-100"
                  : "border-zinc-300 bg-zinc-50/50 hover:border-zinc-400 hover:bg-zinc-50"
              }`}
            >
              <UploadCloud className="h-8 w-8 text-slate-400" />
              <p className="mt-2 text-sm font-medium text-slate-600">
                Drop files here or click to upload
              </p>
              <p className="mt-1 text-xs text-slate-400">
                PDF, DOCX, ZIP, or image files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload files"
              />
            </div>

            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2"
                  >
                    <Paperclip className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span className="min-w-0 flex-1 truncate text-sm text-slate-700">
                      {file.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {(file.size / 1024).toFixed(0)} KB
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      className="rounded p-0.5 text-slate-400 transition-colors duration-200 hover:text-red-500"
                      aria-label={`Remove ${file.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]">
              <Send className="h-4 w-4" />
              Submit Assignment
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
