import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

function Attempt() {

  // Table Headings
  const columns = ["Quiz Name", "Subject", "Action"];

  // Quiz List LocalStorage se aayegi
  const [quizzes] = useLocalStorage("quizzes", [
    {
      id: 1,
      quizName: "Java Basics",
      subject: "Java",
    },
  ]);

  // Search Input
  const [search, setSearch] = useState("");

  // Search Quiz
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.quizName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Quiz Start
  const handleStartQuiz = (quiz) => {

    alert(`Quiz Started : ${quiz.quizName}`);

  };

  return (
    <div>

      <PageHeader
        title="Attempt Quiz"
      />

      <br />

      <Input
        type="text"
        placeholder="Search Quiz"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <Table columns={columns}>

        {filteredQuizzes.length > 0 ? (

          filteredQuizzes.map((quiz) => (

            <tr key={quiz.id}>

              <td>{quiz.quizName}</td>

              <td>{quiz.subject}</td>

              <td>

                <Button
                  title="Start Quiz"
                  onClick={() => handleStartQuiz(quiz)}
                />

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="3">

              No Quiz Available

            </td>

          </tr>

        )}

      </Table>

    </div>
  );
}

export default Attempt;