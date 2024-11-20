import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import qrCodeImage from "../assets/qr-code.jpeg";

function Donation() {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      let token = sessionStorage.getItem("auth_token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const getMe = await fetch("http://localhost:8085/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (getMe.status === 403) {
          toast.error("Session expired");
          navigate("/");
          return;
        }
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  const sendDonation = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("auth_token");

    try {
      const response = await fetch("http://localhost:8085/adddonation", {
        method: "POST",
        body: JSON.stringify({
          month,
          amount: Number(amount),
          transactionID,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseText = await response.text();

      if (response.status === 403) {
        toast.error("Session expired");
        navigate("/");
        return;
      }

      if (response.ok) {
        toast.success("Donation successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error("Donation failed: " + responseText);
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    }
  };

  const handleOnClick = () => {
    const upiText = "8389059095@ibl";
    window.navigator.clipboard
      .writeText(upiText)
      .then(() => {
        toast.success("UPI ID copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy UPI ID: " + err);
      });
  };

  return (
    <div className="container">
      <h2>Donate</h2>
      <form id="donateForm" className="donate-form" onSubmit={sendDonation}>
        <img src={qrCodeImage} width="150" alt="QR Code" />
        <div className="upi-section">
          <button
            id="upi-button"
            type="button"
            className="upi-pay1"
            onClick={handleOnClick}
          >
            Copy UPI ID
          </button>
          <p>6202519193@ybl</p>
        </div>

        <select
          style={{ margin: "10px" }}
          id="month"
          required
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in INR"
          required
        />
        <input
          type="text"
          id="transactionID"
          value={transactionID}
          onChange={(e) => setTransactionID(e.target.value)}
          placeholder="Transaction ID"
          required
        />
        <button className="primary-button" type="submit">
          Donate
        </button>
        <button
          className="unfocused-button"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Donation;
