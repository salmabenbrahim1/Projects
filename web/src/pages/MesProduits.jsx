import React, { useEffect, useState } from "react";
import { fetchUserProducts, deleteProduct } from "../firebase/services/productService";
import { getAuth } from "firebase/auth";
import ProductItem from "../components/ProductItem";
import { useNavigate } from "react-router-dom";  
import { handleDeleteFromUser } from "../controllers/ProductC";

const MesProduits = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      fetchUserProducts(user.uid)
        .then(setProducts)
        .catch(console.error);
    }
  }, []);

  const handleDelete = (id) => {
    handleDeleteFromUser(id, products, setProducts);
  };


  const handleEdit = (productId) => {
      navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mes Produits</h2>

      {/* Display User's Products */}
      <div className="mt-8">
        <ul>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {products.map((item, index) => (
              <ProductItem
                key={index}
                id={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MesProduits;
