"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  MoreVertical,
  MessageSquare,
  Link2,
  FileUp,
  FileText,
  CheckSquare,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface SectionItem {
  id: string;
  name: string;
  type: "resource" | "url" | "assignment" | "quiz" | "forum";
  opened?: string;
  due?: string;
}

interface Section {
  id: string;
  title: string;
  items: SectionItem[];
}

interface Course {
  id: string;
  code: string;
  title: string;
  semester: string;
  sections: Section[];
}

// ─── Mock Data ──────────────────────────────────────────────────────────────
const mockCourses: Course[] = [
  {
    id: "1",
    code: "72107",
    title: "WEB DESIGN & DEVELOPMENT",
    semester: "AY 2026-2027 First Semester",
    sections: [
      {
        id: "general",
        title: "General",
        items: [
          { id: "announcements", name: "Announcements", type: "forum" },
          { id: "syllabus", name: "Course Syllabus", type: "resource" },
          { id: "attendance", name: "Attendance", type: "url" },
        ],
      },
      {
        id: "module-1",
        title: "Module 1: HTML5 Basics",
        items: [
          { id: "lecture-html5", name: "Lecture Notes - HTML5 Introduction", type: "resource" },
          { id: "lab-1", name: "Lab Exercise 1 - Basic HTML Page", type: "assignment", opened: "Monday, 3 August 2026, 10:30 AM", due: "Friday, 14 August 2026, 11:59 PM" },
          { id: "quiz-1", name: "Quiz 1 - HTML Fundamentals", type: "quiz", opened: "Monday, 10 August 2026, 10:30 AM", due: "Friday, 14 August 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-2",
        title: "Module 2: CSS3 Fundamentals",
        items: [
          { id: "lecture-css3", name: "Lecture Notes - CSS3 Basics", type: "resource" },
          { id: "lab-2", name: "Lab Exercise 2 - Styling a Webpage", type: "assignment", opened: "Monday, 17 August 2026, 10:30 AM", due: "Friday, 28 August 2026, 11:59 PM" },
          { id: "assignment-1", name: "Assignment 1 - Portfolio Page", type: "assignment", opened: "Monday, 17 August 2026, 10:30 AM", due: "Friday, 28 August 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-3",
        title: "Module 3: Flexbox & Grid",
        items: [
          { id: "lecture-flexbox", name: "Lecture Notes - Flexbox & Grid", type: "resource" },
          { id: "lab-3", name: "Lab Exercise 3 - Layout Challenge", type: "assignment", opened: "Monday, 31 August 2026, 10:30 AM", due: "Friday, 11 September 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-4",
        title: "Module 4: JavaScript Intro",
        items: [
          { id: "lecture-js", name: "Lecture Notes - JavaScript Basics", type: "resource" },
          { id: "lab-4", name: "Lab Exercise 4 - Interactive Page", type: "assignment", opened: "Monday, 14 September 2026, 10:30 AM", due: "Friday, 25 September 2026, 11:59 PM" },
          { id: "quiz-2", name: "Quiz 2 - JavaScript Fundamentals", type: "quiz", opened: "Monday, 21 September 2026, 10:30 AM", due: "Friday, 25 September 2026, 11:59 PM" },
        ],
      },
    ],
  },
  {
    id: "2",
    code: "72122",
    title: "WEB DESIGN & DEVELOPMENT",
    semester: "AY 2026-2027 First Semester",
    sections: [
      {
        id: "general",
        title: "General",
        items: [
          { id: "announcements", name: "Announcements", type: "forum" },
          { id: "syllabus", name: "Course Syllabus", type: "resource" },
        ],
      },
      {
        id: "module-1",
        title: "Module 1: HTML5 Basics",
        items: [
          { id: "lecture-html5", name: "Lecture Notes - HTML5 Introduction", type: "resource" },
          { id: "lab-1", name: "Lab Exercise 1 - Basic HTML Page", type: "assignment", opened: "Tuesday, 4 August 2026, 1:00 PM", due: "Thursday, 13 August 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-2",
        title: "Module 2: CSS3 Fundamentals",
        items: [
          { id: "lecture-css3", name: "Lecture Notes - CSS3 Basics", type: "resource" },
          { id: "lab-2", name: "Lab Exercise 2 - Styling a Webpage", type: "assignment", opened: "Tuesday, 18 August 2026, 1:00 PM", due: "Thursday, 27 August 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-3",
        title: "Module 3: Flexbox & Grid",
        items: [
          { id: "lecture-flexbox", name: "Lecture Notes - Flexbox & Grid", type: "resource" },
          { id: "lab-3", name: "Lab Exercise 3 - Layout Challenge", type: "assignment", opened: "Tuesday, 1 September 2026, 1:00 PM", due: "Thursday, 10 September 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-4",
        title: "Module 4: JavaScript Intro",
        items: [
          { id: "lecture-js", name: "Lecture Notes - JavaScript Basics", type: "resource" },
          { id: "lab-4", name: "Lab Exercise 4 - Interactive Page", type: "assignment", opened: "Tuesday, 15 September 2026, 1:00 PM", due: "Thursday, 24 September 2026, 11:59 PM" },
        ],
      },
    ],
  },
  {
    id: "3",
    code: "72138",
    title: "COMPUTER PROGRAMMING 1",
    semester: "AY 2026-2027 First Semester",
    sections: [
      {
        id: "general",
        title: "General",
        items: [
          { id: "announcements", name: "Announcements", type: "forum" },
          { id: "attendance", name: "Attendance", type: "url" },
          { id: "excuse-letter", name: "Excuse Letter", type: "assignment", opened: "Monday, 3 August 2026, 10:30 AM", due: "Thursday, 31 December 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-1",
        title: "Module 1: Python Introduction",
        items: [
          { id: "lecture-python", name: "Lecture Notes - Getting Started with Python", type: "resource" },
          { id: "lab-1", name: "Lab Exercise 1 - Hello World", type: "assignment", opened: "Monday, 3 August 2026, 10:30 AM", due: "Friday, 14 August 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-2",
        title: "Module 2: Variables & Data Types",
        items: [
          { id: "lecture-variables", name: "Lecture Notes - Variables & Data Types", type: "resource" },
          { id: "lab-2", name: "Lab Exercise 2 - Variable Practice", type: "assignment", opened: "Monday, 17 August 2026, 10:30 AM", due: "Friday, 28 August 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-3",
        title: "Module 3: Control Structures",
        items: [
          { id: "lecture-control", name: "Lecture Notes - If/Else & Loops", type: "resource" },
          { id: "lab-3", name: "Lab Exercise 3 - Conditional Logic", type: "assignment", opened: "Monday, 31 August 2026, 10:30 AM", due: "Friday, 11 September 2026, 11:59 PM" },
        ],
      },
      {
        id: "module-4",
        title: "Module 4: Functions",
        items: [
          { id: "lecture-functions", name: "Lecture Notes - Functions in Python", type: "resource" },
          { id: "lab-4", name: "Lab Exercise 4 - Function Practice", type: "assignment", opened: "Monday, 14 September 2026, 10:30 AM", due: "Friday, 25 September 2026, 11:59 PM" },
        ],
      },
    ],
  },
];

const tabs = ["Course", "Participants", "Grades", "Competencies"] as const;

const itemIcons: Record<SectionItem["type"], typeof BookOpen> = {
  resource: FileText,
  url: Link2,
  assignment: FileUp,
  quiz: CheckSquare,
  forum: MessageSquare,
};

const itemColors: Record<SectionItem["type"], string> = {
  resource: "text-slate-600",
  url: "text-teal-600",
  assignment: "text-pink-600",
  quiz: "text-blue-600",
  forum: "text-purple-600",
};

// ─── Page ───────────────────────────────────────────────────────────────────
export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const course = mockCourses.find((c) => c.id === courseId);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Course");
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [drawerExpanded, setDrawerExpanded] = useState<Set<number>>(new Set([0]));

  const toggleSection = (index: number) => {
    setExpandedSection((prev) => (prev === index ? null : index));
  };

  const toggleDrawerSection = (index: number) => {
    setDrawerExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const collapseAll = () => setExpandedSection(null);
  const expandAll = () => setExpandedSection(0);

  const handleSelectSection = (sectionId: string) => {
    setDrawerOpen(false);
    router.push(`/course/${courseId}/${sectionId}`);
  };

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
          <h1 className="mt-3 text-lg font-semibold text-slate-900">Course not found</h1>
          <p className="mt-1 text-sm text-slate-500">
            The course you&apos;re looking for doesn&apos;t exist.
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

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:px-6">
          <Link
            href="/dashboard"
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
            className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
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
                className="rounded-md border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-50"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                aria-label="More options"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {course.sections.map((section, i) => {
                const isOpen = drawerExpanded.has(i);
                return (
                  <div key={i} className="border-b border-slate-100">
                    <button
                      onClick={() => {
                        toggleDrawerSection(i);
                        handleSelectSection(section.id);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <ChevronRight className={`h-4 w-4 shrink-0 text-slate-400 chevron-rotate ${isOpen ? "open" : ""}`} />
                      {section.title}
                    </button>
                    {isOpen && (
                      <div className="pb-2 pl-10 pr-4 animate-slide-down">
                        {section.items.map((item, j) => (
                          <Link
                            key={j}
                            href={`/course/${courseId}/${section.id}/view/${item.id}`}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50"
                          >
                            <span className="flex-1">{item.name}</span>
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
        {/* Course title */}
        <h1 className="text-2xl font-bold text-slate-900">
          {course.code}-{course.title}
        </h1>

        {/* Tabs */}
        <div className="mt-4 border-b border-slate-200">
          <div className="-mb-px flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "Course" && (
          <div className="mt-6">
            <div className="mb-4 flex justify-end">
              <button
                onClick={expandedSection !== null ? collapseAll : expandAll}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                {expandedSection !== null ? "Collapse all" : "Expand all"}
              </button>
            </div>
            <div className="space-y-3">
              {course.sections.map((section, i) => {
                const isOpen = expandedSection === i;
                return (
                  <div key={i} className="rounded-lg border border-slate-200 bg-white">
                    <button
                      onClick={() => toggleSection(i)}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left cursor-pointer"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <ChevronRight className={`h-4 w-4 text-slate-500 chevron-rotate ${isOpen ? "open" : ""}`} />
                      </div>
                      <span className="text-base font-bold text-slate-900">
                        {section.title}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-100 px-5 py-3 animate-slide-down">
                        {section.items.map((item, j) => {
                          const Icon = itemIcons[item.type];
                          const color = itemColors[item.type];
                          return (
                            <Link
                              key={j}
                              href={`/course/${courseId}/${section.id}/view/${item.id}`}
                              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-slate-700 transition-colors duration-150 hover:bg-slate-50"
                            >
                              <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                              <span className="flex-1">{item.name}</span>
                              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "Participants" && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">Participants list coming soon.</p>
          </div>
        )}

        {activeTab === "Grades" && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">Grades overview coming soon.</p>
          </div>
        )}

        {activeTab === "Competencies" && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">Competencies coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
