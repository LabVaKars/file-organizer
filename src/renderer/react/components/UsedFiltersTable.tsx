import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container } from 'react-bootstrap'
import { useSql } from '../hooks/utilHooks'
import { Filter } from 'main/enums/sqlipc'
import { DefaultColumnFilter } from '../hooks/tableUtilHooks'
import SortFiltTable from './SortFiltTable'
import { showModal } from 'tg_reducers/OpenedModalReducer'
import { changeForm } from 'tg_reducers/UsedFiltersPageReducer'


export default function UsedFiltersTable(props: any) {

  let {getFilters} = props

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
              Header: 'Field',
              accessor: 'field',
              id: 'field',
              Filter: DefaultColumnFilter,
              filter: 'contain'
          },
          {
              Header: 'Comparator',
              accessor: 'comparator',
              id: 'comparator',
              Filter: DefaultColumnFilter,
              filter: 'contain'
          },
          {
              Header: 'Value',
              accessor: 'value',
              id: 'value',
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
                console.log(value)
                return (
                <>
                  <div className="d-flex justify-content-around">
                    <Button variant="success" onClick={() => {copyFilter(value)}}>
                      Copy
                    </Button>
                    <Button variant="secondary" onClick={() => {editFilter(value)}}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => {deleteFilter(value)}}>
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
      return state.usedFilters
    }) || []

    let dispatch = useDispatch()
    let runSql = useSql()

    useEffect(() => {
      getFilters()
    },[])

    const data: any = React.useMemo(
        () => {
          console.log(state)
          return state
        },
        [state]
    )

    const initialState = {hiddenColumns: ["id"]}


    const deleteFilter = async (id:any) => {
      console.log("toDelete", id)
      await runSql(Filter.deleteFilter, id)
      getFilters()
    }

    const copyFilter = (id:any) => {
      dispatch(changeForm(id, true))
      dispatch(showModal())
    }

    const addFilter = () => {
      dispatch(changeForm(0, false))
      dispatch(showModal())
    }

    const editFilter = (id:any) => {
      dispatch(changeForm(id, false))
      dispatch(showModal())
    }

    const closeModal = () => {
      dispatch(closeModal())
    }

      return (
        <>
          <Container className="mt-3">
              <Button variant="success"  onClick={() => addFilter()}>
                Add new Filter
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

