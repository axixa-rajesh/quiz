function Modal({
  isOpen,
  title,
  children,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">

      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">

          <h2 className="text-xl font-semibold text-slate-800">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-500 transition-all duration-300 hover:bg-red-100 hover:text-red-600"
          >
            ×
          </button>

        </div>

        {/* Body */}

        <div className="space-y-4 px-6 py-6">

          {children}

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default Modal;