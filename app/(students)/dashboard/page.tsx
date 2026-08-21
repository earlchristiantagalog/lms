"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Search,
  Bell,
  User,
  LayoutDashboard,
  Menu,
  X,
  GraduationCap,
  MoreVertical,
  FileText,
} from "lucide-react";

// ─── Mock Data ──────────────────────────────────────────────────────────────
const mockUser = {
  name: "Alex",
  avatar: null,
  initials: "AJ",
};

const mockCourses = [
  {
    id: "1",
    code: "72107",
    title: "WEB DESIGN & DEVELOPMENT",
    semester: "AY 2026-2027 First Semester",
    color: "from-amber-400 to-yellow-500",
  },
  {
    id: "2",
    code: "72122",
    title: "WEB DESIGN & DEVELOPMENT",
    semester: "AY 2026-2027 First Semester",
    color: "from-sky-400 to-blue-600",
  },
  {
    id: "3",
    code: "72138",
    title: "COMPUTER PROGRAMMING 1",
    semester: "AY 2026-2027 First Semester",
    color: "from-indigo-500 to-purple-700",
  },
];

const mockTasks = [
  {
    id: "1",
    title: "React Quiz 2",
    instruction: "Answer all 15 questions covering hooks, context, and performance optimization patterns.",
    type: "Quiz",
    openDate: "Aug 18, 2026 09:00 AM",
    closeDate: "Aug 21, 2026 11:59 PM",
    course: "Advanced React Patterns",
  },
  // {
  //   id: "2",
  //   title: "Binary Tree Implementation",
  //   instruction: "Implement insertion, deletion, and traversal for a binary search tree in your preferred language.",
  //   type: "Assignment",
  //   openDate: "Aug 15, 2026 08:00 AM",
  //   closeDate: "Aug 22, 2026 11:59 PM",
  //   course: "Data Structures & Algorithms",
  // },
  // {
  //   id: "3",
  //   title: "Design System Proposal",
  //   instruction: "Create a mini design system with color tokens, typography scale, and component variants.",
  //   type: "Project",
  //   openDate: "Aug 10, 2026 09:00 AM",
  //   closeDate: "Aug 24, 2026 11:59 PM",
  //   course: "UI/UX Design Principles",
  // },
  // {
  //   id: "4",
  //   title: "ML Model Evaluation",
  //   instruction: "Train a classification model and submit your accuracy metrics, confusion matrix, and brief analysis.",
  //   type: "Assignment",
  //   openDate: "Aug 20, 2026 08:00 AM",
  //   closeDate: "Aug 28, 2026 11:59 PM",
  //   course: "Machine Learning Fundamentals",
  // },
];

// ─── Navigation Items ───────────────────────────────────────────────────────
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "My Courses", icon: BookOpen, href: "/courses", active: false },
  { label: "Schedule", icon: Calendar, href: "/schedule", active: false },
];

// ─── Components ─────────────────────────────────────────────────────────────
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">UCEdusphere</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:text-slate-600 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${item.active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700">
              {mockUser.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">Alex Johnson</p>
              <p className="truncate text-xs text-slate-500">Computer Science</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function CourseCard({ course }: { course: (typeof mockCourses)[number] }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border-b border-slate-100 py-4 transition-colors duration-200 last:border-b-0 hover:bg-slate-50/50">
      <div className={`h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br ${course.color}`} />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-blue-600">
          {course.code}-{course.title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">{course.semester}</p>
      </div>
      <button
        className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-600"
        aria-label={`Options for ${course.title}`}
      >
        <MoreVertical className="h-4 w-4" />
      </button>
    </div>
  );
}

function TaskCard({ task }: { task: (typeof mockTasks)[number] }) {
  const typeColors: Record<string, { bg: string; text: string }> = {
    Quiz: { bg: "bg-amber-100", text: "text-amber-700" },
    Assignment: { bg: "bg-blue-100", text: "text-blue-700" },
    Project: { bg: "bg-violet-100", text: "text-violet-700" },
  };
  const colors = typeColors[task.type] ?? { bg: "bg-slate-100", text: "text-slate-700" };

  return (
    <Link
      href={`/tasks/${task.id}`}
      className="block rounded-lg border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-slate-300"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">{task.title}</p>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
          {task.type}
        </span>
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">
        {task.instruction}
      </p>

      <p className="mt-2 text-xs text-slate-400">{task.course}</p>

      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
        <div>
          <span className="font-medium text-slate-600">Opens:</span>{" "}
          <span>{task.openDate}</span>
        </div>
      </div>
      <div className="mt-1 text-xs text-slate-500">
        <span className="font-medium text-slate-600">Due:</span>{" "}
        <span>{task.closeDate}</span>
      </div>
    </Link>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-sm sm:px-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Greeting */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold text-slate-900">
              Welcome back, {mockUser.name}!
            </h1>
          </div>

          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 transition-colors duration-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 lg:w-72"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="relative rounded-lg p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200"
              aria-label="User profile"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Tasks */}
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Tasks</h2>
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <div className="grid gap-3">
                {mockTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>

            {/* Enrolled Courses */}
            <section className="rounded-xl border border-slate-200 bg-white px-5">
              <div className="flex items-center justify-between py-4">
                <h2 className="text-base font-semibold text-slate-900">Enrolled Courses</h2>
                <button className="text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900">
                  View all
                </button>
              </div>
              <div>
                {mockCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
