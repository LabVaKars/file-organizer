import React, { useEffect } from 'react'

import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { Controller, useWatch } from 'react-hook-form';
import { Filter } from 'main/enums/sqlipc';
import { useSql } from 'renderer/react/hooks/utilHooks';

interface Props {
  form:any,
  name:string,
  isNew:boolean,
  filterId:number,
  onSubmit:any
};

export default function EditFilterForm(props: Props) {

  let runSql = useSql()

  const {
    form,
    name,
    isNew,
    filterId,
    onSubmit
  } = props;

  const getFilter = async (filterId:any) => {
    console.log("Getting filter from")
    let result = await runSql(Filter.getFilterById,filterId)
    form.setValue("_name", result.name)
    form.setValue("_description", result.description)
    form.setValue("_field", result.field)
    form.setValue("_comparator", result.comparator)
    let jsonValue = JSON.parse(result.value)
    setFilterValues(form, jsonValue)
    console.log('In React Renderer', result)
  }

  const setFilterValues = (form:any, jsonValue:any) => {
    for(const [key, value] of Object.entries(jsonValue)){
      form.setValue("_value"+key, value)
    }
  }


  useEffect(() => {
    console.log(isNew)
    console.log(filterId)
    if (!isNew) getFilter(filterId)
  },[filterId])


    let formState = useWatch({
      control: form.control
    })
    console.log(formState)

  return (
    <>
      <Container className="mt-3">
        <Form id={name} >

        <Form.Group className="mb-3" controlId="formFilterField">
            <Form.Label>Name</Form.Label>
            <Controller
              name="_name"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return <Form.Control id={"form"+field.name} {...field} />
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFilterField">
            <Form.Label>Description</Form.Label>
            <Controller
              name="_description"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return <Form.Control id={"form"+field.name} {...field} />
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFilterField">
            <Form.Label>Field</Form.Label>
            <Controller
              name="_field"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <Form.Select id={"form"+field.name} {...field}>
                    <option selected hidden disabled>Select...</option>
                    {/* Time */}
                    <option value={"createdTime"}>Created Time</option>
                    <option value={"changedTime"}>Changed Time</option>
                    <option value={"accessedTime"}>Accessed Time</option>
                    <option value={"modifiedTime"}>Modified Time</option>
                    {/* Text */}
                    <option value={"fileName"}>File Name</option>
                    <option value={"fileExtension"}>File Extension</option>
                    {/* Number */}
                    <option value={"fileSize"}>File Size</option>
                  </Form.Select>
                )
              }}
            />
          </Form.Group>

{/* For time */}
          {
            ['modifiedTime','createdTime','changedTime','accessedTime'].includes(form.getValues("_field")) && <>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Comparator</Form.Label>
                <Controller
                  name="_comparator"
                  control={form.control}
                  rules={{required: true}}
                  render={({field}) => {
                    return (
                      <Form.Select id={"form"+field.name} {...field}>
                        <option selected hidden disabled>Select...</option>
                        {/* Time */}
                        <option value="more_abs_time">More than absolute time</option>
                        <option value="more_rel_time">More than relative time</option>
                        <option value="more_abs_now">More than now</option>
                        <option value="more_rel_now">More than relative to now</option>
                        <option value="less_abs_time">Less than absolute time</option>
                        <option value="less_rel_time">Less than relative time</option>
                        <option value="less_abs_now">Less than now</option>
                        <option value="less_rel_now">Less than relative to now</option>
                      </Form.Select>
                    )
                  }}
                />
              </Form.Group>
              {['more_abs_time','less_abs_time'].includes(form.getValues("_comparator")) && <>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Datetime</Form.Label>
                    <InputGroup>
                      <Controller
                        name="_valueAbsDate"
                        control={form.control}
                        rules={{required: true}}
                        render={({field}) => {
                          return (<>
                            <Form.Control id={"form"+field.name} type="date" {...field} />
                          </>)
                        }}
                      />
                      <Controller
                        name="_valueAbsTime"
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
                </>
              }
              {['more_rel_time','less_rel_time', 'more_rel_now','less_rel_now'].includes(form.getValues("_comparator")) && <>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Value</Form.Label>
                    <InputGroup>
                      <Controller
                        name="_valueRelDif"
                        control={form.control}
                        rules={{required: true}}
                        render={({field}) => {
                          return <Form.Control id={"form"+field.name} {...field} type="number" />
                        }}
                      />
                      <Controller
                        name="_valueRelDifMeasure"
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
                      <Controller
                        name="_valueRelDirection"
                        control={form.control}
                        rules={{required: true}}
                        render={({field}) => {
                          return (
                            <Form.Select id={"form"+field.name} {...field}>
                              <option selected hidden disabled>Select...</option>
                              {/* Time */}
                              <option value="relBefore">Before</option>
                              <option value="relAfter">After</option>
                            </Form.Select>
                          )
                        }}
                      />
                      {!['more_rel_now','less_rel_now'].includes(form.getValues("_comparator")) && <>
                        <Controller
                          name="_valueRelDate"
                          control={form.control}
                          rules={{required: true}}
                          render={({field}) => {
                            return (<>
                              <Form.Control id={"form"+field.name} type="date" {...field} />
                            </>)
                          }}
                        />
                        <Controller
                          name="_valueRelTime"
                          control={form.control}
                          rules={{required: true}}
                          render={({field}) => {
                            return (<>
                              <Form.Control id={"form"+field.name} type="time" {...field} step="1"/>
                            </>)
                          }}
                        />
                      </>
                      }
                    </InputGroup>
                  </Form.Group>
                </>
              }
              </>
            }
            {/* For size */}

            {
            ['fileSize'].includes(form.getValues("_field")) && <>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Comparator</Form.Label>
                <Controller
                  name="_comparator"
                  control={form.control}
                  rules={{required: true}}
                  render={({field}) => {
                    return (
                      <Form.Select id={"form"+field.name} {...field}>
                        <option selected hidden disabled>Select...</option>
                        {/* Time */}
                        <option value="more">More than</option>
                        <option value="less">Less than</option>
                      </Form.Select>
                    )
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Value</Form.Label>
                <InputGroup>
                  <Controller
                    name="_valueSize"
                    control={form.control}
                    rules={{required: true}}
                    render={({field}) => {
                      return <Form.Control id={"form"+field.name} {...field} type="number" />
                    }}
                  />
                  <Controller
                    name="_valueSizeMeasure"
                    control={form.control}
                    rules={{required: true}}
                    render={({field}) => {
                      return (
                        <Form.Select id={"form"+field.name} {...field}>
                          <option selected hidden disabled>Select...</option>
                          <option value="B">B</option>
                          <option value="KB">KB</option>
                          <option value="MB">MB</option>
                          <option value="GB">GB</option>
                        </Form.Select>
                      )
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </>}

            {/* For text */}

            {['fileName', 'fileExtension'].includes(form.getValues("_field")) && <>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Comparator</Form.Label>
                  <Controller
                    name="_comparator"
                    control={form.control}
                    rules={{required: true}}
                    render={({field}) => {
                      return (
                        <Form.Select id={"form"+field.name} {...field}>
                          <option selected hidden disabled>Select...</option>
                          {/* Time */}
                          <option value="do_start">Starts with</option>
                          <option value="do_end">Ends with</option>
                          <option value="do_contains">Contains</option>
                          <option value="do_regex">Regex</option>
                          <option value="dont_start">Do not starts with</option>
                          <option value="dont_end">Do not ends with</option>
                          <option value="dont_contain">Do not contains</option>
                          <option value="dont_regex">Do not Regex</option>
                        </Form.Select>
                      )
                    }}
                  />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Value</Form.Label>
                  <Controller
                    name="_valueText"
                    control={form.control}
                    rules={{required: true}}
                    render={({field}) => {
                      return <Form.Control id={"form"+field.name} {...field} />
                    }}
                  />
              </Form.Group>
            </>}

          <Button id={"saveFilterBtn"} type="button" variant="primary" onClick={() => onSubmit()}>
            Save Changes
          </Button>

        </Form>
      </Container>
    </>
  )

}

