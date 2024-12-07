// utils/emailService
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

export const sendEmail = async (formData, items, totalPrice, method, currency) => {
  const formattedItems = items.map(item => `${item.title} - ${Object.entries(item.sizes).map(([s, q]) => `Taille ${s}: Quantité ${q}`).join(', ')}`).join('\n');

  const emailData = {
    name: formData.name,
    email: formData.email,
    address: formData.address,
    city: formData.city,
    postalCode: formData.postalCode,
    paymentMethod: method,
    items: formattedItems,
    totalPrice,
    currency
  };

  try {
    await emailjs.send(
      'service_8n3fd99',
      'template_2tm0j1e',
      emailData,
      'QHNLRut0hrp0tJLAZ'
    );
    toast.success('E-mail envoyé avec succès !');
  } catch (error) {
    toast.error("Échec de l'envoi de l'email.");
  }
};
