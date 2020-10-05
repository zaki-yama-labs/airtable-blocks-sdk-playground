import {
  initializeBlock,
  useBase,
  useRecords,
  expandRecord,
  TextButton,
  useGlobalConfig,
  TablePickerSynced,
  FieldPickerSynced,
} from "@airtable/blocks/ui";
import React from "react";
import Record from "@airtable/blocks/dist/types/src/models/record";

function TodoApp() {
  const base = useBase();

  const globalConfig = useGlobalConfig();
  const tableId = globalConfig.get("selectedTableId") as string;
  const completedFieldId = globalConfig.get("completedFieldId") as string;

  const table = base.getTableByIdIfExists(tableId);
  const completedField = table
    ? table.getFieldByIdIfExists(completedFieldId)
    : null;

  const toggle = (record: Record) => {
    table.updateRecordAsync(record, {
      [completedFieldId]: !record.getCellValue(completedFieldId),
    });
  };

  const records = useRecords(table);

  const tasks =
    records && completedField
      ? records.map((record) => {
          return (
            <Task
              key={record.id}
              record={record}
              onToggle={toggle}
              completedFieldId={completedFieldId}
            />
          );
        })
      : null;
  return (
    <div>
      <TablePickerSynced globalConfigKey="selectedTableId" />
      <FieldPickerSynced table={table} globalConfigKey="completedFieldId" />
      {tasks}
    </div>
  );
}

type TaskProps = {
  record: Record;
  completedFieldId: string;
  onToggle: (record: Record) => void;
};

function Task({ record, completedFieldId, onToggle }: TaskProps) {
  const label = record.name || "Unnamed record";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 18,
        padding: 12,
        borderBottom: "1px solid #ddd",
      }}
    >
      <TextButton
        variant="dark"
        size="xlarge"
        onClick={() => {
          onToggle(record);
        }}
      >
        {record.getCellValue(completedFieldId) ? <s>{label}</s> : label}
      </TextButton>
      <TextButton
        icon="expand"
        aria-label="Expand record"
        variant="dark"
        onClick={() => {
          expandRecord(record);
        }}
      />
    </div>
  );
}

initializeBlock(() => <TodoApp />);
