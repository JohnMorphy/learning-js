import { useParams } from 'react-router';
import Header from '../../components/Header';
import ProgressBar from './ProgressBar';

import './TrackingPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

function getDeliveryProgress(estimatedDeliveryTImeMs, orderTimeMs) {

  const timePassed = dayjs().valueOf() - orderTimeMs;

  return Math.floor(((timePassed) / (estimatedDeliveryTImeMs - orderTimeMs)) * 100);
}

export default function TrackingPage({ cart }) {

  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      const response = await axios.get(`api/orders/${orderId}?expand=products`);
      setOrder(response.data);
      setProduct(response.data.products.find((product) => {
        return product.productId === productId;
      }))
    }

    getOrder();

  }, [orderId, productId])



  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />

      <Header cart={cart} />

      {product && (
        <div className="tracking-page">
          <div className="order-tracking">
            <a className="back-to-orders-link link-primary" href="/orders">
              View all orders
            </a>

            <div className="delivery-date">
              Arriving on {dayjs(product.estimatedDeliveryTimeMs).format('dddd MMMM, D')}
            </div>

            <div className="product-info">
              {product.product.name}
            </div>

            <div className="product-info">
              Quantity: {product.quantity}
            </div>

            <img className="product-image" src={product.product.image} />

            <ProgressBar progressPercentage={getDeliveryProgress(product.estimatedDeliveryTimeMs, order.orderTimeMs)} />

          </div>
        </div>
      )}

    </>
  );
}