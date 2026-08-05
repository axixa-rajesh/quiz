import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

function Topics() {

  // Table headings
  const columns = ["ID", "Topic Name", "Subject", "Action"];

  // Topics data LocalStorage me save hoga
  const [topics, setTopics] = useLocalStorage("topics", [
    {
      id: 1,
      topicName: "Variables",
      subject: "Java",
    },
  ]);

  // Search input
  const [search, setSearch] = useState("");

  // Modal open/close
  const [isOpen, setIsOpen] = useState(false);

  // Form inputs
  const [topicName, setTopicName] = useState("");
  const [subject, setSubject] = useState("");

  // Current editing topic
  const [editingTopic, setEditingTopic] = useState(null);

  // Add Topic button
  const openModal = () => {

    setEditingTopic(null);
    setTopicName("");
    setSubject("");
    setIsOpen(true);

  };

  // Save or Update Topic
  const handleSave = () => {

    if (!topicName.trim() || !subject.trim()) {
      alert("Please fill all fields");
      return;
    }

    // Edit Mode
    if (editingTopic) {

      const updatedTopics = topics.map((topic) =>
        topic.id === editingTopic.id
          ? {
              ...topic,
              topicName,
              subject,
            }
          : topic
      );

      setTopics(updatedTopics);

    }

    // Add Mode
    else {

      const newTopic = {
        id: Date.now(),
        topicName,
        subject,
      };

      setTopics([...topics, newTopic]);

    }

    // Reset Form
    setTopicName("");
    setSubject("");
    setEditingTopic(null);
    setIsOpen(false);

  };

  // Edit Topic
  const handleEdit = (topic) => {

    setEditingTopic(topic);
    setTopicName(topic.topicName);
    setSubject(topic.subject);
    setIsOpen(true);

  };

  // Delete Topic
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Do you want to delete this topic?"
    );

    if (!confirmDelete) return;

    const updatedTopics = topics.filter(
      (topic) => topic.id !== id
    );

    setTopics(updatedTopics);

  };

  // Search Topics
  const filteredTopics = topics.filter((topic) =>
    topic.topicName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <PageHeader
        title="Topics"
        buttonTitle="Add Topic"
        onClick={openModal}
      />

      <br />

      <Input
        type="text"
        placeholder="Search Topic"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <Table columns={columns}>

        {filteredTopics.length > 0 ? (

          filteredTopics.map((topic) => (

            <tr key={topic.id}>

              <td>{topic.id}</td>

              <td>{topic.topicName}</td>

              <td>{topic.subject}</td>

              <td>

                <Button
                  title="Edit"
                  onClick={() => handleEdit(topic)}
                />

                {" "}

                <Button
                  title="Delete"
                  onClick={() => handleDelete(topic.id)}
                />

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="4">
              No Topics Found
            </td>

          </tr>

        )}

      </Table>

      <Modal
        isOpen={isOpen}
        title={editingTopic ? "Edit Topic" : "Add Topic"}
        onClose={() => setIsOpen(false)}
      >

        <Input
          type="text"
          placeholder="Enter Topic Name"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
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
          title={editingTopic ? "Update Topic" : "Save Topic"}
          onClick={handleSave}
        />

      </Modal>

    </div>
  );
}

export default Topics;