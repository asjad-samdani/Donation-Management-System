import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");

    if (token) {
      const checkAuth = async () => {
        try {
          const getMe = await fetch("http://localhost:8085/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (getMe.status == 200) {
            navigator("/dashboard");
          } else {
            navigator("/");
          }
        } catch (error) {
          console.log(error);
        }
      };
      checkAuth();
    }
  }, [navigator]);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please fill in both fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("auth_token", data.token);
        toast.success("Login successful!");
        setTimeout(() => {
          navigator("/dashboard");
        }, 1000);
      } else {
        toast.error(`Login failed: ${data.message}`);
      }
    } catch (error) {
      toast.error(
        `An error occurred. Please try again later: ${error.message}`
      );
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-5"
      style={{
        borderRadius: "4.5rem",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className=" my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase text-dark">Login</h2>
              <p className="text-dark mb-5 fw-bold">
                Please enter your login and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-dark-100 fw-bold"
                label="Enter Username"
                id="formControlLgEmail"
                type="email"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-dark-100 fw-bold"
                label="Password"
                id="formControlLgPassword"
                type="password"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* <p className="large mb-3 pb-lg-2">
                <a className="text-dark-100" href="#!">
                  Forgot password?
                </a>
              </p> */}
              <MDBBtn
                outline
                className="mx-2 px-5 fw-bold"
                color="dark"
                size="lg"
                onClick={handleLogin}
              >
                Login
              </MDBBtn>

              {/* <div className="d-flex flex-row mt-3 mb-5">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "dark" }}
                >
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="twitter" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="google" size="lg" />
                </MDBBtn>
              </div> */}

              <div>
                <p className="mt-4 fw-bold">
                  Don&apos;t have an account?
                  <Link to="/register" className="text-dark-100 fw-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default Login;
