// App Router
import { Routes , Route  , Navigate} from "react-router-dom";

// Pages
import Login from "../pages/login/Login.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Users from "../pages/users/Users.jsx";
import Subjects from "../pages/subjects/Subjects.jsx";
import Topics from "../pages/topics/Topics.jsx";
import QuestionBank from "../pages/questionBank/QuestionBank.jsx";
import QuizFormats from "../pages/quizFormats/QuizFormats.jsx";
import Quizzes from "../pages/quizzes/Quizzes.jsx";
import Attempt from "../pages/attempt/Attempt.jsx";
import Results from "../pages/results/Results.jsx";
import Reports from "../pages/reports/Reports.jsx";
function AppRoutes(){
    return(
<Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/users" element={<Users />}/>
    <Route path="/subjects" element={<Subjects />} />
    <Route path="/topics" element ={<Topics />} />
    <Route path="/question-bank" element={<QuestionBank />}/>
    <Route path="/quiz-formats" element={ <QuizFormats/>} />
    <Route path="/quizzes" element={<Quizzes/>}/>
    <Route path="/attempt" element={<Attempt />} />
    <Route path="/results" element={<Results />} />
    <Route path="/reports" element={<Reports />} />
</Routes>
    )
}
export default AppRoutes;