import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, ButtonGroup, Container, Dropdown, DropdownButton } from 'react-bootstrap'
import { Condition, Filter } from 'main/enums/sqlipc'
import SortFiltTable from './SortFiltTable'
import { changeForm, removeSelect } from 'tg_reducers/UsedConditionsPageReducer'
import { initTable } from 'tg_reducers/SubConditionsTableReducer'
import { useSql } from 'renderer/react/hooks/utilHooks'
import { DefaultColumnFilter } from 'renderer/react/hooks/tableUtilHooks'

interface Props {
  handleSubmit: any,
  conditionId: number,
  parentId:number,
  selectedFilterId:number,
  selectedSubCondId:number,
  formName:string,
}

export default function SubConditionsTable(props: Props) {

  // import props
  let {
    handleSubmit,
    conditionId,
    parentId,
    selectedFilterId,
    selectedSubCondId,
    formName,
  } = props
  // import hooks
  let dispatch = useDispatch()
  let runSql = useSql()

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
            Header: 'PartId',
            accessor: 'partId',
            id: 'partId'
        },
        {
            Header: 'Type',
            accessor: 'type',
            id: 'type'
        },
        {
            Header: 'Name',
            accessor: 'name',
            id: 'name'
        },
        {
            Header: 'Description',
            accessor: 'description',
            id: 'description'
        },
        {
            Header: 'Actions',
            accessor: 'partId',
            id: 'table_action',
            disableFilters:true,
            disableSortBy:true,
            Cell: ({value, row}:any) => {
              console.log(value)
              console.log(row)
              return (
              <>
                <div className="d-flex justify-content-around">
                  {/* <Link to={editUrl}> */}
                    <Button id={"editSubConditionBtn"} type="button" form={formName} variant="secondary" onClick={() => editSubCondition(handleSubmit, conditionId, value, row.values.type)}>
                      Edit
                    </Button>
                  {/* </Link> */}
                  <Button id={"deleteSubConditionBtn"} variant="danger" onClick={() => {
                    deleteCondition(conditionId, value, row.values.type)
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


  let state = useSelector((state:any) => {
    console.log("selector value: ", state)
    return state.subConditions
  }) || []

  const getSubConditions = async (conditionId: any) => {
    console.log("Getting conditions from")
    let result = await runSql(Condition.getSubConditions, conditionId)
    dispatch(initTable(result))
    console.log('In React Renderer', result)
  }

  const addSubCondition = async (editId: any, parentId: any) => {
    let newId = await runSql(Condition.insertCondition, {
      name: "New Condition",
      description: "",
      assosiation: "OR"
    })
    console.log("editId", editId)
    console.log("parentId", parentId)
    console.log("newId", newId)
    await runSql(Condition.addSubCondition, editId, newId)
    getSubConditions(editId)
  }

  const addSubFilter = async (editId: any, parentId: any) => {
    let newId = await runSql(Filter.insertFilter, {
      field: "New Field",
      comparator: ">",
      value: ""
    })
    console.log("editId", editId)
    console.log("parentId", parentId)
    console.log("newId", newId)
    await runSql(Condition.addFilter, editId, newId)
    getSubConditions(editId)
  }

  const selectFilter = async (editId: any, parentId: any) => {
    dispatch(changeForm(0, editId, "FilterSelect", false))
  }

  const selectSubCond = async (editId: any, parentId: any) => {
    dispatch(changeForm(0, editId, "ConditionSelect", false))
  }

  const editSubCondition = (handleSubmit:any, currentId:any, nextId:any, type:string) => {
    let onSubmit = async (data: any, editId:any) => {
        console.log("Submitting form")
        await runSql(Condition.updateCondition, {
          id: editId,
          name: data.name,
          description: data.description,
          assosiation: data.assosiation,
        })
        dispatch(changeForm(nextId,currentId,type,false))
    }
    handleSubmit((data:any) => onSubmit(data, currentId))()
}

  const deleteCondition = async (conditionId:any, deletableId:any, type:any) => {
    if(type == "Filter"){
      await runSql(Condition.removeFilter, deletableId)
    } else if(type == "Condition"){
      await runSql(Condition.removeCondition, deletableId)
    }
    getSubConditions(conditionId)
  }

  const addExistingFilter = async (editId:any, existId:any) => {
    await runSql(Condition.addFilter, editId, existId)
    dispatch(removeSelect())
    getSubConditions(editId)
  }

  const addExistingSubCond = async (editId:any, existId:any) => {
    await runSql(Condition.addSubCondition, editId, existId)
    dispatch(removeSelect())
    getSubConditions(editId)
  }

  useEffect(() => {
    getSubConditions(conditionId)
  },[conditionId])

  useEffect(() => {
    if(selectedFilterId != 0) addExistingFilter(conditionId, selectedFilterId)
  },[selectedFilterId])

  useEffect(() => {
    if(selectedSubCondId != 0) addExistingSubCond(conditionId, selectedSubCondId)
  },[selectedSubCondId])

  const data: any = React.useMemo(
      () => {
        return state
      },
      [state]
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const initialState = {hiddenColumns: ["id", "partId"]}


  return (
    <>
      <Container className="mt-3">
        <ButtonGroup aria-label="Basic example">
          <DropdownButton title="Add new" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1" onClick={() => addSubFilter(conditionId, parentId)}>Filter</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => addSubCondition(conditionId, parentId)}>Condition</Dropdown.Item>
          </DropdownButton>
          <div className="ml-1 mr-1">&nbsp; Or &nbsp;</div>
          <DropdownButton title="Add existing" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="3" onClick={() => selectFilter(conditionId, selectedFilterId)}>Filter</Dropdown.Item>
            <Dropdown.Item eventKey="4" onClick={() => selectSubCond(conditionId, selectedSubCondId)}>Condition</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </Container>
      <SortFiltTable
        htmlId={"subConditionsTable"}
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        initialState={initialState}
      />

    </>
  )

}

