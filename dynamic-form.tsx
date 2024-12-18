type DynamicFormProps = {
  fields: FormFieldConfig[];
  data: RowData;
  onSubmit: (data: RowData) => void;
};

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields, data, onSubmit }) => {
  const [formData, setFormData] = useState<RowData>(data);

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleValidation = () => {
    for (const field of fields) {
      if (field.validation) {
        const error = field.validation(formData[field.id]);
        if (error) {
          alert(error);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      {fields.map((field) => (
        <div key={field.id}>
          <label>{field.label}</label>
          {field.type === 'select' ? (
            <select value={formData[field.id] || ''} onChange={(e) => handleChange(field.id, e.target.value)}>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={formData[field.id] || ''}
              onChange={(e) => handleChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value)}
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};
