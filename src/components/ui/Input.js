import React from "react";
import clsx from "clsx";

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-4 text-base",
};

export default React.forwardRef(function Input(
  {
    value,
    onChange,
    placeholder,
    name,
    type = "text",
    className = "",
    size = "md",
    rows = 4,
    ...rest
  },
  ref
) {
  const base =
    "w-full rounded-xl border border-black/15 bg-white text-black placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50";

  // TEXTAREA
  if (type === "textarea") {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        rows={rows}
        className={clsx(base, "py-3", className)}
        {...rest}
      />
    );
  }

  // INPUT
  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={clsx(base, sizes[size], className)}
      {...rest}
    />
  );
});
