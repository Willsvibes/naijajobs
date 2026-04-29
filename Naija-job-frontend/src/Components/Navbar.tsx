
import React from 'react';
import { NavLink } from 'react-router';
import { Home, PlusCircle, Sparkles, User2Icon } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../Hooks/authContext'; // new context import

const allNavItems = [
  {
    name: "Dashboard",
    link: "/",
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
  const { user } = useAuth(); // get logged-in user from context
  if (!user) return null; // optional: hide navbar if no user

  // filter nav items based on role
  const navItems = allNavItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="col-span-1 h-screen xl:py-5 lg:py-2 xl:pl-5 lg:pl-2 hidden sm:block sticky top-0">
      <nav className="h-full xl:rounded-3xl lg:rounded-2xl w-60 bg-linear-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl flex flex-col xl:py-6 py-5 xl:px-5 px-4">
        <Logo />

        <menu className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-linear-to-r from-amber-500 to-yellow-600 text-black shadow-lg shadow-amber-500/25"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`
              }
              key={item.name}
            >
              {({ isActive }) => (
                <>
                  {!isActive && (
                    <div className="absolute inset-0 bg-linear-to-r from-amber-500/0 to-yellow-500/0 group-hover:from-amber-500/10 group-hover:to-yellow-500/10 transition-all duration-300"></div>
                  )}

                  <div className="relative z-10 flex items-center gap-4 w-full">
                    <item.icon
                      size={20}
                      className={`transition-all duration-300 ${
                        isActive ? "text-black" : "text-slate-400 group-hover:text-amber-400"
                      }`}
                    />
                    <span className={`font-medium text-sm ${isActive ? "text-black" : ""}`}>
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

        <div className="mt-auto pt-6 border-t border-slate-700/50">
          <div className="px-4 py-3 rounded-xl bg-linear-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30">
            <p className="text-xs text-slate-400 mb-1">Need help?</p>
            <button className="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1">
              Contact Support
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;