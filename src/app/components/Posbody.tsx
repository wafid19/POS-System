"use client";
import { Button, Divider } from "antd";
import React from "react";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

function Posbody() {
  const [cart, setCart] = useState<Product[]>([]);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const products = [
    { id: 1, name: "New Demo Product", price: 110, qty: 1, tax: 10 },
    { id: 2, name: "Adaptateur Pot", price: 120, qty: 1, tax: 0 },
    { id: 3, name: "Adaptateur Pot", price: 120, qty: 1, tax: 0 },
    { id: 4, name: "Adaptateur Pot", price: 120, qty: 1, tax: 0 },
    { id: 5, name: "Adaptateur Pot", price: 120, qty: 1, tax: 0 },
    { id: 6, name: "Adaptateur Pot", price: 120, qty: 1, tax: 0 },
    { id: 7, name: "Adaptateur Pot", price: 120, qty: 1, tax: 0 },
    { id: 8, name: "Adaptateur Pot", price: 120, qty: 1, tax: 0 },
    { id: 9, name: "Adaptateur Pot", price: 120, qty: 1, tax: 0 },
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

  // const updateQty = (id: number, qty: number) => {
  //   setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));
  // };

  const updateQty = (id: number, qtyChange: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + qtyChange } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalTax = cart.reduce((sum, item: any) => {
    return sum + item.price * item.qty * (item.tax / 100);
  }, 0);

  return (
    <div>
      <div>
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cart Section */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Cart</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Item</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item: any) => (
                    <tr key={item.id} className="border-b">
                      <div>
                        <td className="p-2">{item.name}</td>
                        <p className="p-2 text-gray-400">
                          TAX: {item.tax} %(included)
                        </p>
                      </div>
                      <td className="p-2 gap-3">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="px-1 py-1 w-[40px] rounded border  text-white bg-green-600"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            updateQty(item.id, Number(e.target.value))
                          }
                          className="w-10 text-center border rounded"
                        />

                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="px-1 py-1 w-[40px] rounded border  text-white bg-green-600"
                        >
                          +
                        </button>
                      </td>
                      <td className="p-2">€{item.price.toFixed(2)}</td>
                      <td className="p-2 text-center">
                        €
                        {(item.price * item.qty * (1 + item.tax / 100)).toFixed(
                          2
                        )}
                      </td>

                      <td className="p-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center">
                <div>
                  <tr>
                    <td colSpan={3} className="text-right font-bold p-2">
                      Subtotal:
                    </td>
                    <td className="p-2 font-bold">
                      €
                      {cart
                        .reduce((acc, item) => acc + item.price * item.qty, 0)
                        .toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-right font-bold p-2">
                      Discount (%):
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="w-full text-center border rounded"
                      />
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-right font-bold p-2">
                      Shipping (€):
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={shipping}
                        onChange={(e) => setShipping(Number(e.target.value))}
                        className="w-full text-center border rounded"
                      />
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-right font-bold p-2">
                      Total:
                    </td>
                    <td className="p-2 font-bold">
                      €
                      {(
                        cart.reduce(
                          (acc, item) => acc + item.price * item.qty,
                          0
                        ) -
                        cart.reduce(
                          (acc, item) => acc + item.price * item.qty,
                          0
                        ) *
                          (discount / 100) +
                        shipping
                      ).toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </div>
                <div>
                  <p>Total Qty: {cart.length}</p>
                  <p>Total Tax: {totalTax}</p>
                  <p>
                    Sub-Total: €
                    {cart
                      .reduce((acc, item) => acc + item.price * item.qty, 0)
                      .toFixed(2)}
                  </p>
                  <Divider
                    style={{ borderColor: "#7cb305" }}
                    className="m-1"
                  ></Divider>
                  <p className="font-semibold">
                    Total: €
                    {(
                      cart.reduce(
                        (acc, item) => acc + item.price * item.qty,
                        0
                      ) -
                      cart.reduce(
                        (acc, item) => acc + item.price * item.qty,
                        0
                      ) *
                        (discount / 100) +
                      shipping +
                      totalTax
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-4">
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
    </div>
  );
}

export default Posbody;
