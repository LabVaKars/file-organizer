export interface TableRoot {
    table: TableProps
}

export interface TableProps {
    name: string,
    columns: TableColumns
    rows: TableRows
}

export interface TableColumn {
    order: number,
    name: string,
    visible: boolean
}

export type TableColumns = Array<TableColumn>

export interface TableRow {
    id: number,
    name: string,
    isSelected: boolean
}

export type TableRows = Array<TableRow>