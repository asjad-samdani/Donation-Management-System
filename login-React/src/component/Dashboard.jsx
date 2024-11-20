import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Dashboard() {
  const [donations, setDonations] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("auth_token");
      if (!token) {
        navigate("/");
        return;
      }
      const loadingToastId = toast.loading("Loading donations...");

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8085/getdonation`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 403) {
          toast.error("Session expired");
          navigate("/");
          return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setDonations(data);
        } else {
          console.error("Expected an array but received:", data);
          setDonations([]);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
        setDonations([]);
      } finally {
        setLoading(false);
        toast.dismiss(loadingToastId);
      }
    };

    fetchData();
  }, [navigate]);

  const logout = () => {
    sessionStorage.removeItem("auth_token");
    setTimeout(() => {
      toast.success("Logout Successfully");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <button className="logout-button" onClick={logout}>
            <ExitToAppIcon /> Logout
          </button>
          <h2>DASHBOARD</h2>
          <button
            className="primary-button"
            onClick={() => navigate("/donation")}
          >
            Make a Donation
          </button>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount (INR)</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations && donations.length > 0 ? (
                donations.map((donation, index) => {
                  const date = new Date(donation.createdAt);
                  const formattedDateTime = date.toLocaleString("en-GB", {
                    weekday: "short",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  });
                  return (
                    <tr key={index}>
                      <td>{donation.month}</td>
                      <td>{donation.amount}</td>
                      <td>{donation.transactionID}</td>
                      <td>{formattedDateTime}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                    colSpan="4"
                  >
                    No donations found. Donate
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default Dashboard;
