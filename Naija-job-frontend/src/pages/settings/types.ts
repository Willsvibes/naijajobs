export type SettingsSection = "account" | "notifications" | "security" | "danger";

export interface NotificationPrefs {
  applicationUpdates: boolean;
  newJobAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ShowPasswordState {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

export interface SettingsUser {
  name?: string;
  email?: string;
  role?: string;
}
