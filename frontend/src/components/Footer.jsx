import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>Company</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Blog</p>
        </div>

        <div>
          <h4>Support</h4>
          <p>Help Center</p>
          <p>Privacy Policy</p>
          <p>Terms</p>
        </div>

        <div>
          <h4>Services</h4>
          <p>Resume Builder</p>
          <p>Job Alerts</p>
          <p>Internships</p>
        </div>

        <div>
          <h4>Mobile App</h4>
          <button className="store-btn">Google Play</button>
          <button className="store-btn">App Store</button>
        </div>
      </div>

      <p className="copyright">
        © 2025 JobPortal | MERN Stack Project
      </p>
    </footer>
  );
};

export default Footer;