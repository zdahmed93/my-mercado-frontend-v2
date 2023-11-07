import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';

import { requestCreatingItem } from "../store/itemsSlice";


function CreateItem() {
  const { isLoading } = useSelector(state => state.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", Number(price))
    formData.append("photo", file)
    dispatch(requestCreatingItem({formData, navigate}))
  }

  return (
    <Container className="mt-3">
      <h1>Create New Item</h1>

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={description} onChange={e => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Form.Control type="file" accept="image/*" multiple={false} onChange={e => setFile(e.target.files[0])} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </Form.Group>

        <Button type="submit" className="mx-auto d-block w-100" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" /> : <span>Add</span>}
        </Button>

      </Form>
    </Container>
  )
}

export default CreateItem;