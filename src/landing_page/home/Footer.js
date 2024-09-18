import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Left-aligned: About section */}
          <div className="col-md-4 d-flex justify-content-start">
            <div>
              <h5>About Us</h5>
              <p>
                We provide real-time disaster alerts and safety information to help you stay informed and safe.
              </p>
            </div>
          </div>

          {/* Center-aligned: Quick links */}
          <div className="col-md-4 text-center">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Home</a></li>
              <li><a href="#" className="text-white">Dashboard</a></li>
              <li><a href="#" className="text-white">Helpline</a></li>
              <li><a href="#" className="text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Right-aligned: Contact information */}
          <div className="col-md-4 d-flex justify-content-end">
            <div className="text-end">
              <h5>Contact Us</h5>
              <p>
                Email: info@disasterportal.com<br />
                Phone: +1 234 567 890
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <p className="mb-0">&copy; 2024 Disaster Alert Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
