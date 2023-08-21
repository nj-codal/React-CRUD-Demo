import { Col, Container, Row } from "reactstrap";

const CardWrapper = ({ children, title }) => (
  <Container fluid="sm" className="mt-4">
    <Row>
      <Col
        md={{
          offset: 3,
          size: 6,
        }}
        sm="12"
      >
        {title && <h1 className="text-center">{title}</h1>}
        {children}
      </Col>
    </Row>
  </Container>
);

export default CardWrapper;
