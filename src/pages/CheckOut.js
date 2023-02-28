import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import moment from "moment";
import NavBarComponent from "../components/NavBarComponent";
import { useNavigate } from "react-router-dom";
function CheckOut() {
  const [getGame, setGetGame] = useState([]);
  console.log("getGame:", getGame.startEvent);
  const navigate = useNavigate();

  const [distance, setDistance] = useState([
    {
      id: 1,
      name: "Baghajatin, Kolkata, WB",
      Distance: "10km",
    },
    {
      id: 2,
      name: "Garia, Kolkata, WB",
      Distance: "20km",
    },
    {
      id: 3,
      name: "Sealdaha, Kolkata, WB",
      Distance: "15km",
    },
    {
      id: 4,
      name: "Jadavpur, Kolkata, WB",
      Distance: "25km",
    },
  ]);

  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const [getDistance, setGetDistance] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const games = JSON.parse(localStorage.getItem("game"));
    if (games) {
      setGetGame(games);
    }
  }, []);

  useEffect(() => {
    const gEmail = JSON.parse(localStorage.getItem("gEmail"));
    if (!gEmail) {
      navigate("/");
    }
  }, [navigate]);

  const calculateDistanceCharge = (value) => {
    setGetDistance(value);
    const dist = Array.from(value).splice(0, 2);
    const calDist = (dist[0] + dist[1]) * 2;
    if (calDist > 30) {
      const totalPrice = (calDist - 30) * 50 + 3000;
      setPrice(totalPrice);
    } else {
      setPrice(1500);
    }
  };

  // start date
  const date1 = new Date(startDate);
  const date2 = new Date(getGame.startEvent);
  const time_difference1 = date2 - date1;
  const seconds_difference = time_difference1 / 1000;


  //!! END date
  const date3 = new Date(endDate);
  const date4 = new Date(getGame.endEvent);
  const time_difference3 = date3 - date4;
  const seconds_differenc3 = time_difference3 / 1000;

  // console.log("Time difference in milliseconds:", time_difference);
  console.log("Time difference in seconds:", seconds_differenc3);

  // days and hour left
  const current_utc_time = new Date(Date.now()).toUTCString();
  const other_utc_time = new Date(getGame.endEvent);

  const time_difference = other_utc_time - new Date(current_utc_time);
  const days_difference = Math.floor(time_difference / (1000 * 60 * 60 * 24));
  const hours_difference = Math.floor(
    (time_difference / (1000 * 60 * 60)) % 24
  );

  return (
    <>
      <NavBarComponent />
      <Container>
        <h3 className="text-center mt-2">Checkout</h3>
        <Row style={{ marginTop: "80px" }}>
          <Col sm={3}></Col>
          <Col sm={6}>
            <Card className="p-3">
              <Row>
                <Col>
                  <label htmlFor="startEvent">
                    Start Event:
                    <br />
                    {moment(getGame.startEvent).format("LLLL")}
                  </label>{" "}
                  <br />
                  <input
                    type="datetime-local"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  {seconds_difference > 0 && seconds_difference < 86400 && (
                    <p className="text-danger">You choose wrong</p>
                  )}
                </Col>
                <Col>
                  <label htmlFor="endEvent">
                    End Event:
                    <br />
                    {moment(getGame.endEvent).format("LLLL")}
                  </label>{" "}
                  <br />
                  <input
                    type="datetime-local"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  {seconds_differenc3 > 86400 && (
                    <p className="text-danger">You choose wrong</p>
                  )}
                </Col>
              </Row>
              <h3 className="mt-3">Event Name: {getGame.gameName}</h3>

              <div>
                <p>Select Payment Methods:</p>
                <div style={{ marginTop: "-15px" }}>
                  <Form.Check
                    label="UPI"
                    type="radio"
                    value="UPI"
                    name="payment"
                  />
                  <Form.Check
                    label="Cash"
                    type="radio"
                    value="Cash"
                    name="payment"
                  />
                  <Form.Check
                    label="Online"
                    type="radio"
                    value="Online"
                    name="payment"
                  />
                  <Form.Check
                    label="Chaque"
                    type="radio"
                    value="Chaque"
                    name="payment"
                  />
                </div>
              </div>
              {getDistance ? (
                <p className="mt-3">
                  Transport charge Rs.{price}, Distance: {getDistance}
                </p>
              ) : (
                "Transport charge for select location"
              )}

              <Form.Select
                aria-label="Default select example"
                className="mt-2"
                onChange={(e) => calculateDistanceCharge(e.target.value)}
              >
                <option value="">Choose location</option>
                {distance.map((value) => {
                  return (
                    <option value={value.Distance} key={value.id}>
                      {value.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Button
                variant="success"
                className="mt-3 mb-3"
                onClick={() => alert("Query done")}
                disabled={seconds_differenc3 > 86400}
              >
                Make Query
              </Button>
              <p className="text-center text-muted">
                {days_difference} days {hours_difference} hours left
              </p>
            </Card>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </>
  );
}

export default CheckOut;
