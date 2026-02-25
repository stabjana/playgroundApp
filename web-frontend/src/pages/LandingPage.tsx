import "../App.css";

export default function ShopHome() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">Playground world</div>

        <nav className="nav-links">
          <a href="#">Location</a>
          <a href="#">Favourites</a>
          <a href="#">Age-groups</a>
        </nav>

        <div className="nav-actions">
          <span>➕</span>
          <span>🧑</span>
          <div className="avatar"></div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Are you ready for your next adventure?</h1>
          <p>Discover playgrounds for all age groups.</p>
          <div className="hero-actions">
          <button className="primary-btn">Playground finder</button>
          <button className="primary-btn">Search by age</button>
        </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="section">
        <h2>Categories</h2>
        <div className="grid">
          {["Tunnels", "Sandboxes", "Swings", "Slides"].map((cat) => (
            <div className="tile" key={cat}>
              <div className="image-placeholder"></div>
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        © 2026 KidsPlaygrounds
      </footer>
    </div>
  );
}