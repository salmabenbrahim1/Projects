//CheckoutForm.js
import React from 'react';

const CheckoutForm = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
      <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Informations de livraison</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Adresse de livraison"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Code postal"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
        </div>
  );
};

export default CheckoutForm;
