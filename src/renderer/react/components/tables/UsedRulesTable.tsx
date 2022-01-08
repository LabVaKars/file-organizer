import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container } from 'react-bootstrap'
import { Rule } from 'main/enums/sqlipc'
import SortFiltTable from './SortFiltTable'
import { changeForm } from 'tg_reducers/UsedRulesPageReducer'
import { showModal } from 'tg_reducers/OpenedModalReducer'
import { DefaultColumnFilter } from 'renderer/react/hooks/tableUtilHooks'
import { useSql } from 'renderer/react/hooks/utilHooks'

interface Props {
  getRules: any,
}

export default function UsedRulesTable(props: Props) {

  let {getRules} = props

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
          Header: 'Action',
          accessor: 'action',
          id: 'action',
          Filter: DefaultColumnFilter,
          filter: 'contain'
        },
        {
          Header: 'Condition',
          accessor: 'condition',
          id: 'condition',
          Filter: DefaultColumnFilter,
          filter: 'contain'
        },
        {
          Header: 'Timetable',
          accessor: 'timetable',
          id: 'timetable',
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
                <Button id={"copyRuleBtn"} variant="success" onClick={() => copyRule(value)}>
                  Copy
                </Button>
                <Button id={"editRuleBtn"} variant="secondary" onClick={() => editRule(value)}>
                  Edit
                </Button>
                <Button id={"deleteRuleBtn"} variant="danger" onClick={() => {
                  deleteRule(value)
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
    return state.usedRules
  }) || []

  let dispatch = useDispatch()
  let runSql = useSql()

  useEffect(() => {
    getRules()
  },[])

  const data: any = React.useMemo(
      () => {
        console.log(state)
        return state
      },
      [state]
  )

  const initialState = {hiddenColumns: ["id"]}

  const deleteRule = async (id:any) => {
    console.log("toDelete", id)
    await runSql(Rule.deleteRule, id)
    getRules()
  }

  const copyRule = (id:any) => {
    dispatch(changeForm(id, "Rule", true))
    dispatch(showModal())
  }

  const addRule = () => {
    dispatch(changeForm(0, "Rule", false))
    dispatch(showModal())
  }

  const editRule = (id:any) => {
    dispatch(changeForm(id, "Rule", false))
    dispatch(showModal())
  }

  const closeModal = () => {
    dispatch(closeModal())
  }

  return (
    <>
      <Container className="mt-3">
        <Button id={"addRuleBtn"} variant="success" onClick={() => addRule()}>
          Add new Rule
        </Button>

        <SortFiltTable
          htmlId={"usedRulesTable"}
          data={data}
          columns={columns}
          defaultColumn={defaultColumn}
          initialState={initialState} />

      </Container>
    </>
  )

}

