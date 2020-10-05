Airtable Blocks SDK Playground
==============================

## 用語
- Base
  - Airtable 上の1つのアプリ (複数のテーブルをタブととして保持できる)


## [To-do list tutorial](https://airtable.com/developers/apps/guides/to-do-list-tutorial)

- `useBase()`, `useRecords(table)`
- `useGlobalConfig()`, `globalConfig.get/set()`
  - global config の利用と読み書き
- UI コンポーネント
  - `TextButton`
  - `TablePicker` と `TablePickerSynced` コンポーネント
    - `Synced` は global config とセットで使う前提の I/F
- devtools
  - global config の値見れる
  - 権限をシミュレートできる
