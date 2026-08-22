"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  FileText,
  Link2,
  FileUp,
  CheckSquare,
  MessageSquare,
  Upload,
} from "lucide-react";

interface Section {
  id: string;
  title: string;
}

const mockSections: Section[] = [
  { id: "general", title: "General" },
  { id: "module-1", title: "Module 1: HTML5 Basics" },
  { id: "module-2", title: "Module 2: CSS3 Fundamentals" },
  { id: "module-3", title: "Module 3: Flexbox & Grid" },
  { id: "module-4", title: "Module 4: JavaScript Intro" },
];

const itemTypes = [
  { value: "resource", label: "Resource", icon: FileText, color: "text-slate-600" },
  { value: "url", label: "URL", icon: Link2, color: "text-teal-600" },
  { value: "assignment", label: "Assignment", icon: FileUp, color: "text-pink-600" },
  { value: "quiz", label: "Quiz", icon: CheckSquare, color: "text-blue-600" },
  { value: "forum", label: "Forum", icon: MessageSquare, color: "text-purple-600" },
] as const;

type ItemType = (typeof itemTypes)[number]["value"];

export default function NewItemPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [name, setName] = useState("");
  const [type, setType] = useState<ItemType>("resource");
  const [section, setSection] = useState(mockSections[0].id);
  const [typeOpen, setTypeOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(false);

  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [due, setDue] = useState("");
  const [points, setPoints] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  const selectedType = itemTypes.find((t) => t.value === type);
  const selectedSection = mockSections.find((s) => s.id === section);

  const handleSave = () => {
    router.push(`/teacher/course/${courseId}`);
  };

  const handleCancel = () => {
    router.push(`/teacher/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-4 px-4 sm:px-6">
          <Link href={`/teacher/course/${courseId}`} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold text-slate-900">Add New Item</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">Item Details</h2>

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter item name" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Section *</label>
              <div className="relative">
                <button type="button" onClick={() => setSectionOpen(!sectionOpen)} className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <span>{selectedSection?.title}</span>
                  <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${sectionOpen ? "rotate-90" : ""}`} />
                </button>
                {sectionOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSectionOpen(false)} />
                    <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white py-1 shadow-lg animate-slide-down">
                      {mockSections.map((s) => (
                        <button key={s.id} onClick={() => { setSection(s.id); setSectionOpen(false); }} className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors ${section === s.id ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"}`}>
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Type *</label>
              <div className="relative">
                <button type="button" onClick={() => setTypeOpen(!typeOpen)} className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <span className="flex items-center gap-2">
                    {selectedType && <selectedType.icon className={`h-4 w-4 ${selectedType.color}`} />}
                    {selectedType?.label}
                  </span>
                  <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${typeOpen ? "rotate-90" : ""}`} />
                </button>
                {typeOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setTypeOpen(false)} />
                    <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white py-1 shadow-lg animate-slide-down">
                      {itemTypes.map((t) => (
                        <button key={t.value} onClick={() => { setType(t.value); setTypeOpen(false); }} className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${type === t.value ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"}`}>
                          <t.icon className={`h-4 w-4 ${t.color}`} />
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {type === "resource" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Resource description" rows={3} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            )}

            {type === "url" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">URL</label>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            )}

            {type === "assignment" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
                  <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Assignment instructions" rows={3} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Attachment</label>
                  <div className="flex items-center gap-3 rounded-lg border-2 border-dashed border-slate-300 p-4 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/50">
                    <Upload className="h-5 w-5 text-slate-400" />
                    <span className="text-sm text-slate-500">Click to upload or drag and drop</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Due Date</label>
                    <input type="datetime-local" value={due} onChange={(e) => setDue(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Points</label>
                    <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} placeholder="100" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              </>
            )}

            {type === "quiz" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
                  <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Quiz instructions" rows={3} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Time Limit (minutes)</label>
                    <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} placeholder="30" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Points</label>
                    <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} placeholder="100" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              </>
            )}

            {type === "forum" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Forum topic or description" rows={3} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3 border-t border-slate-200 pt-6">
            <button onClick={handleSave} disabled={!name.trim()} className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">
              Add Item
            </button>
            <button onClick={handleCancel} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
