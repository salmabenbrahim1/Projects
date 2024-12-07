import React from 'react';

const PaymentOptions = ({ paymentMethod, setPaymentMethod, formData, handleInputChange }) => {

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700">Choisissez votre mode de paiement</h3>

      {/* Payment Method Selection */}
      <div className="space-x-4 mt-2">
        {['Master Card', 'Visa Card', 'PayPal'].map(method => (
          <label key={method} className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={handlePaymentMethodChange}
              className="form-radio"
            />
            <span className="ml-2">{method}</span>
          </label>
        ))}
      </div>

      {/* Card Information Fields for Master Card or Visa Card */}
      {(paymentMethod === 'Master Card' || paymentMethod === 'Visa Card') && (
        <div className="mt-6">
          <input
            type="text"
            name="cardNumber"
            placeholder="Numéro de carte"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
          />
          <input
            type="text"
            name="cardExpiry"
            placeholder="Date d'expiration"
            value={formData.cardExpiry}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
          />
        </div>
      )}

      {/* PayPal Email Field */}
      {paymentMethod === 'PayPal' && (
        <div className="mt-6">
          <input
            type="email"
            name="paypalEmail"
            placeholder="Adresse e-mail PayPal"
            value={formData.paypalEmail}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
