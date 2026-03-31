import * as React from "react"
import "../Input/input.css";


export function Input({ className="", type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={`input-base ${className}`}
      {...props}
    />
  );
}
