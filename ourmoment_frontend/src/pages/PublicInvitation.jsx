
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./PublicInvitation.css";

function PublicInvitation() {
  const { token } = useParams();

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/invitations/public/${encodeURIComponent(token)}`
        );

        setInvitation(response.data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            "This invitation could not be found. Please check the link."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [token]);

  const handleResponse = async (choice) => {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const response = await api.post(
        `/invitations/public/${encodeURIComponent(token)}/response`,
        { response: choice }
      );

      setInvitation(response.data);
      setSuccess(
        choice === "ACCEPTED"
          ? "You said yes! What a beautiful moment. ❤️"
          : "Your response has been recorded."
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "We couldn't submit your response. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date to be decided";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return dateValue;

    return date.toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <main className="invitation-page">
        <div className="invitation-card">
          <div className="heart-icon">♥</div>
          <p>Opening something special for you...</p>
        </div>
      </main>
    );
  }

  if (error && !invitation) {
    return (
      <main className="invitation-page">
        <div className="invitation-card">
          <div className="heart-icon">♡</div>
          <h1>Invitation not found</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  const alreadyResponded =
    invitation.responseStatus === "ACCEPTED" ||
    invitation.responseStatus === "DECLINED";

  return (
    <main className="invitation-page">
      <article className="invitation-card">
        <div className="heart-icon">♥</div>

        <p className="invitation-eyebrow">
          A LITTLE SOMETHING JUST FOR YOU
        </p>

        <h1>{invitation.title || "You're Invited!"}</h1>

        <p className="recipient-name">
          Dear {invitation.recipientName},
        </p>

        <div className="invitation-message">
          {invitation.message}
        </div>

        <div className="invitation-details">
          <p>
            <span>Occasion</span>
            <strong>{invitation.occasion || "A special moment"}</strong>
          </p>

          <p>
            <span>When</span>
            <strong>{formatDate(invitation.eventDate)}</strong>
          </p>
        </div>

        {error && <p className="invitation-error">{error}</p>}
        {success && <p className="invitation-success">{success}</p>}

        {alreadyResponded ? (
          <div className="response-recorded">
            <p>
              {invitation.responseStatus === "ACCEPTED"
                ? "❤️ You accepted this invitation."
                : "Your response was recorded."}
            </p>
          </div>
        ) : (
          <div className="invitation-actions">
            <p className="response-prompt">
              So... what do you say?
            </p>

            <button
              className="accept-button"
              disabled={submitting}
              onClick={() => handleResponse("ACCEPTED")}
            >
              {submitting ? "Sending..." : "Yes, absolutely! ❤️"}
            </button>

            <button
              className="decline-button"
              disabled={submitting}
              onClick={() => handleResponse("DECLINED")}
            >
              No, thank you
            </button>
          </div>
        )}

        <p className="invitation-footer">
          Made with love · OurMoment
        </p>
      </article>
    </main>
  );
}

export default PublicInvitation;
