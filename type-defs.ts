type WizardConfig = {
  id: string; // Unique tab ID
  title: string; // Tab title
  columns: string[]; // Table columns
  formFields: FormFieldConfig[]; // Fields for the modal form
};

type FormFieldConfig = {
  id: string; // Unique field ID
  label: string; // Field label
  type: 'text' | 'number' | 'select'; // Field type
  options?: string[]; // For select dropdowns
  validation?: (value: any) => string | null; // Validation function
};
