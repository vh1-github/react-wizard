type WizardState = {
  activeTab: string;
  data: Record<string, RowData[]>;
  modal: {
    isOpen: boolean;
    editingRow: RowData | null;
  };
};
