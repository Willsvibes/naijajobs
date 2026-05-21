import type { SettingsSection } from "./types";
import { sidebarItems } from "./settingsItems";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

export const SettingsSidebar = ({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) => (
  <div className="sm:w-52 shrink-0">
    <nav className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 sm:bg-slate-900/40 sm:rounded-2xl sm:border sm:border-slate-800 sm:p-2">
      {sidebarItems.map((item) => {
        const isActive = activeSection === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSectionChange(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap w-full text-left ${
              isActive
                ? item.danger
                  ? "bg-red-500/10 border border-red-500/20 text-red-400"
                  : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                : item.danger
                  ? "text-red-500/50 hover:bg-red-500/5 hover:text-red-400 border border-transparent"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"
            }`}
          >
            <Icon size={16} />
            {item.label}
          </button>
        );
      })}
    </nav>
  </div>
);
