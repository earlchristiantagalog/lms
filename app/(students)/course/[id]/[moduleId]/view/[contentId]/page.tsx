"use client";

import Link from "next/link";
import { use, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Menu,
  X,
  MoreVertical,
} from "lucide-react";

interface ContentItem {
  id: string;
  name: string;
  type: "resource" | "url" | "assignment" | "quiz" | "forum";
  opened?: string;
  due?: string;
  content: { title: string; html: string };
}

interface Section {
  id: string;
  title: string;
  items: ContentItem[];
}

interface Course {
  id: string;
  code: string;
  title: string;
  semester: string;
  sections: Section[];
}

const mockCourses: Course[] = [
  {
    id: "1",
    code: "72107",
    title: "WEB DESIGN & DEVELOPMENT",
    semester: "AY 2026-2027 First Semester",
    sections: [
      { id: "general", title: "General", items: [
        { id: "announcements", name: "Announcements", type: "forum", content: { title: "Announcements", html: "<p>No announcements yet.</p>" } },
        { id: "syllabus", name: "Course Syllabus", type: "resource", content: { title: "Course Syllabus", html: "<p>Download the syllabus PDF.</p>" } },
        { id: "attendance", name: "Attendance", type: "url", content: { title: "Attendance", html: "<p>Click the link to mark your attendance.</p>" } },
      ]},
      { id: "module-1", title: "Module 1: HTML5 Basics", items: [
        { id: "lecture-html5", name: "Lecture Notes - HTML5 Introduction", type: "resource", content: {
          title: "Lecture Notes - HTML5 Introduction",
          html: "<h2>What is HTML5?</h2><p>HTML5 is the latest major revision of the HTML standard, introducing a wide range of new elements, attributes, and behaviors.</p><h3>Key Features</h3><ul><li>Semantic elements: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code></li><li>Native audio and video with <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code></li><li>Canvas for 2D/3D graphics: <code>&lt;canvas&gt;</code></li><li>Web Storage: <code>localStorage</code> and <code>sessionStorage</code></li><li>Improved form controls: date pickers, sliders, etc.</li></ul><h3>Basic HTML5 Document Structure</h3><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"en\"&gt;\n&lt;head&gt;\n  &lt;meta charset=\"UTF-8\"&gt;\n  &lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;\n  &lt;title&gt;My Page&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;header&gt;\n    &lt;h1&gt;Welcome&lt;/h1&gt;\n  &lt;/header&gt;\n  &lt;main&gt;\n    &lt;p&gt;Hello, World!&lt;/p&gt;\n  &lt;/main&gt;\n&lt;/body&gt;\n&lt;/html&gt;</code></pre><p>HTML5 is designed to be backward-compatible with older browsers while offering new capabilities for modern web applications.</p>"
        }},
        { id: "lab-1", name: "Lab Exercise 1 - Basic HTML Page", type: "assignment", opened: "Monday, 3 August 2026, 10:30 AM", due: "Friday, 14 August 2026, 11:59 PM", content: { title: "Lab Exercise 1", html: "<p>Follow the instructions in the attached PDF.</p>" } },
        { id: "quiz-1", name: "Quiz 1 - HTML Fundamentals", type: "quiz", opened: "Monday, 10 August 2026, 10:30 AM", due: "Friday, 14 August 2026, 11:59 PM", content: { title: "Quiz 1", html: "<p>Answer all questions.</p>" } },
      ]},
      { id: "module-2", title: "Module 2: CSS3 Fundamentals", items: [
        { id: "lecture-css3", name: "Lecture Notes - CSS3 Basics", type: "resource", content: {
          title: "Lecture Notes - CSS3 Basics",
          html: "<h2>Introduction to CSS3</h2><p>CSS3 extends CSS2 with new selectors, pseudo-classes, and properties.</p><h3>Selectors</h3><pre><code>/* Class selector */\n.card { border: 1px solid #ccc; }\n\n/* ID selector */\n#hero { background: url('hero.jpg'); }\n\n/* Attribute selector */\ninput[type=\"email\"] { border-color: blue; }</code></pre><h3>Flexbox Layout</h3><pre><code>.container {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.item {\n  flex: 1;\n}</code></pre>"
        }},
        { id: "lab-2", name: "Lab Exercise 2 - Styling a Webpage", type: "assignment", opened: "Monday, 17 August 2026, 10:30 AM", due: "Friday, 28 August 2026, 11:59 PM", content: { title: "Lab Exercise 2", html: "<p>Style the provided HTML page using CSS3.</p>" } },
        { id: "assignment-1", name: "Assignment 1 - Portfolio Page", type: "assignment", opened: "Monday, 17 August 2026, 10:30 AM", due: "Friday, 28 August 2026, 11:59 PM", content: { title: "Assignment 1", html: "<p>Build a portfolio page.</p>" } },
      ]},
      { id: "module-3", title: "Module 3: Flexbox & Grid", items: [
        { id: "lecture-flexbox", name: "Lecture Notes - Flexbox & Grid", type: "resource", content: { title: "Flexbox & Grid Notes", html: "<p>Learn about Flexbox and CSS Grid.</p>" } },
        { id: "lab-3", name: "Lab Exercise 3 - Layout Challenge", type: "assignment", opened: "Monday, 31 August 2026, 10:30 AM", due: "Friday, 11 September 2026, 11:59 PM", content: { title: "Lab Exercise 3", html: "<p>Complete the layout challenge.</p>" } },
      ]},
      { id: "module-4", title: "Module 4: JavaScript Intro", items: [
        { id: "lecture-js", name: "Lecture Notes - JavaScript Basics", type: "resource", content: { title: "JavaScript Basics", html: "<p>Introduction to JavaScript.</p>" } },
        { id: "lab-4", name: "Lab Exercise 4 - Interactive Page", type: "assignment", opened: "Monday, 14 September 2026, 10:30 AM", due: "Friday, 25 September 2026, 11:59 PM", content: { title: "Lab Exercise 4", html: "<p>Create an interactive page.</p>" } },
        { id: "quiz-2", name: "Quiz 2 - JavaScript Fundamentals", type: "quiz", opened: "Monday, 21 September 2026, 10:30 AM", due: "Friday, 25 September 2026, 11:59 PM", content: { title: "Quiz 2", html: "<p>Answer all questions.</p>" } },
      ]},
    ],
  },
];

export default function ContentViewPage({ params }: { params: Promise<{ id: string; moduleId: string; contentId: string }> }) {
  const { id, moduleId, contentId } = use(params);
  const course = mockCourses.find((c) => c.id === id);
  const section = course?.sections.find((s) => s.id === moduleId);
  const item = section?.items.find((i) => i.id === contentId);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerExpanded, setDrawerExpanded] = useState<Set<number>>(() => {
    const idx = course?.sections.findIndex((s) => s.id === moduleId) ?? -1;
    return idx >= 0 ? new Set([idx]) : new Set();
  });

  const toggleDrawerSection = (index: number) => {
    setDrawerExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  if (!course || !section || !item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <h1 className="mt-3 text-lg font-semibold text-slate-900">Content not found</h1>
          <p className="mt-1 text-sm text-slate-500">The content you&apos;re looking for doesn&apos;t exist.</p>
          <Link href={`/course/${id ?? ""}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:px-6">
          <Link
            href={`/course/${id}/${moduleId}`}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold text-slate-900">
              {course.code}-{course.title}
            </h1>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Open modules"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Modules drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-full flex-col bg-white shadow-xl animate-slide-in-left">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-md border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-50 cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 cursor-pointer"
                aria-label="More options"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {course.sections.map((sec, i) => {
                const isOpen = drawerExpanded.has(i);
                const isCurrent = sec.id === moduleId;
                return (
                  <div key={i} className="border-b border-slate-100">
                    <button
                      onClick={() => toggleDrawerSection(i)}
                      className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium hover:bg-slate-50 cursor-pointer ${
                        isCurrent ? "text-blue-600 bg-blue-50/50" : "text-slate-700"
                      }`}
                    >
                      <ChevronRight className={`h-4 w-4 shrink-0 text-slate-400 chevron-rotate ${isOpen ? "open" : ""}`} />
                      {sec.title}
                    </button>
                    {isOpen && (
                      <div className="pb-2 pl-10 pr-4 animate-slide-down">
                        {sec.items.map((it, j) => (
                          <Link
                            key={j}
                            href={`/course/${id}/${sec.id}/view/${it.id}`}
                            onClick={() => setDrawerOpen(false)}
                            className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors duration-150 hover:bg-slate-50 ${
                              it.id === contentId ? "text-blue-600 font-medium" : "text-slate-600"
                            }`}
                          >
                            <span className="flex-1">{it.name}</span>
                            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Breadcrumb */}
        <p className="text-sm text-blue-600">
          <Link href={`/course/${id}`} className="hover:underline">
            {course.code}-{course.title}
          </Link>{" "}
          <span className="text-slate-400">/</span>{" "}
          <Link href={`/course/${id}/${moduleId}`} className="hover:underline">
            {section.title}
          </Link>{" "}
          <span className="text-slate-400">/</span>{" "}
          <span className="text-slate-700">{item.name}</span>
        </p>

        {/* Content title */}
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          {item.content.title}
        </h1>

        {/* Content body */}
        <div
          className="mt-6 max-w-none text-sm leading-relaxed text-slate-900 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h3]:mt-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-900 [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_pre]:mt-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-slate-100 [&_pre_code]:bg-transparent [&_pre_code]:p-0"
          dangerouslySetInnerHTML={{ __html: item.content.html }}
        />
      </main>
    </div>
  );
}
