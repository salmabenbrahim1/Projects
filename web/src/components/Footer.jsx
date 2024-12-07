//Footer

import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { assets } from "../assets/assets";

const FooterLinks = [
  {
    title: "La marque AS Shop",
    link: "/#",
  },
  {
    title: "Notre Histoire",
    link: "/#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-orange-400/40 text-black p-4">
      <div className="container mx-auto">
        {/* Company Details */}
        <div>
          <h1 className="text-xl font-bold flex items-center gap-1">
            <img src={assets.logo} alt="AS Shop Logo" className="w-8 h-8" />
            AS Shop
          </h1>
          <p className="mb-4">
            AS Shop est une boutique en ligne de vêtements créée par Asma et Salma, <br />
            offrant des pièces tendance et de qualité.
          </p>
        </div>

        {/* Footer Links and Social Icons */}
        <div className="flex justify-between">
          {/* Footer Links */}
          <div className="mr-8">
            <h2 className="text-lg font-bold mb-3">À PROPOS</h2>
            <ul className="flex flex-col gap-3">
              {FooterLinks.map((link) => (
                <li
                  className="text-gray-700 hover:text-orange-500 transition-transform duration-300 transform hover:translate-x-1"
                  key={link.title}
                >
                  <a href={link.link} className="text-decoration-none">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons and Address */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-orange-500 text-lg" />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebook className="text-orange-500 text-lg" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin className="text-orange-500 text-lg" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <FaMapLocationDot className="text-orange-500 text-lg" />
              <p>
                Adresse : AS Shop - Boutique en ligne, Tunis, Ariana, Tunisie
              </p>
            </div>
          </div>
        </div>

        <hr className="my-4" />
        <p className="text-gray-500 text-center">
          Copyright © 2024. Tous droits réservés par AS Shop-GROUP
        </p>
      </div>
    </footer>
  );
};

export default Footer;
