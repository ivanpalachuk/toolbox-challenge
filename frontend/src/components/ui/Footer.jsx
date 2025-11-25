import { Container } from 'react-bootstrap';
import { LABELS } from '../../constants';

const Footer = () => (
  <footer
    style={{
      background: 'linear-gradient(135deg, #000000 0%, rgb(150, 47, 58) 100%)',
      padding: '12px 0',
    }}
    className="mt-auto"
  >
    <Container className="text-end">
      <p className="mb-0 text-white">
        <strong>{LABELS.FOOTER_NAME}</strong>
        <span style={{ margin: '0 15px' }}>|</span>
        {LABELS.FOOTER_PHONE}
        <span style={{ margin: '0 15px' }}>|</span>
        <a
          href={LABELS.FOOTER_LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ffffff', textDecoration: 'none' }}
        >
          LinkedIn
        </a>
      </p>
    </Container>
  </footer>
);

export default Footer;
