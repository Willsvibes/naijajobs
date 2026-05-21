import React, { useEffect, useState } from 'react';
import { Menu, X, Home, PlusCircle, User2Icon, Bell, Inbox } from 'lucide-react';
import { NavLink } from 'react-router';
import { Logo } from '../Ui/logo';
import { useAuthStore } from '../store/useAuthStore';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../api/axiosInstance';
import LogoutButton from '../pages/Logout';

const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useAuthStore((state) => state.user);

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

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!user) return null;

  const navItems = [
    { name: "Dashboard", link: "/dashboard", icon: Home, roles: ["employee", "employer", "admin"] },
    { name: "Post Request", link: "/post", icon: PlusCircle, roles: ["employer"] },
    { name: "Offers", link: "/offers", icon: Inbox, roles: ["employer"] },
    { name: "Notifications", link: "/notifications", icon: Bell, roles: ["employee", "employer", "admin"] },
    { name: "Profile", link: "/profile", icon: User2Icon, roles: ["employee", "employer", "admin"] }
  ].filter(item => item.roles.includes(user.role));

  return (
    <>
      <header className="sm:hidden sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="scale-90 origin-left">
            <Logo />
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              to="/notifications"
              className="relative p-2 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-950">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </NavLink>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
              className="absolute left-4 right-4 top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
            >
              <nav className="flex flex-col p-4 gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.link}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-4 rounded-xl transition-all ${
                        isActive
                          ? "bg-linear-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/30"
                          : "text-slate-400 hover:bg-slate-900"
                      }`
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <item.icon size={20} />
                        {item.name === "Notifications" && unreadCount > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-950">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </span>
                        )}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </NavLink>
                ))}

                <div className="h-px bg-slate-800 my-2" />

                <div onClick={() => setIsOpen(false)}>
                  <LogoutButton />
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-black font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-white truncate">{user.name}</span>
                      <span className="text-xs text-slate-400 capitalize">
                        {user.role === "employer" ? "client" : user.role === "employee" ? "provider" : user.role}
                      </span>
                    </div>
                  </div>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeader;
