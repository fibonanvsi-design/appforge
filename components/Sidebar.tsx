'use client';

import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  FiHome, 
  FiFolder, 
  FiLayout, 
  FiCpu, 
  FiServer, 
  FiGlobe, 
  FiSettings, 
  FiLogOut 
} from 'react-icons/fi';

interface SidebarProps {
  user: {
    email: string;
    name?: string | null;
  };
}

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/dashboard/projects', label: 'Projects', icon: FiFolder },
  { href: '/dashboard/templates', label: 'Templates', icon: FiLayout },
  { href: '/dashboard/ai-builder', label: 'AI Builder', icon: FiCpu },
  { href: '/dashboard/deployments', label: 'Deployments', icon: FiServer },
  { href: '/dashboard/domains', label: 'Domains', icon: FiGlobe },
  { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
];

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">AppForge</h1>
        <p className="text-sm text-gray-400 mt-1">Build & Deploy</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="text-xl" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.name || user.email}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <FiLogOut className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
