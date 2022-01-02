import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container } from 'react-bootstrap'
import { DefaultColumnFilter } from '../hooks/tableUtilHooks'
import SortFiltTable from './SortFiltTable'
import { useSql } from '../hooks/utilHooks'
import { initTable } from 'tg_reducers/UsedConditionsTableReducer'
import { Condition } from 'main/enums/sqlipc'
import { changeForm } from 'tg_reducers/UsedConditionsPageReducer'
import { showModal } from 'tg_reducers/OpenedModalReducer'



export default function UsedConditionsTable(props:any) {

  // Props import
  let {
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
              id: 'action',
              disableFilters:true,
              disableSortBy:true,
              Cell: ({value}:any) => {
                return (
                <>
                  <div className="d-flex justify-content-around">
                    <Button variant="success" onClick={() => copyCondition(value)}>
                      Copy
                    </Button>
                    <Button variant="secondary" onClick={() => editCondition(value)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => {
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

    const getConditions = async () => {
      console.log("Getting conditions from")
      let result = await runSql(Condition.getConditions)
      dispatch(initTable(result))
      console.log('In React Renderer', result)
      return
    }

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
              <Button variant="success" onClick={() => addCondition()}>
                Add new Condition
              </Button>

              <SortFiltTable
                data={data}
                columns={columns}
                defaultColumn={defaultColumn}
                initialState={initialState} />

            </Container>
        </>
      )

}


