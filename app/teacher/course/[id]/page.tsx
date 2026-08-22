"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  MoreVertical,
  Plus,
  Pencil,
  Trash2,
  MessageSquare,
  Link2,
  FileUp,
  FileText,
  CheckSquare,
} from "lucide-react";

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
];

const tabs = ["Course", "Participants", "Grades", "Competencies"] as const;

const itemIcons: Record<SectionItem["type"], typeof FileText> = {
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

export default function TeacherCourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = mockCourses.find((c) => c.id === courseId);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Course");
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [drawerExpanded, setDrawerExpanded] = useState<Set<number>>(new Set([0]));

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState("");
  const [addingItemToSection, setAddingItemToSection] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<SectionItem["type"]>("resource");
  const [sectionActionsOpen, setSectionActionsOpen] = useState<string | null>(null);
  const [itemActionsOpen, setItemActionsOpen] = useState<string | null>(null);
  const [sectionMenuPos, setSectionMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [itemMenuPos, setItemMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("New Section");

  const toggleSection = (index: number) => {
    setExpandedSection((prev) => (prev === index ? null : index));
  };

  const toggleDrawerSection = (index: number) => {
    setDrawerExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const collapseAll = () => setExpandedSection(null);
  const expandAll = () => setExpandedSection(0);

  const handleStartEditSection = (sectionId: string, currentTitle: string) => {
    setEditingSection(sectionId);
    setEditingSectionTitle(currentTitle);
  };

  const handleSaveSectionTitle = () => {
    setEditingSection(null);
    setEditingSectionTitle("");
  };

  const handleCancelEditSection = () => {
    setEditingSection(null);
    setEditingSectionTitle("");
  };

  const handleSaveNewItem = () => {
    setAddingItemToSection(null);
    setNewItemName("");
    setNewItemType("resource");
  };

  const handleCancelAddItem = () => {
    setAddingItemToSection(null);
    setNewItemName("");
    setNewItemType("resource");
  };

  const handleSaveNewSection = () => {
    setIsAddingSection(false);
    setNewSectionTitle("New Section");
  };

  const handleCancelNewSection = () => {
    setIsAddingSection(false);
    setNewSectionTitle("New Section");
  };

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
          <h1 className="mt-3 text-lg font-semibold text-slate-900">Course not found</h1>
          <p className="mt-1 text-sm text-slate-500">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/teacher" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-visible bg-zinc-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:px-6">
          <Link href="/teacher" className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold text-slate-900">{course.code}-{course.title}</h1>
          </div>
          <button onClick={() => setDrawerOpen(true)} className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100" aria-label="Open modules">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-full flex-col bg-white shadow-xl animate-slide-in-left">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <button onClick={() => setDrawerOpen(false)} className="rounded-md border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-50" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
              <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600" aria-label="More options">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {course.sections.map((section, i) => {
                const isOpen = drawerExpanded.has(i);
                return (
                  <div key={i} className="border-b border-slate-100">
                    <button onClick={() => { toggleDrawerSection(i); }} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                      <ChevronRight className={`h-4 w-4 shrink-0 text-slate-400 chevron-rotate ${isOpen ? "open" : ""}`} />
                      {section.title}
                    </button>
                    {isOpen && (
                      <div className="pb-2 pl-10 pr-4 animate-slide-down">
                        {section.items.map((item, j) => (
                          <Link key={j} href={`/teacher/course/${courseId}/edit/${item.id}`} className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50">
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

      <main className="mx-auto max-w-5xl overflow-visible px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">{course.code}-{course.title}</h1>

        <div className="mt-4 border-b border-slate-200">
          <div className="-mb-px flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-4 py-2.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${activeTab === tab ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>
                {tab}
                {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Course" && (
          <div className="mt-6">
            <div className="mb-4 flex justify-end">
              <button onClick={expandedSection !== null ? collapseAll : expandAll} className="text-sm font-medium text-blue-600 hover:underline">
                {expandedSection !== null ? "Collapse all" : "Expand all"}
              </button>
            </div>
            <div className="space-y-3 overflow-visible">
              {course.sections.map((section, i) => {
                const isOpen = expandedSection === i;
                const isEditing = editingSection === section.id;
                const isAddingItem = addingItemToSection === section.id;
                return (
                  <div key={i} className="overflow-visible rounded-lg border border-slate-200 bg-white">
                    <div className="flex items-center gap-3 px-5 py-4">
                      <button onClick={() => toggleSection(i)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 cursor-pointer">
                        <ChevronRight className={`h-4 w-4 text-slate-500 chevron-rotate ${isOpen ? "open" : ""}`} />
                      </button>
                      {isEditing ? (
                        <div className="flex flex-1 items-center gap-2">
                          <input type="text" value={editingSectionTitle} onChange={(e) => setEditingSectionTitle(e.target.value)} className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-base font-bold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" autoFocus />
                          <button onClick={handleSaveSectionTitle} className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800">Save</button>
                          <button onClick={handleCancelEditSection} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1 text-base font-bold text-slate-900">{section.title}</span>
                          <div className="relative">
                            <button onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setSectionActionsOpen(sectionActionsOpen === section.id ? null : section.id); setSectionMenuPos(sectionActionsOpen === section.id ? null : { x: r.right - 144, y: r.bottom + 4 }); }} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label={`Actions for ${section.title}`}>
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    {isOpen && (
                      <div className="overflow-visible border-t border-slate-100 px-5 py-3 animate-slide-down">
                        {section.items.map((item, j) => {
                          const Icon = itemIcons[item.type];
                          const color = itemColors[item.type];
                          const isItemOpen = itemActionsOpen === item.id;
                          return (
                            <div key={j} className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-700 transition-colors duration-150 hover:bg-slate-50">
                              <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                              <span className="flex-1">{item.name}</span>
                              <div className="relative">
                                <button onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setItemActionsOpen(isItemOpen ? null : item.id); setItemMenuPos(isItemOpen ? null : { x: r.right - 144, y: r.top - 88 }); }} className="rounded-md p-1 text-slate-400 opacity-0 transition-opacity duration-150 hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100" aria-label={`Actions for ${item.name}`}>
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        {isAddingItem ? null : (
                          <Link href={`/teacher/course/${courseId}/${section.id}/new-item`} className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 transition-colors duration-150 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600">
                            <Plus className="h-4 w-4" />
                            Add item
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {isAddingSection ? (
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50/50 p-4">
                <input type="text" value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2 text-base font-bold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" autoFocus />
                <div className="flex gap-2">
                  <button onClick={handleSaveNewSection} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Add Section</button>
                  <button onClick={handleCancelNewSection} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setIsAddingSection(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-900 transition-colors duration-150 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600">
                <Plus className="h-4 w-4" />
                Add section
              </button>
            )}
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

      {sectionActionsOpen && sectionMenuPos && typeof window !== "undefined" && createPortal(
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => { setSectionActionsOpen(null); setSectionMenuPos(null); }} />
          <div style={{ position: "fixed", left: sectionMenuPos.x, top: sectionMenuPos.y, zIndex: 70 }} className="w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg animate-slide-down">
            <button onClick={() => { const sec = course.sections.find((s) => s.id === sectionActionsOpen); setSectionActionsOpen(null); setSectionMenuPos(null); if (sec) handleStartEditSection(sec.id, sec.title); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <Pencil className="h-4 w-4 text-slate-400" />
              Edit
            </button>
            <button onClick={() => { setSectionActionsOpen(null); setSectionMenuPos(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </>,
        document.body
      )}

      {itemActionsOpen && itemMenuPos && typeof window !== "undefined" && createPortal(
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => { setItemActionsOpen(null); setItemMenuPos(null); }} />
          <div style={{ position: "fixed", left: itemMenuPos.x, top: itemMenuPos.y, zIndex: 70 }} className="w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg animate-slide-down">
            <button onClick={() => { let sectionId = ""; for (const s of course.sections) { if (s.items.find((it) => it.id === itemActionsOpen)) { sectionId = s.id; break; } } setItemActionsOpen(null); setItemMenuPos(null); if (sectionId) window.location.href = `/teacher/course/${courseId}/${sectionId}/${itemActionsOpen}/edit-item`; }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <Pencil className="h-4 w-4 text-slate-400" />
              Edit
            </button>
            <button onClick={() => { setItemActionsOpen(null); setItemMenuPos(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
