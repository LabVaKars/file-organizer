import React, { useEffect } from 'react'

import { Button, Container, Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form';
import { useSql } from '../hooks/utilHooks';
import { Filter } from 'main/enums/sqlipc';

interface Props {
  form:any,
  name:string,
  isNew:boolean,
  isCopy:boolean,
  prevId:number,
  filterId:number,
  onSubmit:any
};

export default function EditFilterForm(props: Props) {

  let runSql = useSql()

  const {
    form,
    name,
    isNew,
    // isCopy,
    // prevId,
    filterId,
    onSubmit
  } = props;

  const getFilter = async (filterId:any) => {
    console.log("Getting filter from")
    let result = await runSql(Filter.getFilterById,filterId)
    form.setValue("_field", result.field)
    form.setValue("_comparator", result.comparator)
    form.setValue("_value", result.value)
    console.log('In React Renderer', result)
  }

  useEffect(() => {
    console.log(filterId)
    if (!isNew) getFilter(filterId)
  },[filterId])




  return (
    <>
      <Container className="mt-3">
        <Form id={name} >

          <Form.Group className="mb-3" controlId="formFilterField">
            <Form.Label>Field</Form.Label>
            <Controller
              name="_field"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return <Form.Control {...field} />
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Comparator</Form.Label>
            <Controller
              name="_comparator"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return <Form.Control {...field} />
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Value</Form.Label>
            <Controller
              name="_value"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return <Form.Control {...field} />
              }}
            />
          </Form.Group>

          <Button type="button" variant="primary" onClick={() => onSubmit()}>
            Save Changes
          </Button>

        </Form>
      </Container>
    </>
  )

}

