
import { Action } from 'main/enums/sqlipc';
import React, { useEffect } from 'react'

import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSql } from 'renderer/react/hooks/utilHooks';
import { moveToForm, saveForm } from 'tg_reducers/UsedActionsPageReducer';


interface Props {
  form: any,
  name: string,
  isNew: boolean,
  actionId: number,
  // prevId: number,
  // selectedSourceFolderId: number,
  // selectedDestinationFolderId: number,
  onSubmit: any,
  toReload: any,
  actionFormState: any
};

export default function EditActionForm(props: Props) {

  let runSql = useSql()

  const {
    form,
    name,
    isNew,
    actionId,
    // prevId,
    // selectedSourceFolderId,
    // selectedDestinationFolderId,
    onSubmit,
    toReload,
    actionFormState
  } = props;

  let dispatch = useDispatch()

  useEffect(() => {
    if(toReload){
      if (!isNew) {
        console.log("Reading action from DB")
        getAction(actionId)
      }
    } else {
      getSavedAction(form, actionFormState)
    }
  },[actionId])

  const getSavedAction = (form:any, formState: any) => {
    for(const [key, value] of Object.entries(formState)){
      form.setValue(key, value)
    }
  }

  const getAction = async (actionId:any) => {
    console.log("Getting actions from")
    console.log(actionId)
    let result = await runSql(Action.getActionById,actionId)
    form.setValue("name", result.name)
    form.setValue("description", result.description)
    form.setValue("type", result.type)
    form.setValue("sourceId", result.sourceId)
    form.setValue("source", result.source)
    form.setValue("destinationId", result.destinationId)
    form.setValue("destination", result.destination)
    form.setValue("pattern", result.pattern)
    form.setValue("includeSubfolders", result.includeSubfolders)
    console.log('In React Renderer', result)
  }

  // const addSourceFolder = async (form:any, folderId:number) => {
  //   let folder =  await runSql(Folder.getFolderById, folderId)
  //   form.setValue("sourceId", folderId)
  //   form.setValue("source", folder.path)
  //   dispatch(removeSelect())
  // }

  // const addDestinationFolder = async (form:any, folderId:number) => {
  //   let folder =  await runSql(Folder.getFolderById, folderId)
  //   form.setValue("destinationId", folderId)
  //   form.setValue("destination", folder.path)
  //   dispatch(removeSelect())
  // }



  // useEffect(() => {
  //   if(selectedSourceFolderId != 0) {
  //     console.log("Setting Source folder ID")
  //     addSourceFolder(form, selectedSourceFolderId)
  //   }
  // },[selectedSourceFolderId])

  // useEffect(() => {
  //   if(selectedDestinationFolderId != 0) {
  //     console.log("Setting Destination folder ID")
  //     addDestinationFolder(form, selectedDestinationFolderId)
  //   }
  // },[selectedDestinationFolderId])

  let openSourceIdSelect = (editId:any) => {
    console.log(form.getValues())
    dispatch(saveForm(form.getValues()))
    dispatch(moveToForm("SourceFolderSelect", false))
  }

  let openDestinationIdSelect = (editId:any) => {
    console.log(form.getValues())
    dispatch(saveForm(form.getValues()))
    dispatch(moveToForm("DestinationFolderSelect", false))
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
            <Form.Label>Type</Form.Label>
            <Controller
              name="type"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <Form.Select id={"form"+field.name} {...field}>
                    <option selected hidden disabled>Select...</option>
                    <option value="move">Move</option>
                    <option value="copy">Copy</option>
                    <option value="rename">Rename</option>
                  </Form.Select>
                )
              }}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Source</Form.Label>
            <Controller
              name="sourceId"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (<Form.Control id={"form"+field.name} hidden {...field} />)
              }}
            />
            <Controller
              name="source"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <InputGroup>
                    <Form.Control id={"form"+field.name} disabled {...field} />
                    <Button id={"selectSourceFolderBtn"} onClick={() => openSourceIdSelect(actionId)}>Select...</Button>
                  </InputGroup>
                )
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Destination</Form.Label>
            <Controller
              name="destinationId"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (<Form.Control id={"form"+field.name} hidden {...field} />)
              }}
            />
            <Controller
              name="destination"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <InputGroup>
                    <Form.Control id={"form"+field.name} disabled {...field} />
                    <Button id={"selectDestinationFolderBtn"} onClick={() => openDestinationIdSelect(actionId)}>Select...</Button>
                  </InputGroup>
                )
              }}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Pattern</Form.Label>
            <Controller
              name="pattern"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return <Form.Control id={"form"+field.name} {...field} />
              }}
            />
          </Form.Group> */}


          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Include Subfolders</Form.Label>
            <Controller
              name="includeSubfolders"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <Form.Select id={"form"+field.name} {...field}>
                    <option selected hidden disabled>Select...</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Select>
                )
              }}
            />
          </Form.Group>

          <Button id={"saveActionBtn"} type="button" variant="primary" onClick={() => onSubmit()}>
            Save Changes
          </Button>

        </Form>
      </Container>
    </>
  )

}

