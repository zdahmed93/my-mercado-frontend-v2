import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

import { fetchItemById } from '../store/itemsSlice'


export default function ItemDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selected, isLoading, error } = useSelector(state => state.items)

  useEffect(() => {
    dispatch(fetchItemById(id))
  }, [dispatch, id])

  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  if (error) {
    return (
      <div className='alert alert-danger'>
        <h3>Item not found</h3>
      </div>
    )
  }

  if (selected) {
    return (
      <>
        <h1>Item details</h1>
        <img alt="item-img" className="mb-3 d-block mx-auto" style={{ maxWidth: 500 }} src={selected.photo} />
        <Table striped bordered hover style={{ maxWidth: 500 }} className="mx-auto">
          <tbody>
            <tr>
              <td>Title</td>
              <td> {selected.title} </td>
            </tr>
            <tr>
              <td>Description</td>
              <td> {selected.description} </td>
            </tr>
            <tr>
              <td>Price</td>
              <td> {selected.price} </td>
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
}