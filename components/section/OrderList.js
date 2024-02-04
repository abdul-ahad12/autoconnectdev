import React from 'react'
import Order from './Order';

const OrdersList = () => {
    return (
      <div className="w-full flex justify-center">
        <div className="w-[80%] flex-col flex gap-5">
          <Order />
          <Order />
          <Order />
        </div>
      </div>
    );
  };
  
export default OrdersList