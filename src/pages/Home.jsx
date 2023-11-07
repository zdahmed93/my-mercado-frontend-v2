import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import ItemCard from '../components/ItemCard';

function Home() {
  const { list, error, isLoading } = useSelector(state => state.items)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return (
      <Alert variant="danger" className='m-5'>
        {error}
      </Alert>
    )
  }

  return (
    <Row>
      {list.map((item, i) => (
        <Col sm={6} md={4} lg={3} key={i} className='mb-4'>
          <ItemCard item={item} />
        </Col>
      ))}
    </Row>
  )
}

export default Home