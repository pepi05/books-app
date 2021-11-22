import { useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";

const Profile = () => {
  const user = useSelector((state) => state.user.loggedUserInfo);
  const loading = useSelector((state) => state.user.loading);
  return (
    <>
      {!loading ? (
        <Container>
          <h2 className="sub-title"> MY PROFILE </h2>

          {user && (
            <Row className="justify-content-md-center">
              <Col xs md="3">
                <img
                  src="https://picsum.photos/318/180"
                  alt="profilepic"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "40px",
                  }}
                />
              </Col>

              <Col xs md="6">
                <Row>
                  <div className="custom-card-headers">
                    <h4>
                      {" "}
                      Name: <span>{user.user.name}</span>{" "}
                    </h4>
                  </div>
                </Row>
                <Row>
                  <div className="custom-card-headers">
                    <h4>
                      {" "}
                      Email: <span> {user.user.email} </span>
                    </h4>{" "}
                  </div>
                </Row>
              </Col>
            </Row>
          )}
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Profile;
