"use client";
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { GuidanceWidget } from "@/components/layout/GuidanceWidget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <main className="flex-1 transition-all duration-300 ease-in-out lg:ml-20 xl:ml-72">
        <Navbar
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={"pageTitle"}
        />

        {/* Content with top padding to account for fixed navbar */}
        <div className="pt-20">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Guidance Widget */}
      <GuidanceWidget />
    </div>
  );
}
