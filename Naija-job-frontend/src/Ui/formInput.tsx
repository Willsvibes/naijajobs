import { EyeClosed, EyeOff, Lock, Mail } from "lucide-react";
import React from "react";

interface FormInputProps {
  label?: string;
  type?: string;
  name?: string;
  id: string;
  value: string;
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
  onChange?: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  name,
  id,
  error,
  icon,
  onChange,
  onFocus,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className="text-sm text-slate-400"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className="p-2.5 rounded-lg gap-3 bg-slate-800 border border-slate-700 focus:border-amber-500 focus:outline-none transition-colors flex items-center">
        {icon ? (
          icon
        ) : type === "email" ? (
          <Mail size={20} />
        ) : (
          type === "password" && <Lock size={20} />
        )}

        <input
          className="w-full outline-0"
          type={type === "password" && showPassword ? "text" : type}
          name={name || id}
          id={id}
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
          onFocus={onFocus}
        />

        {type === "password" && showPassword ? (
          <EyeOff size={20} onClick={() => setShowPassword(!showPassword)} />
        ) : (
          type === "password" && (
            <EyeClosed
              size={20}
              onClick={() => setShowPassword(!showPassword)}
            />
          )
        )}
      </div>
      {error && <p className="text-red-500 text-sm italic">{error}</p>}
    </div>
  );
};

export default FormInput;
