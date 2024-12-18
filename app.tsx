const wizardConfig: WizardConfig[] = [
  {
    id: 'step1',
    title: 'Step 1',
    columns: ['name', 'age'],
    formFields: [
      { id: 'name', label: 'Name', type: 'text', validation: (val) => (!val ? 'Name is required' : null) },
      { id: 'age', label: 'Age', type: 'number', validation: (val) => (val <= 0 ? 'Age must be positive' : null) },
    ],
  },
  {
    id: 'step2',
    title: 'Step 2',
    columns: ['address', 'city'],
    formFields: [
      { id: 'address', label: 'Address', type: 'text' },
      { id: 'city', label: 'City', type: 'text' },
    ],
  },
];

const App: React.FC = () => {
  const handleSave = (data: Record<string, RowData[]>) => {
    console.log('Final Data:', data);
  };

  return <Wizard config={wizardConfig} onSave={handleSave} />;
};
