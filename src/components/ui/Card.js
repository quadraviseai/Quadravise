import React from "react";
import clsx from "clsx";

export default function Card({
  title,
  children,
  extra,
  className = "",
  hoverable = true,
  bordered = true,
  cover,
  actions,
  bodyStyle,
  headStyle,
  ...rest
}) {
  return (
    <div
      className={clsx(
        "rounded-xl bg-transparent",
        bordered && "border border-black/10",
        hoverable && "transition-shadow hover:shadow-md",
        className
      )}
      {...rest}
    >
      {/* COVER */}
      {cover && <div className="overflow-hidden rounded-t-xl">{cover}</div>}

      {/* HEADER */}
      {(title || extra) && (
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-black/5"
          style={headStyle}
        >
          {title && <h3 className="text-sm font-medium text-black">{title}</h3>}
          {extra && <div>{extra}</div>}
        </div>
      )}

      {/* BODY */}
      <div className="px-5 py-4 text-sm text-black/80" style={bodyStyle}>
        {children}
      </div>

      {/* ACTIONS */}
      {actions && (
        <div className="flex gap-2 px-5 py-3 border-t border-black/5">
          {actions}
        </div>
      )}
    </div>
  );
}
