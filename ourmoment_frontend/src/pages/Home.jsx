
import "../App.css";
import { Link } from "react-router-dom";


function App() {
  return (
    <div className="ourmoment">
      <nav className="navbar">
        <a href="/" className="brand">
          <span className="brand-heart">♥</span> OurMoment
        </a>

        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#about">Our idea</a>
          <a href="#create" className="nav-button">
            Create an invitation
          </a>
          <Link to="/login">Login</Link>
<Link to="/register">Register</Link>
        </div>
      </nav>

      <main>
        <section className="hero" id="about">
          <div className="hero-content">
            <span className="eyebrow">A LITTLE WEBSITE FOR A BIG FEELING</span>

            <h1>
              Some moments
              <br />
              deserve to be
              <br />
              <span>remembered.</span>
            </h1>

            <p className="hero-description">
              Turn your feelings into a beautiful invitation.
              Share it with someone special and let the moment unfold.
            </p>

            <a href="#create" className="primary-button">
              Create your moment <span>↗</span>
            </a>

            <p className="hero-note">
              Made with love, for the moments that matter.
            </p>
          </div>

          <div className="hero-art" aria-label="Romantic heart illustration">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="floating-heart heart-one">♥</div>
            <div className="floating-heart heart-two">♥</div>

            <div className="letter-card">
              <span className="letter-top">A LITTLE NOTE FOR YOU</span>
              <div className="letter-heart">♥</div>
              <h2>Will you make<br />a memory with me?</h2>
              <div className="letter-line"></div>
              <p>There is something special<br />about moments shared together.</p>
              <span className="letter-signature">With love ♡</span>
            </div>

            <span className="sparkle sparkle-one">✳</span>
            <span className="sparkle sparkle-two">✦</span>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <span className="eyebrow">SIMPLE AS A HEARTBEAT</span>
          <h2>Make it personal. Make it memorable.</h2>

          <div className="steps">
            <article className="step-card">
              <span className="step-number">01</span>
              <div className="step-icon">✍</div>
              <h3>Create your invitation</h3>
              <p>Write a personal note and choose the moment you want to share.</p>
            </article>

            <article className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon">♡</div>
              <h3>Share the link</h3>
              <p>Send your unique invitation link to someone who matters.</p>
            </article>

            <article className="step-card">
              <span className="step-number">03</span>
              <div className="step-icon">✉</div>
              <h3>Discover their answer</h3>
              <p>Let them open your invitation and respond to your question.</p>
            </article>
          </div>
        </section>

        <section className="create-section" id="create">
          <span className="eyebrow">YOUR STORY STARTS HERE</span>
          <h2>Have something special to ask?</h2>
          <p>Let's turn that thought into a moment worth remembering.</p>
          <button
            className="primary-button"
            onClick={() => alert("Next, we'll connect this button to registration and invitation creation.")}
          >
            Let's create something lovely <span>♡</span>
          </button>
        </section>
      </main>

      <footer className="footer">
        <a href="/" className="brand">
          <span className="brand-heart">♥</span> OurMoment
        </a>
        <p>Every beautiful story begins with a moment.</p>
      </footer>
    </div>
  );
}

export default App;