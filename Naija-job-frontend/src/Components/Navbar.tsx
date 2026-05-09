import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { Home, PlusCircle, User2Icon, Bell, ChevronRight, Settings } from 'lucide-react';
import { Logo } from '../Ui/logo';
import { useAuthStore } from '../store/useAuthStore';
import api from '../api/axiosInstance';
import LogoutButton from '../pages/Logout';

const allNavItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: Home,
    roles: ["employee", "employer", "admin"],
  },
  {
    name: "Post Job",
    link: "/post",
    icon: PlusCircle,
    roles: ["employer"],
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: Bell,
    roles: ["employee", "employer", "admin"],
  },
  {
    name: "Profile",
    link: "/profile",
    icon: User2Icon,
    roles: ["employee", "employer", "admin"],
  },
  {
  name: "Settings",
  link: "/settings",
  icon: Settings, 
  roles: ["employee", "employer", "admin"],
}
];

const Navbar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchUnread = async () => {
      try {
        const res = await api.get("/notifications");
        setUnreadCount(res.data.unreadCount);
      } catch {
        // silently fail
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 60000);
    return () => clearInterval(interval);
  }, [user]);

  if (!user) return null;

  const navItems = allNavItems.filter((item) => item.roles.includes(user.role));

  return (
    <div className="hidden sm:block h-screen sticky top-0 w-72 bg-slate-950 border-r border-slate-800/60 shadow-[4px_0_24px_rgba(0,0,0,0.3)]">
      <nav className="h-full flex flex-col pt-8 pb-6 px-6">
        <div className="mb-10 px-2">
       <Logo />
        </div>

        <div className="flex-1 space-y-1.5">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
            Main Menu
          </p>
          {navItems.map((item) => (
            <NavLink
              to={item.link}
              key={item.name}
              className={({ isActive }) =>
                `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? "bg-linear-to-r from-amber-500/10 to-transparent text-amber-400 border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <item.icon
                        size={20}
                        className={`transition-colors duration-300 ${
                          isActive ? "text-amber-400" : "text-slate-500 group-hover:text-amber-400"
                        }`}
                      />
                      {item.name === "Notifications" && unreadCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-950">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </div>
                    <span className="font-medium text-[15px]">{item.name}</span>
                  </div>
                  
                  <ChevronRight 
                    size={16} 
                    className={`transition-all duration-300 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    }`} 
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800/60">
          {/* User Profile Section */}
          <div className="mb-6 px-2">
            <div className="p-4 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 border border-slate-800/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20">
                {user.name.charAt(0)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-white truncate">{user.name}</span>
                <span className="text-xs text-slate-500 capitalize">{user.role}</span>
              </div>
            </div>
          </div>

          <LogoutButton />
          
          <div className="mt-4 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <p className="text-[10px] text-slate-500 mb-1">Need help?</p>
            <button className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1">
              Contact Support
              <span className="text-[10px]">→</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
