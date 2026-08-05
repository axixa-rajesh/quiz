import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

function Subjects() {

  // Table headings
  const columns = ["ID", "Subject Name", "Action"];

  // Subject data LocalStorage me save hoga
  const [subjects, setSubjects] = useLocalStorage("subjects", [
    {
      id: 1,
      subjectName: "JAVA",
    },
  ]);

  // Search input ki value
  const [search, setSearch] = useState("");

  // Modal open/close
  const [isOpen, setIsOpen] = useState(false);

  // Subject input value
  const [subjectName, setSubjectName] = useState("");

  // Edit karne wala subject store hoga
  const [editingSubject, setEditingSubject] = useState(null);

  // Add Subject button click hone par modal open hoga
  const openModal = () => {
    setEditingSubject(null);
    setSubjectName("");
    setIsOpen(true);
  };

  // Subject save ya update karega
  const handleSave = () => {

    // Empty subject allow nahi karna
    if (!subjectName.trim()) {
      alert("Please Enter Subject Name");
      return;
    }

    // Edit Mode
    if (editingSubject) {

      const updatedSubjects = subjects.map((subject) =>
        subject.id === editingSubject.id
          ? {
              ...subject,
              subjectName,
            }
          : subject
      );

      setSubjects(updatedSubjects);
    }

    // Add Mode
    else {

      const newSubject = {
        id: Date.now(),
        subjectName,
      };

      setSubjects([...subjects, newSubject]);
    }

    // Form reset
    setSubjectName("");
    setEditingSubject(null);
    setIsOpen(false);
  };

  // Edit button click
  const handleEdit = (subject) => {

    // Current subject save karo
    setEditingSubject(subject);

    // Input me existing value dikhao
    setSubjectName(subject.subjectName);

    // Modal open karo
    setIsOpen(true);
  };

  // Delete Subject
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Do you want to delete this subject?"
    );

    if (!confirmDelete) return;

    const updatedSubjects = subjects.filter(
      (subject) => subject.id !== id
    );

    setSubjects(updatedSubjects);
  };

  // Search ke according subject filter honge
  const filteredSubjects = subjects.filter((subject) =>
    subject.subjectName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <PageHeader
        title="Subjects"
        buttonTitle="Add Subject"
        onClick={openModal}
      />

      <br />

      <Input
        type="text"
        placeholder="Search Subject"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <Table columns={columns}>

        {filteredSubjects.length > 0 ? (

          filteredSubjects.map((subject) => (

            <tr key={subject.id}>

              <td>{subject.id}</td>

              <td>{subject.subjectName}</td>

              <td>

                <Button
                  title="Edit"
                  onClick={() => handleEdit(subject)}
                />

                {" "}

                <Button
                  title="Delete"
                  onClick={() => handleDelete(subject.id)}
                />

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="3">
              No Subjects Found
            </td>

          </tr>

        )}

      </Table>

      <Modal
        isOpen={isOpen}
        title={editingSubject ? "Edit Subject" : "Add Subject"}
        onClose={() => setIsOpen(false)}
      >

        <Input
          type="text"
          placeholder="Enter Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />

        <br />
        <br />

        <Button
          title={editingSubject ? "Update Subject" : "Save Subject"}
          onClick={handleSave}
        />

      </Modal>

    </div>
  );
}

export default Subjects;