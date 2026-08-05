import { Search, Bell, ChevronDown } from "lucide-react";
//import ThemeToggle from "../common/ThemeToggle";

function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back, Admin 👋
        </p>
      </div>


      {/* Right */}
      <div className="flex items-center gap-5">

       


        {/* Search */}
        <div className="relative hidden md:block">

          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="h-11 w-80 rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
          />

        </div>


        {/* Notification */}
        <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-md">

          <Bell
            size={20}
            className="text-slate-600"
          />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>


        {/* Profile */}
        <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-500 text-lg font-bold text-white">
            A
          </div>

          <div className="text-left">

            <h3 className="text-sm font-semibold text-slate-800">
              Admin
            </h3>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-slate-400"
          />

        </button>

      </div>

    </header>
  );
}

export default Navbar;