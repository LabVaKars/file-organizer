import React from 'react'
import { useFilters, useRowSelect, useSortBy, useTable } from 'react-table'

import BTable from 'react-bootstrap/Table'

interface Props {
  columns: any,
  data: any,
  defaultColumn:any,
  initialState:any,
  htmlId:string
}

export default function SortFiltSelectTable(props:Props) {

  let {
    columns,
    data,
    defaultColumn,
    initialState,
    htmlId
  } = props

  const tableInstance = useTable({
    columns: columns,
    data: data,
    defaultColumn: defaultColumn,
    initialState: initialState
  },
  useFilters,
  useSortBy,
  useRowSelect);

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      toggleAllRowsSelected,
      rows,
      prepareRow,
    } = tableInstance

    console.log(tableInstance)

    return (
      <>
        <BTable bordered {...getTableProps()} id={htmlId}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span><i className="bi bi-arrow-down"></i>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                            </svg> //bi-arrow-down
                          : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                            </svg> //bi-arrow-up
                        : ''}
                    </span>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps({

                  style: {
                    backgroundColor: row.isSelected ? 'green' : '',
                  },
                })} onClick={() => {
                  toggleAllRowsSelected(false)
                  row.toggleRowSelected()
                }} >
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </BTable>
      </>
    )

}

