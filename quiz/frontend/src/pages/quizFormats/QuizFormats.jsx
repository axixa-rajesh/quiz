import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

function QuizFormats() {

  // Table headings
  const columns = ["ID", "Format Name", "Duration", "Action"];

  // Quiz Format Data
  const [formats, setFormats] = useLocalStorage("quizFormats", [
    {
      id: 1,
      formatName: "Practice Test",
      duration: "30 Minutes",
    },
  ]);

  // Search Input
  const [search, setSearch] = useState("");

  // Modal Open / Close
  const [isOpen, setIsOpen] = useState(false);

  // Form Inputs
  const [formatName, setFormatName] = useState("");
  const [duration, setDuration] = useState("");

  // Current Editing Format
  const [editingFormat, setEditingFormat] = useState(null);

  // Open Modal
  const openModal = () => {

    setEditingFormat(null);
    setFormatName("");
    setDuration("");
    setIsOpen(true);

  };

  // Save / Update Format
  const handleSave = () => {

    if (!formatName.trim() || !duration.trim()) {

      alert("Please fill all fields");

      return;

    }

    // Edit Mode
    if (editingFormat) {

      const updatedFormats = formats.map((format) =>
        format.id === editingFormat.id
          ? {
              ...format,
              formatName,
              duration,
            }
          : format
      );

      setFormats(updatedFormats);

    }

    // Add Mode
    else {

      const newFormat = {

        id: Date.now(),

        formatName,

        duration,

      };

      setFormats([...formats, newFormat]);

    }

    // Reset Form
    setFormatName("");
    setDuration("");
    setEditingFormat(null);
    setIsOpen(false);

  };

  // Edit Format
  const handleEdit = (format) => {

    setEditingFormat(format);
    setFormatName(format.formatName);
    setDuration(format.duration);
    setIsOpen(true);

  };

  // Delete Format
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Do you want to delete this format?"
    );

    if (!confirmDelete) return;

    const updatedFormats = formats.filter(
      (format) => format.id !== id
    );

    setFormats(updatedFormats);

  };

  // Search Formats
  const filteredFormats = formats.filter((format) =>
    format.formatName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <PageHeader
        title="Quiz Formats"
        buttonTitle="Add Format"
        onClick={openModal}
      />

      <br />

      <Input
        type="text"
        placeholder="Search Format"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <Table columns={columns}>

        {filteredFormats.length > 0 ? (

          filteredFormats.map((format) => (

            <tr key={format.id}>

              <td>{format.id}</td>

              <td>{format.formatName}</td>

              <td>{format.duration}</td>

              <td>

                <Button
                  title="Edit"
                  onClick={() => handleEdit(format)}
                />

                {" "}

                <Button
                  title="Delete"
                  onClick={() => handleDelete(format.id)}
                />

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="4">

              No Formats Found

            </td>

          </tr>

        )}

      </Table>

      <Modal
        isOpen={isOpen}
        title={editingFormat ? "Edit Format" : "Add Format"}
        onClose={() => setIsOpen(false)}
      >

        <Input
          type="text"
          placeholder="Enter Format Name"
          value={formatName}
          onChange={(e) => setFormatName(e.target.value)}
        />

        <br />
        <br />

        <Input
          type="text"
          placeholder="Enter Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <br />
        <br />

        <Button
          title={editingFormat ? "Update Format" : "Save Format"}
          onClick={handleSave}
        />

      </Modal>

    </div>
  );
}

export default QuizFormats;