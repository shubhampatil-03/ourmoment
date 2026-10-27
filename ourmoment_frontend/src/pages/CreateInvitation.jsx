
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function CreateInvitation() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    recipientName: "",
    title: "",
    message: "",
    occasion: "Date",
    eventDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setShareUrl("");

    try {
        const requestData = {
  ...form,
  eventDate: form.eventDate
    ? `${form.eventDate}T00:00:00`
    : null,
};

const response = await api.post("/invitations", requestData);
      //const response = await api.post("/invitations", form);
      const data = response.data;

      // Supports common token property names.
      const token =
        data.shareToken ?? data.token ?? data.invitationToken;

      if (token) {
        setShareUrl(
          `${window.location.origin}/invitation/${token}`
        );
      }

      toast.success("Invitation created successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Could not create invitation. Please try again.";

      toast.error(message);
      console.error("Create invitation error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Invitation link copied!");
    } catch {
      toast.error("Could not copy the link. Please copy it manually.");
    }
  }

  return (
    <main className="invitation-page">
      <section className="invitation-card">
        <Link to="/" className="back-home">
          ← Back home
        </Link>

        <h1>Create Your Invitation 💌</h1>
        <p>Make a special invitation for someone important.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="recipientName">Recipient name</label>
          <input
            id="recipientName"
            name="recipientName"
            value={form.recipientName}
            onChange={handleChange}
            required
            placeholder="Who is this invitation for?"
          />

          <label htmlFor="title">Invitation title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="A special date with you"
          />

          <label htmlFor="message">Personal message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Write something from your heart..."
          />

          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={form.occasion}
            onChange={handleChange}
            required
          >
            <option value="Date">Date</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Birthday">Birthday</option>
            <option value="Special Surprise">Special Surprise</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="eventDate">Event date</label>
          <input
            id="eventDate"
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Invitation 💖"}
          </button>
        </form>

        {shareUrl && (
          <section className="share-result">
            <h2>Your invitation is ready!</h2>
            <p>Copy this link to share your invitation:</p>
            <input readOnly value={shareUrl} />
            <button type="button" onClick={copyLink}>
              Copy invitation link
            </button>
          </section>
        )}
      </section>
    </main>
  );
}

export default CreateInvitation;
