import React from 'react';
import { Home, Dumbbell, Calendar, User, ClipboardList } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Dumbbell, label: 'Exercises', path: '/exercises' },
  { icon: ClipboardList, label: 'Workouts', path: '/workouts' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-white border-r">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Home Gym</h1>
        </div>
        <ul className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <main className="flex-1 bg-gray-50 overflow-auto">
        {children}
      </main>
    </div>
  );
}