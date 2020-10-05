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

  const records = useRecords(table);

  const tasks =
    records && completedField
      ? records.map((record) => {
          return (
            <Task
              key={record.id}
              record={record}
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
};

function Task({ record, completedFieldId }: TaskProps) {
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
      {record.getCellValue(completedFieldId) ? <s>{label}</s> : label}
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
