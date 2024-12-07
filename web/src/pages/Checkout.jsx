import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import CheckoutForm from '../components/ChekoutForm';
import PaymentOptions from '../components/PayemetOptions';
import toast from 'react-hot-toast';
import CartDetails from '../components/CartDetails';
import { getAuth } from 'firebase/auth';
import { addCommand } from '../firebase/services/commandService';
import { sendEmail } from '../utils/emailService';

const Checkout = () => {
  const { getCartItemsDetails, calculateTotalPrice, currency } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cvv: '',
    paypalEmail: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [userId, setUserId] = useState(null);

  const items = getCartItemsDetails();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        toast.error("Vous devez être connecté pour passer une commande.");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleConfirmOrder = async (event) => {
    event.preventDefault();

    if (!userId) {
      toast.error("Vous devez être connecté pour passer une commande.");
      return;
    }

    const totalPrice = calculateTotalPrice();
    const selectedItems = items.map(item => ({
      id: item.id,
      title: item.title,
      quantity: item.sizes[Object.keys(item.sizes)[0]],
      paymentMethod,
      price: item.price,
    }));

    try {
      await addCommand(userId, selectedItems, totalPrice);
      toast.success('Commande passée avec succès !');

      sendEmail(formData, items, totalPrice, paymentMethod, currency);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de la commande.");
    }
  };

  const handleGoHome = () => window.location.href = '/';

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <CheckoutForm formData={formData} setFormData={setFormData} />
        <CartDetails
          items={items}
          calculateTotalPrice={calculateTotalPrice}
          currency={currency}
        />

        {/* the handleInputChange function */}
        <PaymentOptions
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* confirm Order Button */}
        <button
          onClick={handleConfirmOrder}
          className="mt-6 bg-orange-400 text-white py-2 px-6 rounded-md"
        >
          Confirmer la commande
        </button>

        {/* back to Homepage Button */}
        <button
          onClick={handleGoHome}
          className="mt-6 bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Checkout;
