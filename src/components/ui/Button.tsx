import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

// 1. Updated Props to include icon and iconPosition
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  href?: string;
  target?: string;
  icon?: ReactNode; // Added this
  iconPosition?: "left" | "right"; // Added this
};

export default function Button({
  variant = "primary",
  className = "",
  href,
  target,
  icon,
  iconPosition = "right", // Default to right
  children,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full shadow-md px-8 py-3 text-sm font-semibold transition duration-300";

  // Using the Tredin Refinery Bronze and Deep Petroleum colors
  const styles =
    variant === "primary"
      ? "bg-[#92400E] text-white hover:bg-[#78350F]" 
      : "bg-transparent text-[#0F172A] ring-1 ring-[#64748B]/40 hover:ring-[#64748B]";

  const combinedClassName = `${base} ${styles} ${className}`;

  // Helper to render the button content with icon
  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {content}
    </button>
  );
}