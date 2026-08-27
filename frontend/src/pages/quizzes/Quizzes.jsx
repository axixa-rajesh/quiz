import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

function Quizzes() {

  // Table headings
  const columns = ["ID", "Quiz Name", "Subject", "Action"];

  // Quiz data LocalStorage me save hoga
  const [quizzes, setQuizzes] = useLocalStorage("quizzes", [
    {
      id: 1,
      quizName: "Java Basics",
      subject: "Java",
    },
  ]);

  // Search input
  const [search, setSearch] = useState("");

  // Modal open/close
  const [isOpen, setIsOpen] = useState(false);

  // Form inputs
  const [quizName, setQuizName] = useState("");
  const [subject, setSubject] = useState("");

  // Current editing quiz
  const [editingQuiz, setEditingQuiz] = useState(null);

  // Open Add Quiz Modal
  const openModal = () => {

    setEditingQuiz(null);
    setQuizName("");
    setSubject("");
    setIsOpen(true);

  };

  // Save or Update Quiz
  const handleSave = () => {

    if (!quizName.trim() || !subject.trim()) {

      alert("Please fill all fields");

      return;

    }

    // Edit Quiz
    if (editingQuiz) {

      const updatedQuizzes = quizzes.map((quiz) =>
        quiz.id === editingQuiz.id
          ? {
              ...quiz,
              quizName,
              subject,
            }
          : quiz
      );

      setQuizzes(updatedQuizzes);

    }

    // Add Quiz
    else {

      const newQuiz = {

        id: Date.now(),

        quizName,

        subject,

      };

      setQuizzes([...quizzes, newQuiz]);

    }

    // Reset form
    setQuizName("");
    setSubject("");
    setEditingQuiz(null);
    setIsOpen(false);

  };

  // Edit Quiz
  const handleEdit = (quiz) => {

    setEditingQuiz(quiz);
    setQuizName(quiz.quizName);
    setSubject(quiz.subject);
    setIsOpen(true);

  };

  // Delete Quiz
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Do you want to delete this quiz?"
    );

    if (!confirmDelete) return;

    const updatedQuizzes = quizzes.filter(
      (quiz) => quiz.id !== id
    );

    setQuizzes(updatedQuizzes);

  };

  // Search Quiz
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.quizName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <PageHeader
        title="Quizzes"
        buttonTitle="Create Quiz"
        onClick={openModal}
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

              <td>{quiz.id}</td>

              <td>{quiz.quizName}</td>

              <td>{quiz.subject}</td>

              <td>

                <Button
                  title="Edit"
                  onClick={() => handleEdit(quiz)}
                />

                {" "}

                <Button
                  title="Delete"
                  onClick={() => handleDelete(quiz.id)}
                />

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="4">

              No Quizzes Found

            </td>

          </tr>

        )}

      </Table>

      <Modal
        isOpen={isOpen}
        title={editingQuiz ? "Edit Quiz" : "Create Quiz"}
        onClose={() => setIsOpen(false)}
      >

        <Input
          type="text"
          placeholder="Enter Quiz Name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />

        <br />
        <br />

        <Input
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <br />
        <br />

        <Button
          title={editingQuiz ? "Update Quiz" : "Save Quiz"}
          onClick={handleSave}
        />

      </Modal>

    </div>
  );
}

export default Quizzes;