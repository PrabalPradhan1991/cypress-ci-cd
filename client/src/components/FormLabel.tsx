import React from "react";

export const FormLabel: React.FC<{ label: string }> = ({ label, children }) => {
  return (
    <label htmlFor='placeholder'>
      {label}
      {children}
    </label>
  );
};
