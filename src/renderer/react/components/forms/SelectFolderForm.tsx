import React, { useEffect } from 'react'

import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Folder } from 'main/enums/sqlipc';
import { initTable } from 'tg_reducers/SelectFoldersTableReducer';
import { useSql } from 'renderer/react/hooks/utilHooks';
import { DefaultColumnFilter } from 'renderer/react/hooks/tableUtilHooks';
import SortFiltTable from 'tg_components/tables/SortFiltTable';

interface Props {
  prevId:number,
  onSubmit:any
};

export default function SelectFolderForm(props: Props) {

  const {
    prevId,
    onSubmit
  } = props;

  useEffect(() => {
    getFolders()
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
          Header: 'Path',
          accessor: 'path',
          id: 'path',
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
                <Button id={"selectFolderBtn"} variant="success" onClick={() => {onSubmit(value, prevId)}}>
                  Select
                </Button>
              </div>
            </>)
          }
        },
    ],
    []
  )
  const getFolders = async () => {
    console.log("Getting folders from")
    let result = await runSql(Folder.getFolders)
    dispatch(initTable(result))
    console.log('In React Renderer', result)
  }

  let state = useSelector((state:any) => {
    console.log("selector value: ", state)
    return state.selectFolders
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
          htmlId={"selectFolderTable"}
          data={data}
          columns={columns}
          defaultColumn={defaultColumn}
          initialState={initialState}/>

      </Container>
    </>
  )

}