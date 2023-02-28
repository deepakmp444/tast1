import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import moment from "moment";
import NavBarComponent from "../components/NavBarComponent";
import { useNavigate } from "react-router-dom";
function CheckOut() {
  const [getGame, setGetGame] = useState([]);
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

  const dateStart = new Date(getGame.startEvent);
  console.log("dateStart:", dateStart);
  const dateStartSelected = new Date(startDate);

  const time_differenceStart = dateStartSelected - dateStart;

  // Convert time difference to seconds, minutes, hours, or days as needed
  const seconds_difference = time_differenceStart / 1000;
  console.log("seconds_difference:", seconds_difference);

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

  const current_utc_time = new Date(Date.now()).toUTCString();
  const other_utc_time = new Date("2023-02-28T18:30:00Z");

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
                    End Event:
                    <br />
                    {moment(getGame.startEvent).format("LLLL")}
                  </label>{" "}
                  <br />
                  <input
                    type="datetime-local"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
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
                    onChange={(e) => setStartDate(e.target.value)}
                  />
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
              <Button variant="success" className="mt-3 mb-3" onClick={()=>alert("Query done")}>
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
