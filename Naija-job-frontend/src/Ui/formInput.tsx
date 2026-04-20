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
    <div>
      {label && (
        <label
          className="text-darkgreen xl:text-lg text-sm font-bold"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 border-b border-darkgreen rounded-lg px-2">
        {icon ? (
          icon
        ) : type === "email" ? (
          <Mail size={20} />
        ) : (
          type === "password" && <Lock size={20} />
        )}

        <input
          className="w-full p-2 outline-0"
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
