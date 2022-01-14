import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container } from 'react-bootstrap'
import { Action } from 'main/enums/sqlipc'
import SortFiltTable from './SortFiltTable'
import { changeForm, clearForm } from 'tg_reducers/UsedActionsPageReducer'
import { showModal } from 'tg_reducers/OpenedModalReducer'
import { DefaultColumnFilter } from 'renderer/react/hooks/tableUtilHooks'
import { useSql } from 'renderer/react/hooks/utilHooks'

interface Props {
  getActions: any,
}

export default function UsedActionsTable(props: Props) {

  let {getActions} = props

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
          Header: 'Source',
          accessor: 'source',
          id: 'source',
          Filter: DefaultColumnFilter,
          filter: 'contain'
        },
        {
          Header: 'Destination',
          accessor: 'destination',
          id: 'destination',
          Filter: DefaultColumnFilter,
          filter: 'contain'
        },
        {
          Header: 'Type',
          accessor: 'type',
          id: 'type',
          Filter: DefaultColumnFilter,
          filter: 'contain'
        },
        {
          Header: 'Settings',
          accessor: 'settings',
          id: 'settings',
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
                <Button id={"copyActionBtn"} variant="success" onClick={() => copyAction(value)}>
                  Copy
                </Button>
                <Button id={"editActionBtn"} variant="secondary" onClick={() => editAction(value)}>
                  Edit
                </Button>
                <Button id={"deleteActionBtn"} variant="danger" onClick={() => {
                  deleteAction(value)
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
    return state.usedActions
  }) || []

  let dispatch = useDispatch()
  let runSql = useSql()

  useEffect(() => {
    getActions()
  },[])

  const data: any = React.useMemo(
      () => {
        console.log(state)
        return state
      },
      [state]
  )

  const initialState = {hiddenColumns: ["id"]}

  const deleteAction = async (id:any) => {
    console.log("toDelete", id)
    await runSql(Action.deleteAction, id)
    getActions()
  }

  const copyAction = (id:any) => {
    dispatch(changeForm(id, "Action", true, true))
    dispatch(showModal())
  }

  const addAction = () => {
    dispatch(clearForm)
    dispatch(changeForm(0, "Action", false, false))
    dispatch(showModal())
  }

  const editAction = (id:any) => {
    dispatch(changeForm(id, "Action", false, true))
    dispatch(showModal())
  }

  const closeModal = () => {
    dispatch(closeModal())
  }

  return (
    <>
      <Container className="mt-3">
        <Button id={"addActionBtn"} variant="success" onClick={() => addAction()}>
          Add new Action
        </Button>

        <SortFiltTable
          htmlId={"usedActionsTable"}
          data={data}
          columns={columns}
          defaultColumn={defaultColumn}
          initialState={initialState} />

      </Container>
    </>
  )

}

