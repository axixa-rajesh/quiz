import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  FileQuestion,
  ClipboardList,
  FileText,
  PenSquare,
  BarChart3,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { title: "Users", path: "/users", icon: <Users size={20} /> },
    { title: "Subjects", path: "/subjects", icon: <BookOpen size={20} /> },
    { title: "Topics", path: "/topics", icon: <Layers size={20} /> },
    { title: "Question Bank", path: "/question-bank", icon: <FileQuestion size={20} /> },
    { title: "Quiz Formats", path: "/quiz-formats", icon: <ClipboardList size={20} /> },
    { title: "Quizzes", path: "/quizzes", icon: <FileText size={20} /> },
    { title: "Attempt", path: "/attempt", icon: <PenSquare size={20} /> },
    { title: "Results", path: "/results", icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-sm">

      {/* Logo */}

      <div className="border-b border-slate-200 p-6">

        <h1 className="text-2xl font-bold text-teal-600">
          Quiz Application
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Admin Dashboard
        </p>

      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <ul className="space-y-2">

          {menuItems.map((item) => (

            <li key={item.path}>

              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-teal-500 text-white shadow-md"
                      : "text-slate-600 hover:bg-teal-50 hover:text-teal-600"
                  }`
                }
              >
                {item.icon}

                <span>{item.title}</span>

              </NavLink>

            </li>

          ))}

        </ul>

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-200 p-5">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;