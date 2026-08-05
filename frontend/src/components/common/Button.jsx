function Button({
  title,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        bg-teal-500
        px-5
        py-2.5
        text-sm
        font-semibold
        text-white
        shadow-md
        transition-all
        duration-300
        hover:bg-teal-600
        hover:shadow-xl
        active:scale-95
        disabled:cursor-not-allowed
        disabled:bg-slate-400
        disabled:shadow-none
        ${className}
      `}
    >
      {title}
    </button>
  );
}

export default Button;