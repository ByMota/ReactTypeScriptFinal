import React, { CSSProperties } from "react";

const generalStyle: CSSProperties = { 
  fontSize: '1rem',
  color: "var(--color-2)",
  padding: "var(--gap-s) .75rem",
  backgroundColor: "var(--color-4)",
  borderRadius: "var(--gap)"
}

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "var(--gap-s)",
  fontWeight: "600",
  ...generalStyle
}

const inputStyle: CSSProperties = {
  border: "none",
  fontFamily: "monospace",
  ...generalStyle
}

interface IDateInput extends React.ComponentProps<'input'> {
  label: string
}

function DateInput({label, ...props}: IDateInput) {
  return ( 
  <div>
    <label style={labelStyle} htmlFor={label}>{label}</label>
      <input style={inputStyle} type="date" name={label} id={label} {...props} />
  </div> 
);}

export default DateInput;