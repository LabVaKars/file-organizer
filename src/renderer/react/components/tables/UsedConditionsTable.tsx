import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container } from 'react-bootstrap'
import SortFiltTable from './SortFiltTable'
import { Condition } from 'main/enums/sqlipc'
import { changeForm } from 'tg_reducers/UsedConditionsPageReducer'
import { showModal } from 'tg_reducers/OpenedModalReducer'
import { useSql } from 'renderer/react/hooks/utilHooks'
import { DefaultColumnFilter } from 'renderer/react/hooks/tableUtilHooks'

interface Props {
  getConditions: any,
}

export default function UsedConditionsTable(props:Props) {

  // Props import
  let {
    getConditions
  } = props

  // Hooks import
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
                    <Button id={"copyConditionBtn"} variant="success" onClick={() => copyCondition(value)}>
                      Copy
                    </Button>
                    <Button id={"editConditionBtn"} variant="secondary" onClick={() => editCondition(value)}>
                      Edit
                    </Button>
                    <Button id={"deleteConditionBtn"} variant="danger" onClick={() => {
                      deleteCondition(value)
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

    const copyCondition = async (id:any) => {
      await runSql(Condition.copyCondition,id)
      getConditions()
      return
        // console.log("EditId", editId)
    }

    const editCondition = async (id:any) => {
      dispatch(changeForm(id,0,"Condition",false))
      dispatch(showModal())
      return
        // console.log("EditId", editId)
    }

    const addCondition = () => {
      runSql(Condition.insertCondition, {
          name: "New Condition",
          description: "",
          assosiation: "OR"
      })
      getConditions()
      return
    }

    const deleteCondition = async (id:any) => {
      await runSql(Condition.deleteCondition, id)
      getConditions()
      return
    }

    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
      )

    let state = useSelector((state:any) => {
      return state.usedConditions
    }) || []

    useEffect(() => {
      getConditions()
    },[])

    const data: any = React.useMemo(
        () => {
          return state
        },
        [state]
    )

    const initialState = {hiddenColumns: ["id"]}

      return (
        <>
          <Container className="mt-3">
              <Button id={"addConditionBtn"} variant="success" onClick={() => addCondition()}>
                Add new Condition
              </Button>

              <SortFiltTable
                htmlId={"usedConditionsTable"}
                data={data}
                columns={columns}
                defaultColumn={defaultColumn}
                initialState={initialState} />

            </Container>
        </>
      )

}


