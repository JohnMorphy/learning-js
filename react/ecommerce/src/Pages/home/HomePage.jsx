import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';
import './HomePage.css'

import axios from 'axios'

export default function HomePage({ cart }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const respone = await axios.get('/api/products');
      setProducts(respone.data);
    }

    getHomeData();
  }, []);


  /*
  fetch('http://localhost:3000/api/products')
    .then(async (response) => {
      const productData = await response.json();
      console.log(productData);
    });*/

  return (
    <>
      <title>Ecommerce project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />


      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}