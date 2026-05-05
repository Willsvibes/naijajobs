import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Home, LogOut, PlusCircle,  User2Icon, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { useAuthStore } from '../store/useAuthStore'; 
import { toast } from 'sonner';

const allNavItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: Home,
    roles: ["employee", "employer"]
  },
  {
    name: "Post Job",
    link: "/post",
    icon: PlusCircle,
    roles: ["employer"]
  },
  {
    name: "Profile",
    link: "/profile",
    icon: User2Icon,
    roles: ["employee", "employer"]
  }
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user) return null; 

  const navItems = allNavItems.filter(item => item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    toast.success('Logged out successfully');
  };

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
              className={({ isActive }) =>
                `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? "bg-linear-to-r from-amber-500/10 to-transparent text-amber-400 border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/50"
                }`
              }
              key={item.name}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3.5">
                    <item.icon
                      size={20}
                      className={`transition-colors duration-300 ${
                        isActive ? "text-amber-400" : "text-slate-500 group-hover:text-amber-400"
                      }`}
                    />
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

          <button
            onClick={handleLogout}
            className="w-full group flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 text-slate-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
          >
            <LogOut
              size={20}
              className="text-slate-500 group-hover:text-red-400 transition-colors duration-300"
            />
            <span className="font-medium text-[15px]">Sign Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
