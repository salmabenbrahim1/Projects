import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { getAuth } from 'firebase/auth'; 
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { ShopContext } from '../context/ShopContext';
import { handleDelete } from '../controllers/ProductC';

const ProductItem = ({ id, img, title, price }) => {
  const { currency } = useContext(ShopContext);
  const [isAdmin, setIsAdmin] = useState(false); 
  const auth = getAuth();
  const user = auth.currentUser; // current user


  const checkAdminStatus = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.role === 'admin') {
            setIsAdmin(true); 
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };
  useEffect(() => {
    checkAdminStatus();
  }, [user]);

 


  return (
    <div className='relative'>
      
      {!isAdmin ? (
      <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div>
          <img className='hover:scale-110 transition ease-in-out' src={img} alt={title} />
        </div>
        <p className='pt-3 pb-1 text-sm'>{title}</p>
        <p className='font-medium text-sm'>{price}{currency}</p>
      </Link>): <Link to={`/edit-product/${id}`} className='text-gray-700 cursor-pointer'>
        <div>
          <img className='hover:scale-110 transition ease-in-out' src={img} alt={title} />
        </div>
        <p className='pt-3 pb-1 text-sm'>{title}</p>
        <p className='font-medium text-sm'>{price}{currency}</p>
      </Link>}

   
      {isAdmin && (
        <div className='absolute top-2 right-2 flex gap-2'>
          {/* Delete Button */}
          <button onClick={(e)=>handleDelete(id,e)} className='text-red-500 hover:text-red-700'>
            <FaTrash size={20} />
          </button>


        </div>
      )}
    </div>
  );
};

export default ProductItem;
