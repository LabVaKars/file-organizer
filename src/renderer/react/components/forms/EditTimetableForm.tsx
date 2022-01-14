
import { Timetable } from 'main/enums/sqlipc';
import React, { useEffect } from 'react'

import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { Controller } from 'react-hook-form';
import { useSql } from 'renderer/react/hooks/utilHooks';
// import DatePicker from 'react-datepicker'


interface Props {
  form: any,
  name: string,
  isNew: boolean,
  timetableId: number,
  onSubmit: any
};

export default function EditTimetableForm(props: Props) {

  let runSql = useSql()

  const {
    form,
    name,
    isNew,
    timetableId,
    onSubmit
  } = props;

  const getTimetable = async (timetableId:any) => {
    console.log("Getting timetables from")
    let result = await runSql(Timetable.getTimetableById,timetableId)
    form.setValue("name", result.name)
    form.setValue("description", result.description)
    form.setValue("startDate", result.startDate)
    form.setValue("startTime", result.startTime)
    form.setValue("frequency", result.frequency)
    form.setValue("frequencyMeasure", result.frequencyMeasure)
    console.log('In React Renderer', result)
  }

  useEffect(() => {
    console.log(timetableId)
    if (!isNew) getTimetable(timetableId)
  },[timetableId])

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
                return <Form.Control id={"form"+field.name} {...field} />
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Start DateTime</Form.Label>
            <InputGroup>
              <Controller
                name="startDate"
                control={form.control}
                rules={{required: true}}
                render={({field}) => {
                  return (<>
                    <Form.Control id={"form"+field.name} type="date" {...field} />
                  </>)
                }}
              />
              <Controller
                name="startTime"
                control={form.control}
                rules={{required: true}}
                render={({field}) => {
                  return (<>
                    <Form.Control id={"form"+field.name} type="time" {...field} step="1"/>
                  </>)
                }}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Frequency</Form.Label>
            <InputGroup>
              <Controller
                name="frequency"
                control={form.control}
                rules={{required: true}}
                render={({field}) => {
                  return <Form.Control id={"form"+field.name} {...field} type="number" />
                }}
              />
              <Controller
                name="frequencyMeasure"
                control={form.control}
                rules={{required: true}}
                render={({field}) => {
                  return (
                    <Form.Select id={"form"+field.name} {...field}>
                      <option selected hidden disabled>Select...</option>
                      <option value="second">Seconds</option>
                      <option value="minute">Minutes</option>
                      <option value="hour">Hours</option>
                      <option value="day">Days</option>
                    </Form.Select>
                  )
                }}
              />
            </InputGroup>
          </Form.Group>

          <Button id={"saveTimetableBtn"} type="button" variant="primary" onClick={() => onSubmit()}>
            Save Changes
          </Button>

        </Form>
      </Container>
    </>
  )

}

