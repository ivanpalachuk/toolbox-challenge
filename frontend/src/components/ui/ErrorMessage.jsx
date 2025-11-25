import { Container, Alert } from 'react-bootstrap';
import { LABELS } from '../../constants';

const ErrorMessage = ({ message }) => (
  <Container className="mt-5">
    <Alert variant="danger">
      <Alert.Heading>{LABELS.ERROR_TITLE}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  </Container>
);

export default ErrorMessage;
