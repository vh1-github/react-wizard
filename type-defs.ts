type WizardConfig = {
  id: string; // Unique tab ID
  title: string; // Tab title
  columns: string[]; // Table columns
  formFields: FormFieldConfig[]; // Fields for the modal form
  components?: ComponentConfig[]; // Custom components for the tab
};

type ComponentConfig = {
  id: string; // Unique ID for the component
  component: React.FC<any>; // React component
  props?: Record<string, any>; // Props to pass to the component
  order: number; // Order in which the component appears
};

type FormFieldConfig = {
  id: string; // Unique field ID
  label: string; // Field label
  type: 'text' | 'number' | 'select'; // Field type
  options?: string[]; // For select dropdowns
  validation?: (value: any) => string | null; // Validation function
};
