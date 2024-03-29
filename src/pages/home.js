import React from "react";
import axios from "axios";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
//import CardImage from "../molekul/cardImage";
import image1 from "../images/—Pngtree—delicious food_568171 1.png";
//import image2 from "../—Pngtree—lettuce_1175257 1.png";
import { useSelector } from "react-redux";
function Home() {
  const [listPhoto, setListPhoto] = React.useState([]);
  const [name, setName] = React.useState("");
  const [search, setSearch] = React.useState(null);
  const { profile } = useSelector((state) => state?.auth);

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const [filter, setFilter] = React.useState("DESC");

  function handleAddrTypeChange(e) {
    setFilter(e.target.value);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target[0].value);
  };

  React.useEffect(() => {
    if (search !== null) {
      window.location.href = `/search/${search}`;
    }
  });

  React.useEffect(() => {
    if (profile) {
      setName(profile?.name);
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/recipe/get5data?filter=${filter}`)
      .then((res) => {
        setListPhoto(res.data);
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  }, [listPhoto]);

  return (
    <div className="App">
      <div className="backround-color">
        <div className="mb-5 ">
          <Container fluid>
            <Row className="mb-4"></Row>
            <Row style={{ paddingLeft: 40 }}>
              <Col xs={1}>
                <a href="/" className="pages-link">
                  Home
                </a>
              </Col>
              <Col xs={1}>
                <a href="/addRecipe" className="pages-link">
                  Add Recipe
                </a>
              </Col>
              <Col xs={1}>
                <a href="/profile" className="pages-link">
                  Profile
                </a>
              </Col>
              <Col md={{ span: 3, offset: 6 }}>
                <h1 className="pages-link">{name} </h1>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="mb-5">
          <Container>
            <Row>
              <Col xs={6}>
                <div className="mt-5 flex-center-horizontal flex-center-vertical h-50">
                  <div>
                    <div className="main-title box-position">
                      <h1>Discover Recipe & Delicious Food</h1>
                    </div>
                    <div>
                      <Form onSubmit={handleSearch} className="box-position">
                        <Form.Control
                          type="text"
                          placeholder="Search Recipe"
                          className="paragraph"
                        />
                      </Form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="flex-center-horizontal">
                  <img src={image1} alt="vegetable" className="vegetable" />
                </div>
              </Col>
            </Row>
            <div className="mt-5 mb-5 box-position ">
              <div className="flex-center-vertical">
                <div className="square "></div>
                <h1 className="sub-title mt-5 mb-5 "> New Recipe</h1>
              </div>
              <Row>
                <div className="d-flex justify-content-start mb-2">
                  <span>
                    <h5>Sort By:</h5>
                  </span>
                  <select
                    defaultValue={filter}
                    onChange={handleAddrTypeChange}
                    className="Default select example "
                    style={{
                      borderRadius: "10px",
                      marginLeft: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    <option selected value="DESC">
                      Newest
                    </option>
                    <option value="ASC">Latest</option>
                  </select>
                </div>
                {listPhoto?.map((item) => (
                  <Col xs={3} className="mb-4">
                    <Card className="text-dark">
                      <Card.Img
                        src={item?.image}
                        alt="Card image"
                        className="photo-recipe"
                        style={{
                          objectFit: "cover",
                          boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.12)",
                          width: "100%",
                        }}
                      />
                      <Card.ImgOverlay
                        className="flex-bottom-vertical"
                        style={{
                          color: "#FFFFFF",
                          textShadow: "1px 2px 3px rgba(0,0,0,0.42)",
                        }}
                      >
                        <Card.Title>{item?.title_recipe}</Card.Title>
                      </Card.ImgOverlay>
                    </Card>
                    <div className="mt-2 ">
                      <a href={"/detail/" + item?.id} className="pages-link">
                        <Button className="paragraph" variant="warning">
                          Learn More
                        </Button>
                      </a>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </div>
        <div className="mt-5">
          <Card className=" footer">
            <Card.Body>
              <h1 className="flex-center-horizontal mt-5 mb-3">
                Eat, Cook, Repeat
              </h1>
              <p className="flex-center-horizontal paragraph mb-5">
                Share your best recipe by uploading here !
              </p>
              <div className="flex-center-vertical flex-center-horizontal mt-5 ">
                <p className="flex-center-horizontal little-paragraph padding-space">
                  Product
                </p>
                <p className="flex-center-horizontal little-paragraph padding-space">
                  Company
                </p>
                <p className="flex-center-horizontal little-paragraph padding-space">
                  Learn more
                </p>
                <p className="flex-center-horizontal little-paragraph padding-space">
                  Get in touch
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
