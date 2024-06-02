// UserFormPopup.js
import React, { useState } from "react";
import axios from "axios";
// import "../styles/popup.css";

const UserFormPopup = ({ onClose, setUserID }) => {
  console.log("Yaha tak");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    occupation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/newuser", formData);
      // Call setUserID with the new user's ID from the response
      setUserID(response.data.userId);
      console.log("inside user form", response.data.userId);
      // Handle success (e.g., close the pop-up)
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-600 font-semibold">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-semibold"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="occupation"
              className="block text-gray-600 font-semibold"
            >
              Occupation:
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              placeholder="Enter your occupation"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.occupation}
              onChange={(e) =>
                setFormData({ ...formData, occupation: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserFormPopup;
