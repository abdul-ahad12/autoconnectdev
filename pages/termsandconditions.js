import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const terms = [
  {
    title: "1. Introduction",
    content:
      "Welcome to Auto LinkX, a platform that connects car owners with service providers for their automotive needs. By using our platform, you agree to adhere to the following terms and conditions.",
  },
  {
    title: "2. Definitions",
    content: (
      <ul className="list-disc ml-6">
        <li>
          <strong>Auto LinkX</strong>: Refers to the platform operated by
          [Auto LinkX], acting as a mediator between car owners and car service
          providers.
        </li>
        <li>
          <strong>User</strong>: Refers to any individual or entity using the
          Auto LinkX platform.
        </li>
        <li>
          <strong>Car Owner</strong>: Refers to users seeking automotive
          services for their vehicles.
        </li>
        <li>
          <strong>Provider</strong>: Refers to businesses or individuals
          offering automotive services registered on the Auto LinkX platform.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Service Provision",
    content: (
      <ul className="list-disc ml-6">
        <li>
          Auto LinkX serves as a mediator between car owners and service
          providers based on bookings made through our platform.
        </li>
        <li>
          We do not directly provide automotive services. Instead, we facilitate
          connections and bookings between users and service providers.
        </li>
        <li>
          Auto LinkX does not guarantee the quality, accuracy, or reliability of
          services provided by service providers. Users are encouraged to review
          service provider profiles and ratings before booking.
        </li>
      </ul>
    ),
  },
  {
    title: "4. User Responsibilities",
    content: (
      <ul className="list-disc ml-6">
        <li>
          By using Auto LinkX, users agree to provide accurate and up-to-date
          information during registration and booking processes.
        </li>
        <li>
          Users are responsible for maintaining the confidentiality of their
          account credentials and are liable for any activities conducted under
          their account.
        </li>
        <li>
          Car owners must accurately describe their automotive service needs
          when booking appointments to ensure appropriate matches with service
          providers.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Booking and Payments",
    content: (
      <ul className="list-disc ml-6">
        <li>
          Bookings made through Auto LinkX are subject to availability and
          confirmation by the service provider.
        </li>
        <li>
          Users agree to pay the agreed-upon fees for services rendered by
          service providers. Payment terms and methods may vary and will be
          communicated during the booking process.
        </li>
        <li>
          Auto LinkX may collect and process payments on behalf of service
          providers. In such cases, Auto LinkX acts solely as a payment
          facilitator.
        </li>
      </ul>
    ),
  },
  {
    title: "6. Cancellations and Refunds",
    content: (
      <ul className="list-disc ml-6">
        <li>
          Users may cancel bookings according to the cancellation policy
          specified by the service provider.
        </li>
        <li>
          Refunds, if applicable, will be processed based on the cancellation
          policy and any applicable terms outlined by the service provider.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Dispute Resolution",
    content: (
      <ul className="list-disc ml-6">
        <li>
          In the event of disputes between users and service providers, Auto
          LinkX may facilitate communication and mediation to resolve issues.
        </li>
        <li>
          Auto LinkX is not liable for disputes arising from services provided
          by service providers. However, we strive to ensure fair and
          satisfactory resolutions for all parties involved.
        </li>
      </ul>
    ),
  },
  {
    title: "8. Privacy and Data Protection",
    content: (
      <ul className="list-disc ml-6">
        <li>
          Auto LinkX respects user privacy and complies with applicable data
          protection laws.
        </li>
        <li>
          Data collected by Auto LinkX is used solely for the purpose of
          facilitating bookings and improving our services. We do not sell or
          share user data with third parties without consent.
        </li>
      </ul>
    ),
  },
];

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="w-full  p-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        {terms.map((term, index) => (
          <section key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{term.title}</h2>
            <div>{term.content}</div>
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
