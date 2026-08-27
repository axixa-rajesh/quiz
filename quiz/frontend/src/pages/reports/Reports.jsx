import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

function Reports() {

  // Table headings
  const columns = ["Report Name", "Date", "Download"];

  // Dummy Reports
  const [reports] = useLocalStorage("reports", [
    {
      id: 1,
      reportName: "Student Result Report",
      date: "05-08-2026",
    },
    {
      id: 2,
      reportName: "Quiz Performance Report",
      date: "04-08-2026",
    },
  ]);

  // Search value
  const [search, setSearch] = useState("");

  // Search reports
  const filteredReports = reports.filter((report) =>
    report.reportName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Download Report
  const handleDownload = (report) => {

    alert(`${report.reportName} Download Started`);

  };

  return (
    <div>

      <PageHeader
        title="Reports"
        buttonTitle="Generate Report"
        onClick={() =>
          alert("Generate Report API will be connected later")
        }
      />

      <br />

      <Input
        type="text"
        placeholder="Search Report"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <Table columns={columns}>

        {filteredReports.length > 0 ? (

          filteredReports.map((report) => (

            <tr key={report.id}>

              <td>{report.reportName}</td>

              <td>{report.date}</td>

              <td>

                <Button
                  title="Download"
                  onClick={() => handleDownload(report)}
                />

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="3">

              No Reports Available

            </td>

          </tr>

        )}

      </Table>

    </div>
  );
}

export default Reports;