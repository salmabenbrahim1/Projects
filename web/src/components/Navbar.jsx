import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import AuthPopup from "./AuthPopup";
import { IoMdSearch } from "react-icons/io";

const Navbar = ({ handleOrderPopup, userRole }) => {
  const [menu, setMenu] = useState("home");
  const [authPopup, setAuthPopup] = useState(false);
  const { getCartCount, isAuthenticated } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      setAuthPopup(true);
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="relative z-40 shadow-lg bg-white py-2">
      <div className="flex justify-between items-center px-4 sm:px-8">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="max-w-[80px]" />
        </Link>

        {/* Navbar Menu */}
        <ul className="flex gap-6 text-gray-600 text-base font-bold">
          {userRole === "admin" && (
            <Link to="/admin-dashboard" className="hover:text-orange-500">
              <p
                onClick={() => setMenu("dashboard")}
                className={`${menu === "dashboard" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Dashboard
              </p>
            </Link>
          )}
          {userRole !== "admin" && (
            <Link to="/" className="hover:text-orange-500">
              <p
                onClick={() => setMenu("home")}
                className={`${menu === "home" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Accueil
              </p>
            </Link>
          )}

          <Link to="/collection" className="hover:text-orange-500">
            <p
              onClick={() => setMenu("collection")}
              className={`${menu === "collection" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
            >
              Collection
            </p>
          </Link>

          {(userRole === "admin" || userRole === "user") && (
            <Link to="/ajouter-produit" className="hover:text-orange-500">
              <p
                onClick={() => setMenu("addproduct")}
                className={`${menu === "addProduct" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Ajouter un Produit
              </p>
            </Link>
          )}

          {userRole === "user" && (
            <Link to="/mes-produits" className="hover:text-orange-500">
              <p
                onClick={() => setMenu("myproducts")}
                className={`${menu === "myproducts" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Mes Produits
              </p>
            </Link>
          )}

          {userRole !== "admin" && (
            <Link to="/contact" className="hover:text-orange-500">
              <p
                onClick={() => setMenu("contact")}
                className={`${menu === "contact" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Contactez-Nous
              </p>
            </Link>
          )}
        </ul>

        {/* Navbar Right Section */}
        <div className="flex items-center gap-4">
          {(userRole === "user" || userRole === "admin") ? (
            <SearchBar />
          ) : (
            <button
              onClick={() => alert("Vous devez être connecté pour faire une recherche.")}
              className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
            >
              <IoMdSearch className="text-lg text-white" />
            </button>
          )}

          <button onClick={handleAccountClick} className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
            <span>Mon compte</span>
            <FaUser />
          </button>

          {userRole !== "admin" && (
            <Link to="/cart">
              <button
                onClick={isAuthenticated ? handleOrderPopup : handleAccountClick}
                className="relative flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
              >
                <span>Panier</span>
                <FaCartShopping />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Auth Popup */}
      <AuthPopup authPopup={authPopup} setAuthPopup={setAuthPopup} />
    </div>
  );
};

export default Navbar;
