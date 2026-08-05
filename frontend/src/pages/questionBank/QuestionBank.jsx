import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

function QuestionBank() {

  // Table headings
  const columns = [
    "ID",
    "Question",
    "Subject",
    "Topic",
    "Action",
  ];

  // Questions LocalStorage me save hongi
  const [questions, setQuestions] = useLocalStorage("questions", [
    {
      id: 1,
      question: "What is Java?",
      subject: "Java",
      topic: "Introduction",
    },
  ]);

  // Search input
  const [search, setSearch] = useState("");

  // Modal open / close
  const [isOpen, setIsOpen] = useState(false);

  // Form inputs
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  // Current editing question
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Open Modal
  const openModal = () => {

    setEditingQuestion(null);
    setQuestion("");
    setSubject("");
    setTopic("");
    setIsOpen(true);

  };

  // Save or Update Question
  const handleSave = () => {

    if (
      !question.trim() ||
      !subject.trim() ||
      !topic.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    // Edit Mode
    if (editingQuestion) {

      const updatedQuestions = questions.map((item) =>
        item.id === editingQuestion.id
          ? {
              ...item,
              question,
              subject,
              topic,
            }
          : item
      );

      setQuestions(updatedQuestions);

    }

    // Add Mode
    else {

      const newQuestion = {

        id: Date.now(),

        question,

        subject,

        topic,

      };

      setQuestions([...questions, newQuestion]);

    }

    // Reset Form
    setQuestion("");
    setSubject("");
    setTopic("");
    setEditingQuestion(null);
    setIsOpen(false);

  };

  // Edit Question
  const handleEdit = (item) => {

    setEditingQuestion(item);

    setQuestion(item.question);

    setSubject(item.subject);

    setTopic(item.topic);

    setIsOpen(true);

  };

  // Delete Question
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Do you want to delete this question?"
    );

    if (!confirmDelete) return;

    const updatedQuestions = questions.filter(
      (item) => item.id !== id
    );

    setQuestions(updatedQuestions);

  };

  // Search Questions
  const filteredQuestions = questions.filter((item) =>
    item.question
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <PageHeader
        title="Question Bank"
        buttonTitle="Add Question"
        onClick={openModal}
      />

      <br />

      <Input
        type="text"
        placeholder="Search Question"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <Table columns={columns}>

        {filteredQuestions.length > 0 ? (

          filteredQuestions.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.question}</td>

              <td>{item.subject}</td>

              <td>{item.topic}</td>

              <td>

                <Button
                  title="Edit"
                  onClick={() => handleEdit(item)}
                />

                {" "}

                <Button
                  title="Delete"
                  onClick={() => handleDelete(item.id)}
                />

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="5">

              No Questions Found

            </td>

          </tr>

        )}

      </Table>

      <Modal
        isOpen={isOpen}
        title={
          editingQuestion
            ? "Edit Question"
            : "Add Question"
        }
        onClose={() => setIsOpen(false)}
      >

        <Input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
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

        <Input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <br />
        <br />

        <Button
          title={
            editingQuestion
              ? "Update Question"
              : "Save Question"
          }
          onClick={handleSave}
        />

      </Modal>

    </div>
  );
}

export default QuestionBank;