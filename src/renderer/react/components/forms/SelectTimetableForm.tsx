import React, { useEffect } from 'react'

import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Timetable } from 'main/enums/sqlipc';
import { initTable } from 'tg_reducers/SelectTimetablesTableReducer';
import { useSql } from 'renderer/react/hooks/utilHooks';
import { DefaultColumnFilter } from 'renderer/react/hooks/tableUtilHooks';
import SortFiltTable from 'tg_components/tables/SortFiltTable';

interface Props {
  prevId:number,
  onSubmit:any
};

export default function SelectTimetableForm(props: Props) {

  const {
    prevId,
    onSubmit
  } = props;

  useEffect(() => {
    getTimetables()
  },[])

  let runSql = useSql()
  let dispatch = useDispatch()

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
                <Button id={"selectTimetableBtn"} variant="success" onClick={() => {onSubmit(value, prevId)}}>
                  Select
                </Button>
              </div>
            </>)
          }
        },
    ],
    []
  )
  const getTimetables = async () => {
    console.log("Getting timetables from")
    let result = await runSql(Timetable.getTimetables)
    dispatch(initTable(result))
    console.log('In React Renderer', result)
  }

  let state = useSelector((state:any) => {
    console.log("selector value: ", state)
    return state.selectTimetables
  }) || []

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const data: any = React.useMemo(
    () => {
      console.log(state)
      return state
    },
    [state]
  )

const initialState = {hiddenColumns: ["id"]}


  return (
    <>
      <Container className="mt-3">

        <SortFiltTable
          htmlId={"selectTimetableTable"}
          data={data}
          columns={columns}
          defaultColumn={defaultColumn}
          initialState={initialState}/>

      </Container>
    </>
  )

}