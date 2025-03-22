

'use client';

import { Users, Key } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 top-16 left-0 z-40 h-full w-64 bg-gradient-to-b from-purple-900 to-blue-800 text-white shadow-2xl rounded-r-2xl transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 ${
        !isOpen ? "w-0" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-center py-6 border-b border-gray-700 bg-opacity-20 backdrop-blur-md">
        <h2 className="text-lg font-semibold tracking-wide text-gray-100 uppercase">
        Webmatix Admin Panel
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 space-y-2 px-3">
        <SidebarLink href="/auth/registerusers" Icon={Users} label="Registered Users" />
        <SidebarLink href="/auth/credentials" Icon={Key} label="Credentials" />
      </nav>
    </aside>
  );
}

interface SidebarLinkProps {
  href: string;
  Icon: React.ElementType;
  label: string;
}

const SidebarLink = ({ href, Icon, label }: SidebarLinkProps) => (
  <Link
    href={href}
    className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-700 rounded-lg transition-all duration-300"
  >
    <Icon className="w-5 h-5 mr-3" />
    {label}
  </Link>
);
