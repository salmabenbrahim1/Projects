import React, { useContext, useEffect, useState } from 'react';
import './Populaire.css';
import { ShopContext } from '../../context/ShopContext';
import ProductItem from '../ProductItem';

const Populaire = () => {
    const { products } = useContext(ShopContext);
    const [populaire, setPopulaire] = useState([]);


    useEffect(() => {
        if (products?.length) {
            // Sélection les 4 premiers produits
            const popularItems = products.slice(0, 4); 
            setPopulaire(popularItems);
        }
    }, [products]);

    return (
        <div className='populaire'>
            <h1>MEILLEURE SÉLECTION POUR VOUS</h1>
            <hr />

            <div className='populaire-item'>
                {populaire.length > 0 ? (
                    populaire.map((item, index) => (
                        <ProductItem
                            key={item.id || index}
                            id={item.id}
                            img={item.img}
                            title={item.title}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className='no-products'>Aucun produit disponible pour le moment.</p>
                )}
            </div>
        </div>
    );
}

export default Populaire;
