import { useState } from "react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState({});
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userID = import.meta.env.VITE_EMAILJS_USER_ID;

  const validate = () => {
    const errors = {};
    if (!firstName) errors.firstName = "First Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(phoneNumber)) errors.phoneNumber = "Phone number must be 10 digits";
    if (!details) errors.details = "Details are required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const formData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      details,
    };

    // Using EmailJS to send the email
    emailjs
      .send(serviceId, templateId, formData, userID)
      .then(
        (response) => {
          toast.success("Your inquiry has been sent!");
          // Reset the form fields
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNumber("");
          setDetails("");
        },
        (err) => {
          toast.error("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full bg-gray-100 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-xl mx-auto">
          {/* Section Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-500 sm:text-4xl">
              Contact us
            </h1>
            <p className="mt-1 text-green-700">
              We would love to talk about how we can help you.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          {/* Contact Form */}
          <div className="flex flex-col border border-gray-200 rounded-xl p-6 lg:p-8 shadow-md bg-white">
            <h2 className="mb-8 text-xl font-semibold text-gray-800">
              Fill in the form
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Form Fields */}
              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="hs-firstname-contacts-1"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="hs-firstname-contacts-1"
                      className={`py-3 px-4 block w-full border ${errors.firstName ? "border-red-500" : "border-gray-400"} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="hs-lastname-contacts-1"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="hs-lastname-contacts-1"
                      className={`py-3 px-4 block w-full border ${errors.lastName ? "border-red-500" : "border-gray-400"} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="hs-email-contacts-1"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="hs-email-contacts-1"
                      autoComplete="email"
                      className={`py-3 px-4 block w-full border ${errors.email ? "border-red-500" : "border-gray-400"} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="hs-phone-number-1"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="hs-phone-number-1"
                      className={`py-3 px-4 block w-full border ${errors.phoneNumber ? "border-red-500" : "border-gray-400"} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label
                    htmlFor="hs-about-contacts-1"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Details
                  </label>
                  <textarea
                    id="hs-about-contacts-1"
                    name="details"
                    rows="4"
                    className={`py-3 px-4 block w-full border ${errors.details ? "border-red-500" : "border-gray-400"} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  ></textarea>
                  {errors.details && (
                    <p className="text-sm text-red-500">{errors.details}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition"
                >
                  Send inquiry
                </button>
              </div>

              {/* Footer Note */}
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-500">
                  We will get back to you in 1-2 business days.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
