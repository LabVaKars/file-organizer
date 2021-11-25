import React, { useEffect } from 'react'
import { useTable } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'

import BTable from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import { initTable, addRow } from 'tg_reducers/FavouriteFolderTableReducer'

// import useTableForm from '../hooks/useTableForm'
// import TableRowList from 'tg_components/TableRowList'
// import TableRowForm from 'tg_components/TableRowForm'
// import Button from 'tg_common/Button'

// type Props = any;

export default function FavouriteFolderTable() {

    const columns: any = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Path',
                accessor: 'path'
            }
        ],
        []
    )

    // const tableReducer = (state:any, action:any) => {
    //   console.log("action", action);
    //   console.log("newState", state);
    //   switch(action.type){
    //     case "add":
    //       return produce(state, (draft:any) => {
    //         draft.push({name:"",path:""})
    //       });
    //     default:
    //       return state;
    //   }
    // }

    let dispatch = useDispatch();
    let state = useSelector((state:any) => {
      console.log("Selected", state)
      return state.favFolders
    }) || []

    const initialState = [
      {
          name: 'Games',
          path: 'D:/Games',
      },
      {
          name: 'Programming',
          path: 'D:/Programming',
      },
      {
          name: 'Study',
          path: 'D:/Study',
      },
    ]

    // const [state, dispatch] = React.useReducer(tableReducer,initialState)

    useEffect(() => {
      console.log("Setting initial state")
      dispatch(initTable(initialState))
    },[])

    const data: any = React.useMemo(
        () => {
          console.log(state)
          return state
        },
        [state]
    )



    // const controlState = (state: any) => {
    //   console.log(state);
    //   return React.useMemo(
    //     () => ({
    //       ...state
    //     }),
    //     [state]
    //   )
    // }

    const tableInstance = useTable({
      columns: columns,
      data: data
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance

      console.log(tableInstance)

      return (
        <>
          <Button variant="success" onClick={ () => dispatch(addRow(1)) }>
            Add new Row
          </Button>
          <BTable bordered {...getTableProps()}>
            {/* // apply the table props */}
            <thead>
              {// Loop over the header rows
              headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {// Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {// Render the header
                      column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
              {// Loop over the table rows
              rows.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {// Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {// Render the cell contents
                          cell.render('Cell')}
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

