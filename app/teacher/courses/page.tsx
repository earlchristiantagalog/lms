"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  BookOpen, Calendar, Search, Bell, User, LayoutDashboard,
  Menu, X, GraduationCap, MoreVertical, FileText, Settings,
  LogOut, Users, CheckCircle, Clock,
} from "lucide-react";

const mockUser = { name: "Prof. Santos", avatar: null, initials: "PS" };
const pageTitle = "LMS";

const mockCourses = [
  { id: "1", code: "72107", title: "WEB DESIGN & DEVELOPMENT", semester: "AY 2026-2027 First Semester", color: "from-amber-400 to-yellow-500", students: 42 },
  { id: "2", code: "72122", title: "WEB DESIGN & DEVELOPMENT", semester: "AY 2026-2027 First Semester", color: "from-sky-400 to-blue-600", students: 38 },
  { id: "3", code: "72138", title: "COMPUTER PROGRAMMING 1", semester: "AY 2026-2027 First Semester", color: "from-indigo-500 to-purple-700", students: 45 },
];

const mockSubmissions = [
  { id: "1", title: "Lab Exercise 1 - Basic HTML Page", student: "Alex Johnson", course: "72107 - WEB DESIGN & DEVELOPMENT", submittedAt: "Aug 14, 2026 11:45 PM", status: "pending" as const },
  { id: "2", title: "Lab Exercise 1 - Basic HTML Page", student: "Maria Garcia", course: "72107 - WEB DESIGN & DEVELOPMENT", submittedAt: "Aug 14, 2026 10:30 PM", status: "pending" as const },
  { id: "3", title: "Lab Exercise 2 - Styling a Webpage", student: "James Lee", course: "72122 - WEB DESIGN & DEVELOPMENT", submittedAt: "Aug 13, 2026 09:15 PM", status: "graded" as const },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/teacher", active: false },
  { label: "My Courses", icon: BookOpen, href: "/teacher/courses", active: true },
  { label: "Submissions", icon: FileText, href: "/teacher/submissions", active: false },
  { label: "Schedule", icon: Calendar, href: "/teacher/schedule", active: false },
];

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">{pageTitle}</span>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:text-slate-600 lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${item.active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}

function SubmissionCard({ submission }: { submission: (typeof mockSubmissions)[number] }) {
  const statusConfig = {
    pending: { bg: "bg-amber-100", text: "text-amber-700", label: "Pending" },
    graded: { bg: "bg-green-100", text: "text-green-700", label: "Graded" },
  };
  const status = statusConfig[submission.status];
  return (
    <div className="flex items-start gap-3 py-4 transition-colors duration-200 hover:bg-slate-50/50">
      <div className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-slate-100 flex items-center justify-center">
        <User className="h-4 w-4 text-slate-500" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-slate-900">{submission.title}</p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}>{status.label}</span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">{submission.student}</p>
        <p className="mt-0.5 text-xs text-slate-400">{submission.course}</p>
        <p className="mt-1 text-xs text-slate-400">Submitted: {submission.submittedAt}</p>
      </div>
    </div>
  );
}

export default function TeacherDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) setNotificationsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pendingCount = mockSubmissions.filter((s) => s.status === "pending").length;
  const totalStudents = mockCourses.reduce((sum, c) => sum + c.students, 0);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-sm sm:px-6">
          <button onClick={() => setSidebarOpen(true)} className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold text-slate-900">Welcome back, {mockUser.name}!</h1>
          </div>
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-9 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 transition-colors duration-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 lg:w-72" />
          </div>
          <div className="flex items-center gap-2">
            <div ref={notificationsRef}>
              <button onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }} className="relative rounded-lg p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700 cursor-pointer" aria-label="Notifications" aria-expanded={notificationsOpen}>
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
              </button>
            </div>
            <div ref={profileRef}>
              <button onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 cursor-pointer" aria-label="User profile" aria-expanded={profileOpen}>
                <User className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="py-4">
              <h2 className="text-base font-semibold text-slate-900">My Courses</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {mockCourses.map((course) => (
                <Link key={course.id} href={`/teacher/course/${course.id}`} className="flex items-center gap-4 py-4 transition-colors duration-200 hover:bg-slate-50/50">
                  <div className={`h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br ${course.color}`} />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-blue-600">{course.code}-{course.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{course.semester}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{course.students} students</p>
                  </div>
                  <button onClick={(e) => e.preventDefault()} className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-600" aria-label={`Options for ${course.title}`}>
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      {notificationsOpen && typeof window !== "undefined" && createPortal(
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setNotificationsOpen(false)} />
          <div className="fixed left-0 right-0 top-14 z-[70] max-h-[calc(100vh-3.5rem)] animate-slide-down border-b border-slate-200 bg-white shadow-lg sm:fixed sm:inset-x-auto sm:bottom-auto sm:left-auto sm:right-4 sm:top-16 sm:w-80 sm:rounded-lg sm:border sm:border-slate-200 sm:border-b-0">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
              <button className="text-xs font-medium text-blue-600 hover:underline cursor-pointer">Mark all read</button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <div className="flex gap-3 border-b border-slate-50 px-4 py-3 bg-blue-50/50">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                <div>
                  <p className="text-sm text-slate-900">New submission received</p>
                  <p className="text-xs text-slate-500">Alex Johnson - Lab Exercise 1</p>
                  <p className="mt-1 text-xs text-slate-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3 border-b border-slate-50 px-4 py-3 bg-blue-50/50">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                <div>
                  <p className="text-sm text-slate-900">New submission received</p>
                  <p className="text-xs text-slate-500">Maria Garcia - Lab Exercise 1</p>
                  <p className="mt-1 text-xs text-slate-400">5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3 px-4 py-3">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-transparent" />
                <div>
                  <p className="text-sm text-slate-900">Course updated</p>
                  <p className="text-xs text-slate-500">WEB DESIGN & DEVELOPMENT - new module added</p>
                  <p className="mt-1 text-xs text-slate-400">Yesterday</p>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 px-4 py-2.5">
              <button className="w-full text-center text-xs font-medium text-blue-600 hover:underline cursor-pointer">View all notifications</button>
            </div>
          </div>
        </>,
        document.body
      )}

      {profileOpen && typeof window !== "undefined" && createPortal(
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setProfileOpen(false)} />
          <div className="fixed right-4 top-16 z-[70] w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg animate-slide-down">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">{mockUser.name}</p>
              <p className="text-xs text-slate-500">Teacher</p>
            </div>
            <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors duration-150 hover:bg-slate-50 cursor-pointer">
              <User className="h-4 w-4 text-slate-400" />My Profile
            </button>
            <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors duration-150 hover:bg-slate-50 cursor-pointer">
              <Settings className="h-4 w-4 text-slate-400" />Settings
            </button>
            <div className="border-t border-slate-100" />
            <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors duration-150 hover:bg-red-50 cursor-pointer">
              <LogOut className="h-4 w-4" />Log out
            </button>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
