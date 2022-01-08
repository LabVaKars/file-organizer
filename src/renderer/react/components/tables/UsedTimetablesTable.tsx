import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container } from 'react-bootstrap'
import { Timetable } from 'main/enums/sqlipc'
import SortFiltTable from 'tg_components/tables/SortFiltTable'
import { changeForm } from 'tg_reducers/UsedTimetablesPageReducer'
import { showModal } from 'tg_reducers/OpenedModalReducer'
import { DefaultColumnFilter } from 'renderer/react/hooks/tableUtilHooks'
import { useSql } from 'renderer/react/hooks/utilHooks'

// type Props = any;

export default function UsedTimetablesTable(props: any) {

  let {getTimetables} = props

  const columns: any = React.useMemo(
    () => [
        {
          Header: 'Id',
          accessor: 'id',
          id: 'id',
          disableFilters:true,
          disableSortBy:true
        },
        {
          Header: 'Name',
          accessor: 'name',
          id: 'name',
          Filter: DefaultColumnFilter,
          filter: 'contain'
        },
        {
          Header: 'Description',
          accessor: 'description',
          id: 'description',
          Filter: DefaultColumnFilter,
          filter: 'contain'
        },
        {
          Header: 'Start Time',
          accessor: 'startTime',
          id: 'startTime',
          Filter: DefaultColumnFilter,
          filter: 'contain'
        },
        {
          Header: 'Frequency',
          accessor: 'frequency',
          id: 'frequency',
          Filter: DefaultColumnFilter,
          filter: 'contain'
        },
        {
          Header: 'Actions',
          accessor: 'id',
          id: 'table_action',
          disableFilters:true,
          disableSortBy:true,
          Cell: ({value}:any) => {
            console.log(value)
            return (
            <>
              <div className="d-flex justify-content-around">
                <Button id={"copyTimetableBtn"} variant="success" onClick={() => copyRow(value)}>
                  Copy
                </Button>
                <Button id={"editTimetableBtn"} variant="secondary" onClick={() => editRow(value)}>
                  Edit
                </Button>
                <Button id={"deleteTimetableBtn"} variant="danger" onClick={() => {
                  deleteRow(value)
                }}>
                  Delete
                </Button>
              </div>
            </>)
          }
        },
    ],
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  let state = useSelector((state:any) => {
    console.log("selector value: ", state)
    return state.usedTimetables
  }) || []

  let dispatch = useDispatch()
  let runSql = useSql()

  useEffect(() => {
    getTimetables()
  },[])

  const data: any = React.useMemo(
      () => {
        console.log(state)
        return state
      },
      [state]
  )

  const initialState = {hiddenColumns: ["id"]}

  const deleteRow = async (id:any) => {
    console.log("toDelete", id)
    await runSql(Timetable.deleteTimetable, id)
    getTimetables()
  }

  const copyRow = (id:any) => {
    dispatch(changeForm(id, true))
    dispatch(showModal())
  }

  const addRow = () => {
    dispatch(changeForm(0, false))
    dispatch(showModal())
  }

  const editRow = (id:any) => {
    dispatch(changeForm(id, false))
    dispatch(showModal())
  }

  const closeModal = () => {
    dispatch(closeModal())
  }

  return (
    <>
      <Container className="mt-3">
        <Button id={"addTimetableBtn"} variant="success" onClick={() => addRow()}>
          Add new Timetable
        </Button>

        <SortFiltTable
          htmlId={"usedTimetablesTable"}
          data={data}
          columns={columns}
          defaultColumn={defaultColumn}
          initialState={initialState} />

      </Container>
    </>
  )

}

