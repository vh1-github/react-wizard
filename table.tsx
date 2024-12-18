type TableProps = {
  rows: RowData[];
  columns: string[];
  onEdit: (row: RowData) => void;
  onDelete: (id: string) => void;
};

export const Table: React.FC<TableProps> = ({ rows, columns, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col}>{col}</th>
        ))}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          {columns.map((col) => (
            <td key={col}>{row[col]}</td>
          ))}
          <td>
            <button onClick={() => onEdit(row)}>Edit</button>
            <button onClick={() => onDelete(row.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
