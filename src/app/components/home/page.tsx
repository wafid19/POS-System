"use client"

import React from 'react'
import { useState } from "react";

type Product = {
  id: any;
  name: string;
  price: number;
  qty: number;
};

function page() {
    const [cart, setCart] = useState<Product[]>([]);
    const [discount, setDiscount] = useState(0);
    const [shipping, setShipping] = useState(0);
  
    const products = [
      { id: 1, name: "New Demo Product", price: 110, qty:1 },
      { id: 2, name: "Adaptateur Pot", price: 120, qty:1 },
      // Add more products as needed
    ];
  
    const addToCart = (product: Product) => {
      const exists = cart.find((item) => item.id === product.id);
      if (exists) {
        setCart(
          cart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        );
      } else {
        setCart([...cart, { ...product, qty: 1 }]);
      }
    };
  
    const updateQty = (id: number, qty: number) => {
      setCart(
        cart.map((item) => (item.id === id ? { ...item, qty } : item))
      );
    };
  
    const removeItem = (id: number) => {
      setCart(cart.filter((item) => item.id !== id));
    };
  
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div>
        <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cart Section */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span>{item.name}</span>
              <input
                type="number"
                value={item.qty}
                onChange={(e) => updateQty(item.id, Number(e.target.value))}
                className="w-16 text-center border rounded"
              />
              <span>€{item.price * item.qty}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <label className="block mb-2">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full text-center border rounded"
            />
            <label className="block mt-2 mb-2">Shipping (€)</label>
            <input
              type="number"
              value={shipping}
              onChange={(e) => setShipping(Number(e.target.value))}
              className="w-full text-center border rounded"
            />
          </div>
          <div className="mt-4">
            <h3>Total: €{total - (total * discount) / 100 + shipping}</h3>
            <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded">
              Pay Now
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow flex flex-col items-center"
            >
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>Price: €{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default page