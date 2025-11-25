import { Container, Spinner } from 'react-bootstrap';
import { LABELS } from '../../constants';

const Loading = () => (
  <Container className="mt-5 text-center">
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">{LABELS.LOADING_SR}</span>
    </Spinner>
    <p className="mt-3 text-muted">{LABELS.LOADING_TEXT}</p>
  </Container>
);

export default Loading;
