import { Container, Navbar } from 'react-bootstrap';
import { LABELS } from '../../constants';

const Header = () => {
  return (
    <Navbar
      expand="lg"
      style={{
        background: 'linear-gradient(135deg, rgb(150, 47, 58) 0%, #000000 100%)',
        padding: '12px 0',
      }}
      className="mb-4"
    >
      <Container className="d-flex align-items-center">
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img
            src="/logo-toolbox.svg"
            alt="Toolbox Logo"
            style={{ height: '32px', marginRight: '16px' }}
          />
          <span style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '500' }}>
            {LABELS.APP_SUBTITLE}
          </span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
