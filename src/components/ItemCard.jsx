import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avatar from './Avatar';
import DeleteItemModal from './DeleteItemModal';

function ItemCard({ item }) {
  const { details: userDetails } = useSelector(state => state.user)
  return (
    <Card>
      <Card.Img variant='top' className='card-img' src={item.photo} />
      <Card.Body>
        <Card.Title className='text-truncate'>{item.title}</Card.Title>
        <Card.Text className='text-truncate'>{item.description}</Card.Text>
        <Badge pill bg='primary'>{item.price} TND</Badge>

        <div className='d-flex justify-content-center text-primary gap-2'>

          <Link to={`/items/${item._id}`} target='_blank' >
            <i className="bi bi-box-arrow-up-right text-primary h3"></i>
          </Link>

          {userDetails?._id === item.user._id && (
            <>
              <Link to={`/update-item/${item._id}`}>
                <i className="bi bi-pencil-square text-warning h3"></i>
              </Link>
              <DeleteItemModal item={item} />
            </>
          )}
          
        </div>

        <Avatar user={item.user} />
      </Card.Body>
    </Card>
  )
}

export default ItemCard