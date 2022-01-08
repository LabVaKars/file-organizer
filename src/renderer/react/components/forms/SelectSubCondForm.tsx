import React, { useEffect } from 'react'

import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import SortFiltTable from 'tg_components/tables/SortFiltTable';
import { Condition } from 'main/enums/sqlipc';
import { initTable } from 'tg_reducers/SelectConditionsTableReducer';
import { useSql } from 'renderer/react/hooks/utilHooks';
import { DefaultColumnFilter } from 'renderer/react/hooks/tableUtilHooks';

interface Props {
  prevId:number,
  onSubmit:any
};

export default function SelectSubCondForm(props: Props) {

  const {
    prevId,
    onSubmit
  } = props;

  useEffect(() => {
    getConditions(prevId)
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
          Header: 'Assosiation',
          accessor: 'assosiation',
          id: 'assosiation',
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
            return (
            <>
              <div className="d-flex justify-content-around">
                <Button id={"selectSubCondBtn"} variant="success" onClick={() => {onSubmit(value, prevId)}}>
                  Select
                </Button>
              </div>
            </>)
          }
      },
    ],
    []
  )

  const getConditions = async (editId:any) => {
    console.log("Getting conditions from")
    let result = await runSql(Condition.getConditionsExceptParents, editId)
    dispatch(initTable(result))
    console.log('In React Renderer', result)
    return
  }

  let state = useSelector((state:any) => {
    console.log("selector value: ", state)
    return state.selectConditions
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
          htmlId={"selectSubCondTable"}
          data={data}
          columns={columns}
          defaultColumn={defaultColumn}
          initialState={initialState}/>

      </Container>
    </>
  )

}