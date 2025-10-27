import type { ReactNode } from "react"

interface IButton {
    children: ReactNode,
    styles?: string
}
const Button = ({ styles, children }: IButton) => {
    return (
        <button type="button" className={`${styles}  bg-indigo-500 space-x-1 flex items-center rounded mt px-3 py-2`} disabled>
            <svg className=" size-5 animate-spin ..." viewBox="0 0 24 24">
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
            </svg>
            {children}
        </button>
    )
}

export default Button