import { Mail, User, Lock } from "lucide-react";

interface Props {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  icon?: string;
}

const Input = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  icon,
}: Props) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon === "user" ? (
            <User className="h-5 w-5 text-gray-400" />
          ) : icon === "email" ? (
            <Mail className="h-5 w-5 text-gray-400" />
          ) : icon === "password" ? (
            <Lock className="h-5 w-5 text-gray-400" />
          ) : null}
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`block w-full px-3 py-2 ${
            icon ? "pl-10" : ""
          } bg-gray-700 border border-gray-600 rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm`}
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export default Input;
