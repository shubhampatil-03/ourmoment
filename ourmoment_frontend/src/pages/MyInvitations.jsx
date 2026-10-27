
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "./MyInvitations.css";

function MyInvitations() {
  const navigate = useNavigate();

  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchInvitations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/invitations/my");
        setInvitations(response.data);
      } catch (err) {
        if (err.response?.status === 401 ||
            err.response?.status === 403) {
          setError("Your session may have expired. Please log in again.");
        } else {
          setError("Unable to load invitations. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, [navigate]);

  const copyShareLink = async (shareToken) => {
    const shareUrl =
      `${window.location.origin}/invitation/${encodeURIComponent(shareToken)}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Invitation link copied!");
    } catch {
      toast.error("Could not copy the link. Please copy it from the address bar.");
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date not set";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return dateValue;

    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatus = (status) => {
    if (status === "ACCEPTED") {
      return { label: "Accepted ❤️", className: "status-accepted" };
    }

    if (status === "DECLINED") {
      return { label: "Declined", className: "status-declined" };
    }

    return { label: "Awaiting response", className: "status-pending" };
  };

  return (
    <main className="my-invitations-page">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">YOUR LITTLE LOVE STORIES</p>
          <h1>My Invitations <span>♥</span></h1>
          <p className="dashboard-subtitle">
            Every invitation is a chance to create a special moment.
          </p>
        </div>

        <Link className="create-new-button" to="/create-invitation">
          + Create Invitation
        </Link>
      </header>

      {loading && (
        <div className="dashboard-message">Loading your invitations...</div>
      )}

      {!loading && error && (
        <div className="dashboard-message dashboard-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && invitations.length === 0 && (
        <section className="empty-invitations">
          <div className="empty-heart">♡</div>
          <h2>Your story starts here</h2>
          <p>You haven't created any invitations yet.</p>
          <Link to="/create-invitation" className="create-new-button">
            Create your first invitation
          </Link>
        </section>
      )}

      {!loading && !error && invitations.length > 0 && (
        <>
          <div className="invitation-count">
            {invitations.length} invitation{invitations.length !== 1 ? "s" : ""}
          </div>

          <section className="invitation-grid">
            {invitations.map((invitation) => {
              const status = getStatus(invitation.responseStatus);

              return (
                <article
                  className="dashboard-invitation-card"
                  key={invitation.id}
                >
                  <div className="dashboard-card-top">
                    <span className="occasion-label">
                      {invitation.occasion || "Special moment"}
                    </span>

                    <span className={`status-badge ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <h2>{invitation.title || "You're Invited!"}</h2>

                  <p className="dashboard-recipient">
                    For <strong>{invitation.recipientName}</strong>
                  </p>

                  <p className="dashboard-date">
                    <span>📅</span> {formatDate(invitation.eventDate)}
                  </p>

                  <p className="dashboard-message-preview">
                    {invitation.message}
                  </p>

                  <div className="dashboard-card-actions">
                    <Link
                      className="view-invitation-button"
                      to={`/invitation/${encodeURIComponent(invitation.shareToken)}`}
                    >
                      View invitation
                    </Link>

                    <button
                      className="copy-link-button"
                      onClick={() => copyShareLink(invitation.shareToken)}
                      disabled={!invitation.shareToken}
                    >
                      Copy link
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}

export default MyInvitations;
