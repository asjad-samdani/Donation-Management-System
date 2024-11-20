import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Register() {
  const navigator = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !username || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:8085/register", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigator("/");
        }, 1000);
      } else {
        toast.error(`Registration Failed:"+${data.message}`);
      }
    } catch (error) {
      toast.error(
        `An error occurred while registering, please try again later: ${error.message}`
      );
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        borderRadius: "4.5rem",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <MDBCard
        className="text-black"
        style={{
          borderRadius: "25px",
          maxWidth: "500px",
          width: "100%",
          maxHeight: "550",
          border: "1px solid #dee2e6",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <MDBCardBody>
          <MDBRow className="g-0">
            <MDBCol
              md="12"
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <p
                className="text-center h1 fw-bold mb-4 mt-4"
                style={{ color: "#343a40" }}
              >
                Sign Up
              </p>

              <div className="d-flex flex-row align-items-center mb-4 w-75 fw-bold">
                <MDBIcon
                  fas
                  icon="user me-3"
                  size="lg"
                  style={{ color: "#343a40" }}
                />
                <MDBInput
                  label="Your Name"
                  id="form1"
                  autoComplete="off"
                  type="text"
                  className="w-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 w-75  fw-bold">
                <MDBIcon
                  fas
                  icon="envelope me-3"
                  size="lg"
                  style={{ color: "#343a40" }}
                />
                <MDBInput
                  label="Your Username"
                  id="form2"
                  type="text"
                  autoComplete="off"
                  className="w-100"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 w-75 fw-bold">
                <MDBIcon
                  fas
                  icon="lock me-3"
                  size="lg"
                  style={{ color: "#343a40" }}
                />
                <MDBInput
                  label="Password"
                  id="form3"
                  type="password"
                  className="w-100"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <MDBBtn
                className="mb-4"
                size="lg"
                onClick={handleRegister}
                style={{
                  backgroundColor: "#343a40",
                  color: "#fff",
                  padding: "10px 40px",
                  borderRadius: "25px",
                  fontWeight: "bold",
                }}
              >
                Register
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <ToastContainer />
    </MDBContainer>
  );
}

export default Register;
