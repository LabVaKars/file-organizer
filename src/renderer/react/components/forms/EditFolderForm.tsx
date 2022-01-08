
import { Folder } from 'main/enums/sqlipc';
import React, { useEffect } from 'react'

import { Button, Container, Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form';
import { useFileDialog, useSql } from 'renderer/react/hooks/utilHooks';


interface Props {
  form: any,
  name: string,
  isNew: boolean,
  folderId: number,
  onSubmit: any
};

export default function EditFolderForm(props: Props) {

  let runSql = useSql()

  const {
    form,
    name,
    isNew,
    folderId,
    onSubmit
  } = props;

  const getFolder = async (folderId:any) => {
    console.log("Getting folders from")
    let result = await runSql(Folder.getFolderById,folderId)
    form.setValue("path", result.path)
    form.setValue("name", result.name)
    form.setValue("description", result.description)
    console.log('In React Renderer', result)
  }

  useEffect(() => {
    console.log(folderId)
    if (!isNew) getFolder(folderId)
  },[folderId])

  let selectFolder = useFileDialog()

  return (
    <>
      <Container className="mt-3">
        <Form id={name} >
          <Button id={"selectOsFolderBtn"} variant="success" type="button" onClick={async () => {
            let {path, name} = await selectFolder()
            form.setValue("path", path)
            form.setValue("name", name)
          }}>
            Select Folder
          </Button>

          <Form.Group className="mb-3" controlId="formPath">
            <Form.Label>Path</Form.Label>
            <Controller
              name="path"
              control={form.control}
              rules={{required: true}}
              render={({field}) => {
                console.log(field)
                return <Form.Control id={"form"+field.name} disabled {...field} />
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
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

          <Button id={"saveFolderBtn"} type="button" variant="primary" onClick={() => onSubmit()}>
            Save Changes
          </Button>

        </Form>
      </Container>
    </>
  )

}

