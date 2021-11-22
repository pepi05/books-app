import {
  Col,
  Container,
  Navbar,
  NavbarBrand,
  NavbarText,
  Row,
} from "reactstrap";

import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";

const Footer = () => {
  return (
    <div className="fixed-bottom">
      <Navbar color="dark" dark>
        <Container>
          <Row>
            <Col md={3}>
              <NavbarBrand>CITY LIBRARY</NavbarBrand>
            </Col>
            <Col md={6}>
              <div className="social-icons-container">
                <SiFacebook color="white" />
                <SiInstagram color="white" />
                <SiLinkedin color="white" />
              </div>
            </Col>
            <Col md={3}>
              <NavbarText>
                © 2021 Copyright: <i>City Library</i>
              </NavbarText>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default Footer;
