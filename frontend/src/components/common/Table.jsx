function Table({ columns, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          {/* Table Header */}

          <thead className="bg-teal-500">

            <tr>

              {columns.map((column) => (

                <th
                  key={column}
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-white"
                >
                  {column}
                </th>

              ))}

            </tr>

          </thead>

          {/* Table Body */}

          <tbody className="divide-y divide-slate-200 bg-white">

            {children}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Table;