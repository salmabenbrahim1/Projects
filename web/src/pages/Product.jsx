import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';
import EditProduct from './EditProduct';
import { handleAddToCart,handleDelete } from '../controllers/ProductC';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);

  //user authentication 
  const auth = getAuth();
  const user = auth.currentUser;
  
  const isAdmin = user?.email === "benbrahimsalma18@gmail.com";

  // Fetch the product data based on productId
  const fetchProductData = () => {
    const product = products.find((item) => item.id === productId); 
    if (product) {
      setProductData(product);
      setImage(product.img || "");
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setSizes(product.sizes);
    } else {
      console.log('Produit non trouvé');
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();
    } else {
      console.log('Pas de produits disponibles');
    }
  }, [productId, products]);


const handleAddToCartClick = () => {
  if (selectedSize) {
    handleAddToCart(productData.id, selectedSize, addToCart);  
  } else {
    toast.error("Veuillez sélectionner une taille avant d'ajouter au panier.");
  }
};


const handleDeleteProductClick = async (e) => {
  e.stopPropagation();

  try {
    await handleDelete(productData.id, e);
  } catch (error) {
    toast.error('Une erreur est survenue lors de la suppression.');
  }
};



  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="p-5 w-full sm:w-[80%]">
            <img
              className="w-full mb-2 h-auto"
              src={image || ""}
              alt={productData.title}
            />
          </div>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <>
              <EditProduct/>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold mb-2">{productData.title}</h1>
              <p className="text-xl font-bold mb-4">
                {productData.price} {currency}
              </p>
              <p className="text-gray-500 md:w-4/5">{productData.description}</p>

              {user && productData.userId === user.uid && (
                <div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-black text-white px-4 py-2 mt-4"
                  >
                    Modifier votre produit
                  </button>
                  <button
                    onClick={handleDeleteProductClick}
                    className="bg-red-500 text-white px-4 py-2 mt-4 ml-2"
                  >
                    Supprimer votre produit
                  </button>
                </div>
              )}

              {!isAdmin && (
                <div className="flex flex-col gap-4 my-8">
                  <p>Taille(s):</p>
                  <div className="flex gap-2">
                    {productData.sizes.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(item)}
                        className={`border py-2 px-4 bg-orange-100 ${item === selectedSize ? 'border-black' : ''}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isAdmin && (
                <button
                  onClick={handleAddToCartClick}
                  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                >
                  Ajouter au Panier
                </button>
              )}
            </>
          )}
          <hr className="mt-8 border-t-2" />
        </div>
      </div>
    </div>
  );
};

export default Product;
