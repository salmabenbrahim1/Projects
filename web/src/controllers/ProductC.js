import { toast } from "react-hot-toast";
import { addProduct } from "../firebase/services/productService";
import { handleImageUpload } from "../utils/imageUpload";
import { deleteProduct } from "../firebase/services/productService";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const fetchProductById = async (productId) => {
  try {
    const productDocRef = doc(db, 'products', productId);
    const productDocSnap = await getDoc(productDocRef);

    if (productDocSnap.exists()) {
      return productDocSnap.data();
    }
    console.error('Product not found.');
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchProductData = (products, productId, setProductData, setImage, setTitle, setDescription, setPrice, setSizes) => {
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

export const updateProductById = async (productId, updatedData) => {
  try {
    const productDocRef = doc(db, 'products', productId);
    await updateDoc(productDocRef, updatedData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const handleUpdateProduct = async (productId, title, description, price, sizes, image, setIsEditing) => {
  const productRef = doc(db, 'products', productId);
  try {
    await updateDoc(productRef, { title, description, price, sizes, img: image });
    toast.success('Produit mis à jour avec succès !');
    setIsEditing(false);
  } catch (error) {
    toast.error('There was an error updating the product.');
  }
};



const initialTailleState = { S: false, M: false, L: false, "36": false, "37": false, "38": false, "20": false, "21": false, "22": false };

export const handleAddProduct = async (formData, setFormData, setProducts) => {
  const { nom, description, prix, image, categorie, type, taille } = formData;

  if (!nom || !description || !prix || !categorie || !type) {
    toast.error("Tous les champs sont obligatoires !");
    return;
  }

  if (isNaN(prix) || prix <= 0) {
    toast.error("Le prix doit être un nombre positif !");
    return;
  }

  let imageUrl = "";

  // Upload the product image to Cloudinary
  if (image) {
    try {
      imageUrl = await handleImageUpload(image);
    } catch (error) {
      toast.error("Erreur lors de l'upload de l'image.");
      return;
    }
  }

  // Extract selected sizes
  const selectedSizes = Object.keys(taille).filter((size) => taille[size]);

  // Prepare product data
  const newProduct = {
    title: nom.trim(),
    description: description.trim(),
    price: parseFloat(prix),
    img: imageUrl || "No image",
    category: categorie,
    type,
    sizes: selectedSizes,
  };

  try {
    await addProduct(newProduct);
    toast.success("Produit ajouté avec succès !");
    setProducts((prev) => [...prev, newProduct]);

    setFormData({
      nom: "",
      description: "",
      prix: "",
      image: null,
      categorie: "",
      type: "",
      taille: initialTailleState,
    });
  } catch (error) {
    toast.error("Une erreur est survenue. Veuillez réessayer.");
  }
};


export const handleDelete = async (id, e) => {
  e.stopPropagation();

  try {
    await deleteProduct(id); 
   toast.success("Produit supprimé avec succès")
  } catch (error) {
    console.error('Failed to delete product:', error);
    toast.error("Le produit n'a pas pu être supprimé.");

  }
};

export const handleDeleteFromUser = async (id, products, setProducts) => {
  try {
    await deleteProduct(id);
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    alert("Produit supprimé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    alert("Le produit n'a pas pu être supprimé.");
  }
};

export const handleAddToCart = (productId, selectedSize, addToCart) => {
  if (selectedSize) {
    addToCart(productId, selectedSize);
  } else {
    toast.error("Veuillez sélectionner une taille avant d'ajouter au panier.");
  }
};

export const handleImageChange = async (e, setImage) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const imageUrl = await handleImageUpload(file);
      setImage(imageUrl);
    } catch (error) {
      toast.error("Erreur de téléchargement de l'image.");
    }
  }
};

