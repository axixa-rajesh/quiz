import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Quizzes from "./pages/Quizzes";
import Subjects from "./pages/Subjects";
import Topics from "./pages/Topics";
import Users from "./pages/Users";
import QuestionBank from "./pages/QuestionBank";
import Results from "./pages/Results";
import Reports from "./pages/Reports";
import Attempt from "./pages/Attempt";
import QuestionBankPage from "./pages/QuestionBankPage";
import QuizFormats from "./pages/QuizFormats";
import Settings from "./pages/Settings";
import './App.css';

function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ flex: 1, backgroundColor: "#f9fafb" }}>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="quiz-formats" element={<QuizFormats />} />
            <Route path="topics" element={<Topics />} />
            <Route path="questions" element={<QuestionBank />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="results" element={<Results />} />
            <Route path="reports" element={<Reports />} />
            <Route path="attempt" element={<Attempt />} />
            <Route path="question-bank" element={<QuestionBankPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;