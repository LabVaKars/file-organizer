import React, { useEffect } from 'react'

import { Button, Container, Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form';
import { Condition } from 'main/enums/sqlipc';
import { useSql } from 'renderer/react/hooks/utilHooks';
import SubConditionsTable from 'tg_components/tables/SubConditionsTable';

interface Props {
  form: any,
  name: string,
  isNew: boolean,
  conditionId: number,
  prevId: number,
  selectedFilterId: number,
  selectedSubCondId: number,
  onSubmit: any
};

export default function EditConditionForm(props: Props) {

  const {
    form,
    name,
    isNew,
    conditionId,
    prevId,
    selectedFilterId,
    selectedSubCondId,
    onSubmit
  } = props;

  let runSql = useSql()

  const getCondition = async (conditionId:any) => {
    console.log("Getting filters from")
    let result = await runSql(Condition.getConditionById, conditionId)
    form.setValue("name", result.name)
    form.setValue("description", result.description)
    form.setValue("assosiation", result.assosiation)
    console.log('In React Renderer', result)
  }


  useEffect(() => {
    console.log("Getting Condition")
    if (!isNew) getCondition(conditionId)
  },[conditionId])


  return (
    <>
      <Container className="mt-3">
        <Form id={name} >

          <Form.Group className="mb-3" controlId="formConditionField">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={form.control}
              rules={{required: false}}
              defaultValue={"New Condition"}
              render={({field}) => {
                return <Form.Control id={"form"+field.name} {...field}/>
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConditionField">
            <Form.Label>Description</Form.Label>
            <Controller
              name="description"
              control={form.control}
              rules={{required: false}}
              render={({field}) => {
                return <Form.Control id={"form"+field.name} {...field} />
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Assosiation</Form.Label>
            <Controller
              name="assosiation"
              control={form.control}
              rules={{required: false}}
              defaultValue={"OR"}
              render={({field}) => {
                return (
                  <Form.Select id={"form"+field.name} {...field}>
                    <option selected hidden disabled>Select...</option>
                    <option value="AND">Fulfill all conditions(AND)</option>
                    <option value="OR">Fulfill any of conditions(OR)</option>
                  </Form.Select>
                )
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Conditions</Form.Label>
            <SubConditionsTable
              handleSubmit={form.handleSubmit}
              conditionId={conditionId}
              parentId={prevId}
              selectedFilterId={selectedFilterId}
              selectedSubCondId={selectedSubCondId}
              formName={name}/>
          </Form.Group>

          <Button id={"saveConditionBtn"} type="button" variant="primary" onClick={() => onSubmit(form.handleSubmit, conditionId, prevId)}>
            Save Changes
          </Button>

        </Form>
      </Container>
    </>
  )

}

