import type { ComponentType } from "react";
import { AlertTriangle, Bell, Shield, User } from "lucide-react";
import type { SettingsSection } from "./types";

export const sidebarItems: Array<{
  id: SettingsSection;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  danger?: boolean;
}> = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle, danger: true },
];
