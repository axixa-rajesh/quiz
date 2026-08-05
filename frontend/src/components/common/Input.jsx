function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  disabled = false,
  required = false,
  className = "",
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      required={required}
      className={`
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-sm
        text-slate-700
        placeholder:text-slate-400
        shadow-sm
        outline-none
        transition-all
        duration-300
        focus:border-teal-500
        focus:ring-4
        focus:ring-teal-100
        disabled:cursor-not-allowed
        disabled:bg-slate-100
        disabled:text-slate-400
        ${className}
      `}
    />
  );
}

export default Input;