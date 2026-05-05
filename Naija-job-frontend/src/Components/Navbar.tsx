import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { Home, PlusCircle, Sparkles, User2Icon, Bell, X, Menu, Briefcase } from 'lucide-react';
import Logo from './Logo';
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
];

const Navbar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [unreadCount, setUnreadCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchUnread = async () => {
      try {
        const res = await api.get("/notifications");
        setUnreadCount(res.data.unreadCount);
      } catch {
        // silently fail — don't block the UI
      }
    };

    fetchUnread();

    // Poll every 60 seconds for new notifications
    const interval = setInterval(fetchUnread, 60000);
    return () => clearInterval(interval);
  }, [user]);

  if (!user) return null;

  const navItems = allNavItems.filter((item) => item.roles.includes(user.role));

  const NavContent = ({ onClose }: { onClose?: () => void }) => (
    <>
      <Logo />
      <menu className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            to={item.link}
            key={item.name}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? "bg-linear-to-r from-amber-500 to-yellow-600 text-black shadow-lg shadow-amber-500/25"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {!isActive && (
                  <div className="absolute inset-0 bg-linear-to-r from-amber-500/0 to-yellow-500/0 group-hover:from-amber-500/10 group-hover:to-yellow-500/10 transition-all duration-300" />
                )}
                <div className="relative z-10 flex items-center gap-4 w-full">
                  <div className="relative">
                    <item.icon
                      size={20}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "text-black"
                          : "text-slate-400 group-hover:text-amber-400"
                      }`}
                    />
                    {/* Unread badge on bell icon */}
                    {item.name === "Notifications" && unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-medium text-sm ${isActive ? "text-black" : ""}`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="ml-auto">
                      <Sparkles size={14} className="text-black animate-pulse" />
                    </div>
                  )}
                </div>
              </>
            )}
          </NavLink>
        ))}
      </menu>

     
<div className="mt-auto pt-6 border-t border-slate-700/50 flex flex-col gap-2">
  <LogoutButton />
  <div className="px-4 py-3 rounded-xl bg-linear-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30">
    <p className="text-xs text-slate-400 mb-1">Need help?</p>
    <button className="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1">
      Contact Support
      <span className="text-xs">→</span>
    </button>
  </div>
</div>
    </>
  );

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────── */}
      <div className="col-span-1 h-screen xl:py-5 lg:py-2 xl:pl-5 lg:pl-2 hidden sm:block sticky top-0">
        <nav className="h-full xl:rounded-3xl lg:rounded-2xl w-60 bg-linear-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl flex flex-col xl:py-6 py-5 xl:px-5 px-4">
          <NavContent />
        </nav>
      </div>

      {/* ── Mobile Top Bar ──────────────────────────── */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <Briefcase size={16} className="text-black" />
          </div>
          <span className="text-white font-black text-sm">NaijaJobs</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Bell with badge */}
          <NavLink to="/notifications" className="relative">
            <Bell size={22} className="text-slate-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </NavLink>

          {/* Burger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer Overlay ───────────────────── */}
      {drawerOpen && (
        <div
          className="sm:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ───────────────────────────── */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-72 z-50 bg-linear-to-br from-slate-900 to-slate-800 border-r border-slate-700/50 shadow-2xl flex flex-col py-6 px-5 transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        <NavContent onClose={() => setDrawerOpen(false)} />
      </div>

      {/* ── Mobile spacer so content isn't hidden under top bar ── */}
      <div className="sm:hidden h-14" />
    </>
  );
};

export default Navbar;