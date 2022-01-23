
import { Rule } from 'main/enums/sqlipc';
import React, { useEffect } from 'react'

import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSql } from 'renderer/react/hooks/utilHooks';
import { moveToForm, saveForm } from 'tg_reducers/UsedRulesPageReducer';


interface Props {
  form: any,
  name: string,
  isNew: boolean,
  ruleId: number,
  // selectedActionId: number,
  // selectedTimetableId: number,
  // selectedConditionId: number,
  onApply: any,
  onSubmit: any,
  toReload: any,
  ruleFormState: any
};

export default function EditRuleForm(props: Props) {

  let runSql = useSql()

  const {
    form,
    name,
    isNew,
    ruleId,
    // selectedActionId,
    // selectedTimetableId,
    // selectedConditionId,
    onApply,
    onSubmit,
    toReload,
    ruleFormState
  } = props;

  let dispatch = useDispatch()

  useEffect(() => {
    if(toReload){
      if (!isNew) {

        getRule(ruleId)
      }

    } else {
      getSavedRule(form, ruleFormState)
    }
  },[ruleId])

  const getSavedRule = (form:any, formState: any) => {
    for(const [key, value] of Object.entries(formState)){
      form.setValue(key, value)
    }
  }

  const getRule = async (ruleId:any) => {
    console.log("Getting rules from")
    console.log(ruleId)
    let result = await runSql(Rule.getRuleById,ruleId)
    form.setValue("name", result.name)
    form.setValue("description", result.description)
    form.setValue("actionId", result.actionId)
    form.setValue("action", result.action)
    form.setValue("conditionId", result.conditionId)
    form.setValue("condition", result.condition)
    form.setValue("timetableId", result.timetableId)
    form.setValue("timetable", result.timetable)
    form.setValue("scheduleActive", result.active)
    console.log('In React Renderer', result)
  }

  // const addAction = async (actionId:number) => {
  //   let action =  await runSql(Action.getActionById, actionId)
  //   form.setValue("actionId", actionId)
  //   form.setValue("action", action.path)
  //   dispatch(removeSelect())
  // }

  // const addCondition = async (conditionId:number) => {
  //   let condition =  await runSql(Condition.getConditionById, conditionId)
  //   form.setValue("conditionId", conditionId)
  //   form.setValue("condition", condition.path)
  //   dispatch(removeSelect())
  // }

  // const addTimetable = async (timetableId:number) => {
  //   let timetable =  await runSql(Timetable.getTimetableById, timetableId)
  //   form.setValue("timetableId", timetableId)
  //   form.setValue("timetable", timetable.path)
  //   dispatch(removeSelect())
  // }



  // useEffect(() => {
  //   if(selectedActionId != 0) addAction(selectedActionId)
  // },[selectedActionId])

  // useEffect(() => {
  //   if(selectedConditionId != 0) addCondition(selectedConditionId)
  // },[selectedConditionId])

  // useEffect(() => {
  //   if(selectedTimetableId != 0) addTimetable(selectedTimetableId)
  // },[selectedTimetableId])


  let openActionIdSelect = () => {
    console.log(form.getValues())
    dispatch(saveForm(form.getValues()))
    dispatch(moveToForm("ActionSelect", false))
  }

  let openConditionIdSelect = () => {
    console.log(form.getValues())
    dispatch(saveForm(form.getValues()))
    dispatch(moveToForm("ConditionSelect", false))
  }

  let openTimetableIdSelect = () => {
    console.log(form.getValues())
    dispatch(saveForm(form.getValues()))
    dispatch(moveToForm("TimetableSelect", false))
  }

  return (
    <>
      <Container className="mt-3">
        <Form id={name} >

          <Form.Group className="mb-3" controlId="formPath">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return <Form.Control id={"form"+field.name} {...field} />
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Description</Form.Label>
            <Controller
              name="description"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return <Form.Control {...field} />
              }}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Action</Form.Label>
            <Controller
              name="actionId"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (<Form.Control id={"form"+field.name} hidden {...field} />)
              }}
            />
            <Controller
              name="action"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <InputGroup>
                    <Form.Control id={"form"+field.name} disabled {...field} />
                    <Button id={"selectSourceFolderBtn"} onClick={() => openActionIdSelect()}>Select...</Button>
                  </InputGroup>
                )
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Condition</Form.Label>
            <Controller
              name="conditionId"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (<Form.Control id={"form"+field.name} hidden {...field} />)
              }}
            />
            <Controller
              name="condition"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <InputGroup>
                    <Form.Control id={"form"+field.name} disabled {...field} />
                    <Button id={"selectSourceFolderBtn"} onClick={() => openConditionIdSelect()}>Select...</Button>
                  </InputGroup>
                )
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Timetable</Form.Label>
            <Controller
              name="timetableId"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (<Form.Control id={"form"+field.name} hidden {...field} />)
              }}
            />
            <Controller
              name="timetable"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <InputGroup>
                    <Form.Control id={"form"+field.name} disabled {...field} />
                    <Button id={"selectSourceFolderBtn"} onClick={() => openTimetableIdSelect()}>Select...</Button>
                  </InputGroup>
                )
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Active</Form.Label>
            <Controller
              name="scheduleActive"
              control={form.control}
              rules={{required: true}}
              defaultValue={"0"}
              render={({field}) => {
                return (
                  <Form.Select id={"form"+field.name} {...field}>
                    <option selected hidden disabled>Select...</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Form.Select>
                )
              }}
            />
          </Form.Group>

          <Button id={"saveRuleBtn"} type="button" variant="primary" onClick={() => onSubmit()}>
            Save Changes
          </Button>
          <Button id={"applyRuleBtn"} type="button" variant="secondary" onClick={() => onApply(ruleId)}>
            Apply Rule
          </Button>

        </Form>
      </Container>
    </>
  )

}

