
import { Folder } from 'main/enums/sqlipc';
import React, { useEffect } from 'react'

import { Button, Container, Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form';
import { useFileDialog, useSql } from '../hooks/utilHooks';


interface Props {
  form: any,
  name: string,
  isNew: boolean,
  folderId: number | null,
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
          <Button variant="success" type="button" onClick={async () => {
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
                return <Form.Control disabled {...field} />
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

