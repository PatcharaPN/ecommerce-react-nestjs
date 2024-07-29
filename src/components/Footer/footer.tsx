import "./Footer.css";
export const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-list">
          <p>Shop</p>
          <ul>
            <li>Refer a Friend</li>
            <li>Payment method</li>
            <li>Gift Cards</li>
            <li>Shipping method</li>
          </ul>
        </div>
        <div className="footer-list">
          <p>Help</p>
          <ul>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Accessibility</li>
          </ul>
        </div>
        <div className="footer-list">
          <p>About</p>
          <ul>
            <li>Careers</li>
            <li>Wholesale</li>
            <li>Our Story</li>
            <li>Shipping</li>
          </ul>
        </div>
        <div className="footer-list"></div>
      </div>
      <div className="footer-copyright">
        <p>Copy right 2024</p>
        <div className="footer-group1">
          <p>Term of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};
