import useLocalStorage from "../../hooks/useLocalStorage";
import PageHeader from "../../components/common/PageHeader";

function Dashboard() {

  // LocalStorage se data read hoga

  const [users] = useLocalStorage("users", []);

  const [subjects] = useLocalStorage("subjects", []);

  const [topics] = useLocalStorage("topics", []);

  const [questions] = useLocalStorage("questions", []);

  const [quizzes] = useLocalStorage("quizzes", []);

  const [results] = useLocalStorage("results", []);

  return (
    <div>

      <PageHeader title="Dashboard" />

      <div className="mb-8 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 p-8 text-white shadow-lg">

  <h2 className="text-3xl font-bold">
    👋 Welcome Back, Admin
  </h2>

  <p className="mt-2 text-teal-100">
    Manage users, quizzes, questions and reports from one place.
  </p>

</div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <h3 className="text-lg font-semibold">
            Total Users
          </h3>

          <p className="mt-4 text-3xl font-bold text-blue-600">
            {users.length}
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Total Subjects
          </h3>

          <p className="mt-4 text-3xl font-bold text-green-600">
            {subjects.length}
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Total Topics
          </h3>

          <p className="mt-4 text-3xl font-bold text-orange-500">
            {topics.length}
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Total Questions
          </h3>

          <p className="mt-4 text-3xl font-bold text-purple-600">
            {questions.length}
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Total Quizzes
          </h3>

          <p className="mt-4 text-3xl font-bold text-pink-600">
            {quizzes.length}
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Total Results
          </h3>

          <p className="mt-4 text-3xl font-bold text-red-600">
            {results.length}
          </p>

        </div>

      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

  {/* Quick Actions */}

  <div className="rounded-2xl bg-white p-6 shadow-sm">

    <h2 className="mb-5 text-xl font-bold text-slate-800">
      Quick Actions
    </h2>

    <div className="grid grid-cols-2 gap-4">

      <button className="rounded-xl bg-teal-500 p-4 text-white transition hover:bg-teal-600">
        + Add User
      </button>

      <button className="rounded-xl bg-blue-500 p-4 text-white transition hover:bg-blue-600">
        + Add Subject
      </button>

      <button className="rounded-xl bg-purple-500 p-4 text-white transition hover:bg-purple-600">
        + Add Question
      </button>

      <button className="rounded-xl bg-orange-500 p-4 text-white transition hover:bg-orange-600">
        + Create Quiz
      </button>

    </div>

  </div>

  {/* Recent Activity */}

  <div className="rounded-2xl bg-white p-6 shadow-sm">

    <h2 className="mb-5 text-xl font-bold text-slate-800">
      Recent Activity
    </h2>

    <div className="space-y-4">

      <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

        <div>

          <h3 className="font-semibold text-slate-700">
            User Added
          </h3>

          <p className="text-sm text-slate-500">
            New Admin user created.
          </p>

        </div>

        <span className="text-xs text-slate-400">
          Today
        </span>

      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

        <div>

          <h3 className="font-semibold text-slate-700">
            Subject Created
          </h3>

          <p className="text-sm text-slate-500">
            Java subject added.
          </p>

        </div>

        <span className="text-xs text-slate-400">
          Today
        </span>

      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

        <div>

          <h3 className="font-semibold text-slate-700">
            Quiz Created
          </h3>

          <p className="text-sm text-slate-500">
            Java Basics Quiz created.
          </p>

        </div>

        <span className="text-xs text-slate-400">
          Yesterday
        </span>

      </div>

    </div>

  </div>

</div>

    </div>
  );
}

export default Dashboard;