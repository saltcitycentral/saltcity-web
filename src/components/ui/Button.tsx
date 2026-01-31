import React, { ReactNode } from "react";
import Link from "next/link";

type CommonProps = {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
};

// When href exists, render a link
type LinkButtonProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

// When href does NOT exist, render a button
type RealButtonProps = CommonProps & {
  href?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = LinkButtonProps | RealButtonProps;

export default function Button(props: Props) {
  const {
    variant = "primary",
    className = "",
    icon,
    iconPosition = "right",
    children,
    ...rest
  } = props;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full shadow-md px-8 py-3 text-sm font-semibold transition duration-300";

  const styles =
    variant === "primary"
      ? "bg-[#92400E] text-black hover:bg-[#78350F]"
      : "bg-transparent text-[#0F172A] ring-1 ring-[#64748B]/40 hover:ring-[#64748B]";

  const combinedClassName = `${base} ${styles} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  // 🔥 Defensive: remove `asChild` if it exists anywhere in your project
  const { asChild, ...safeRest } = rest as any;

  if ("href" in props && props.href) {
    const { href, target, rel, ...anchorRest } = safeRest as LinkButtonProps;

    return (
      <Link
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={combinedClassName}
        {...anchorRest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...(safeRest as RealButtonProps)}>
      {content}
    </button>
  );
}
