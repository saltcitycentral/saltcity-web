import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

// 1. Added 'target' to the Props type
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  href?: string;
  target?: string; 
};

export default function Button({
  variant = "primary",
  className = "",
  href,
  target, // 2. Destructure target here
  children,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full shadow-md px-8 py-3 text-sm font-semibold transition duration-300";

  // 3. Updated colors to match your new Tredin Engineering palette
  // Primary: Refinery Bronze (#92400E) | Secondary: Transparent with Slate ring
  const styles =
    variant === "primary"
      ? "bg-[#92400E] text-white hover:bg-[#78350F]" 
      : "bg-transparent text-[#0F172A] ring-1 ring-[#64748B]/40 hover:ring-[#64748B]";

  const combinedClassName = `${base} ${styles} ${className}`;

  // If href is provided, render a Next.js Link
  if (href) {
    return (
      <Link 
        href={href} 
        target={target} // 4. Pass the target prop to the Link
        className={combinedClassName}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render a standard button
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}