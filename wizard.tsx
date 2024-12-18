import React, { useState } from 'react';

type WizardProps = {
  config: WizardConfig[];
  onSave: (data: Record<string, RowData[]>) => void;
};

export const Wizard: React.FC<WizardProps> = ({ config, onSave }) => {
  const [state, setState] = useState<WizardState>({
    activeTab: config[0].id,
    data: Object.fromEntries(config.map((tab) => [tab.id, []])),
    modal: { isOpen: false, editingRow: null },
  });

  const activeConfig = config.find((tab) => tab.id === state.activeTab)!;

  const handleAddRow = () => setState((prev) => ({ ...prev, modal: { isOpen: true, editingRow: null } }));
  const handleEditRow = (row: RowData) =>
    setState((prev) => ({ ...prev, modal: { isOpen: true, editingRow: row } }));
  const handleDeleteRow = (rowId: string) =>
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [state.activeTab]: prev.data[state.activeTab].filter((row) => row.id !== rowId),
      },
    }));

  const handleSaveRow = (row: RowData) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [state.activeTab]: prev.modal.editingRow
          ? prev.data[state.activeTab].map((r) => (r.id === row.id ? row : r))
          : [...prev.data[state.activeTab], { ...row, id: Date.now().toString() }],
      },
      modal: { isOpen: false, editingRow: null },
    }));
  };

  const handleTabChange = (tabId: string) => setState((prev) => ({ ...prev, activeTab: tabId }));
  const handleFinish = () => onSave(state.data);

  return (
    <div>
      {/* Tabs */}
      <div className="tab-header">
        {config.map((tab) => (
          <button
            key={tab.id}
            className={state.activeTab === tab.id ? 'active' : ''}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Table */}
      <Table
        rows={state.data[state.activeTab]}
        columns={activeConfig.columns}
        onEdit={handleEditRow}
        onDelete={handleDeleteRow}
      />
      <button onClick={handleAddRow}>Add Row</button>

      {/* Modal */}
      <Modal isOpen={state.modal.isOpen} onClose={() => setState((prev) => ({ ...prev, modal: { isOpen: false, editingRow: null } }))}>
        <DynamicForm
          fields={activeConfig.formFields}
          data={state.modal.editingRow || {}}
          onSubmit={handleSaveRow}
        />
      </Modal>

      {/* Finish Button */}
      {state.activeTab === config[config.length - 1].id && (
        <button onClick={handleFinish}>Finish</button>
      )}
    </div>
  );
};
