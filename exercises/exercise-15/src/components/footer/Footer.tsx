import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="contact__social-media">
        <input type="text" defaultValue="Your Email" className="email__bar" />
        <p className="subscribe-btn">Subscribe</p>
      </div>
      <div className="features">
        <p className="feature">Best Sellers</p>
        <p className="feature">Gift Ideas</p>
        <p className="feature">New Releases</p>
        <p className="feature">Today's Deals</p>
        <p className="feature">Customer Service</p>
      </div>
      <div className="contact-phone">
        <p>Help Line Number : +1 1800 1200 1200</p>
      </div>
      <p className="copyright">
        &copy; All Rights Reserved. Designed by Free html Templates
      </p>
    </footer>
  );
}

export default Footer;
