const CustomSummary: React.FC<{ message: string }> = ({ message }) => (
  <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>{message}</div>
);

const wizardConfig: WizardConfig[] = [
  {
    id: 'step1',
    title: 'Step 1',
    columns: ['name', 'age'],
    formFields: [
      { id: 'name', label: 'Name', type: 'text', validation: (val) => (!val ? 'Name is required' : null) },
      { id: 'age', label: 'Age', type: 'number', validation: (val) => (val <= 0 ? 'Age must be positive' : null) },
    ],
    components: [
      {
        id: 'summary',
        component: CustomSummary,
        props: { message: 'This is a summary component for Step 1' },
        order: 1,
      },
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
    components: [
      {
        id: 'summary',
        component: CustomSummary,
        props: { message: 'This is a summary component for Step 2' },
        order: 1,
      },
    ],
  },
];

const App: React.FC = () => {
  const handleSave = (data: Record<string, RowData[]>) => {
    console.log('Final Data:', data);
  };

  return <Wizard config={wizardConfig} onSave={handleSave} />;
};
