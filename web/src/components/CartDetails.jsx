//CartDetails
import React from 'react';

const CartDetails = ({ items, calculateTotalPrice, currency }) => {
  return (
    <>
      <div className="space-y-6 mt-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-36 h-35 sm:w-49 sm:h-45 object-cover rounded-md mx-auto"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Prix : <span className="font-medium">{item.price} {currency}</span>
                </p>
                {Object.entries(item.sizes).map(([size, quantity]) => (
                  <div key={size} className="mt-2">
                    <p className="text-sm text-gray-600">Taille : {size}</p>
                    <p className="text-sm text-gray-600">Quantité : {quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Affichage du total */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-lg font-semibold text-gray-700">Total :</span>
          <span className="text-xl font-bold text-gray-800">
            {calculateTotalPrice()} {currency}
          </span>
        </div>
    </>
  );
};

export default CartDetails;
