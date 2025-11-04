import { type ReactNode } from "react";

interface IButton {
  children: ReactNode;
  styles?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const ButtonMobile = ({ children, isLoading = false, disabled = false, styles }: IButton) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`${styles}  items-center justify-center w-full space-x-2 space-x-reverse px-6 py-4 
        text-white bg-slate-800 rounded-lg font-medium shadow-md transition-all duration-200`}
    >
      {isLoading && (
        <svg
          className="w-5 h-5 mr-2 text-current animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
};

export default ButtonMobile;
