import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

function Results() {

  // Table headings
  const columns = ["Student", "Quiz", "Score", "Status", "Action"];

  // Dummy Results
  const [results, setResults] = useLocalStorage("results", [
    {
      id: 1,
      student: "Kriti",
      quiz: "Java Basics",
      score: 18,
      status: "Pass",
    },
  ]);

  // Search value
  const [search, setSearch] = useState("");

  // Delete Result
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Do you want to delete this result?"
    );

    if (!confirmDelete) return;

    setResults(results.filter((result) => result.id !== id));

  };

  // Search Results
  const filteredResults = results.filter((result) =>
    result.student
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <PageHeader
        title="Results"
        buttonTitle="Export Results"
        onClick={() => alert("Export feature will be added later")}
      />

      <br />

      <Input
        type="text"
        placeholder="Search Student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <Table columns={columns}>

        {filteredResults.length > 0 ? (

          filteredResults.map((result) => (

            <tr key={result.id}>

              <td>{result.student}</td>

              <td>{result.quiz}</td>

              <td>{result.score}</td>

              <td>{result.status}</td>

              <td>

                <Button
                  title="Delete"
                  onClick={() => handleDelete(result.id)}
                />

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="5">
              No Results Found
            </td>

          </tr>

        )}

      </Table>

    </div>
  );
}

export default Results;