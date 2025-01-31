import React from "react";
import "./ContactComp.css";

const ContactComp = () => {
  const contactInfo = [
    { label: "Email", value: "support@tradesphere.com", link: true },
    { label: "Phone", value: "+020 24345678" },
    { label: "Office Address", value: "100 Bandra, Suite 500, near BSE, India" },
    { label: "Business Hours", value: "Monday - Friday: 9:00 AM - 5:00 PM" },
  ];

  return (
    <div className="contact-container">
      <h2 className="contact-header">Contact Us</h2>
      <div className="contact-info">
        {contactInfo.map((item, index) => (
          <div key={index}>
            <h4>{item.label}:</h4>
            <p>
              {item.link ? (
                <a href={`mailto:${item.value}`}>{item.value}</a>
              ) : (
                item.value
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="map-container">
        <h4>Find us on the map:</h4>
        <iframe
          title="office-location"
          loading="lazy"
          allowFullScreen
          className="map-frame"
          src="https://www.google.com/maps/embed/v1/place?q=123%20Financial%20Street,%20Finance%20City&key=YOUR_GOOGLE_MAPS_API_KEY"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactComp;