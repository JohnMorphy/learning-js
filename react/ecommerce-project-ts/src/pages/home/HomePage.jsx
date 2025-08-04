import { useEffect, useState } from 'react';

import Header from '../../../../ecommerce-project-ts/src/components/Header';
import ProductsGrid from './ProductsGrid';
import './HomePage.css'

import axios from 'axios'
import { useSearchParams } from 'react-router';

export default function HomePage({ cart, loadCart }) {

  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async (search) => {

      let response;
      if (search) {
        response = await axios.get(`/api/products?search=${search}`);
      } else {
        response = await axios.get(`/api/products`);
      }
      ``
      setProducts(response.data);
    }

    getHomeData(search);
  }, [search]);


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
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>

  );
}