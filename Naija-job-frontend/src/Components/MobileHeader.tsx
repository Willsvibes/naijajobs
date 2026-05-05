import React, { useState } from 'react';
import { LogOut, Menu, X, Home, PlusCircle, User2Icon } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router';
import { toast } from 'sonner';
import Logo from './Logo';
import { useAuthStore } from '../store/useAuthStore';
import { AnimatePresence, motion } from 'framer-motion';

const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    toast.success('Logged out successfully');
    setIsOpen(false);
  };

  const navItems = [
    { name: "Dashboard", link: "/dashboard", icon: Home, roles: ["employee", "employer"] },
    { name: "Post Job", link: "/post", icon: PlusCircle, roles: ["employer"] },
    { name: "Profile", link: "/profile", icon: User2Icon, roles: ["employee", "employer"] }
  ].filter(item => item.roles.includes(user.role));

  return (
    <header className="sm:hidden sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="scale-90 origin-left">
          <Logo />
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-slate-950 border-b border-slate-800"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                      isActive
                        ? "bg-linear-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/30"
                        : "text-slate-400 hover:bg-slate-900"
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
              
              <div className="h-px bg-slate-800 my-2" />
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>

              <div className="mt-4 p-4 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-black font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{user.name}</span>
                    <span className="text-xs text-slate-400 capitalize">{user.role}</span>
                  </div>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MobileHeader;
