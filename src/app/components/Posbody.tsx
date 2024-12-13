"use client";
import { Button, Divider, Input, Modal, Select } from "antd";
import React, { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  qty: number;
  tax?: number;
  warehouse: string;
  category: string;
  brand: string;
};

function Posbody() {
  const [cart, setCart] = useState<Product[]>([]);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payment, setPayment] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState("paid");
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();

  const products: Product[] = [
    {
      id: 1,
      name: "New Demo Product",
      price: 110,
      qty: 1,
      tax: 10,
      warehouse: "Warehouse A",
      category: "Electronics",
      brand: "Brand X",
    },
    {
      id: 2,
      name: "Adaptateur Pot",
      price: 120,
      qty: 1,
      tax: 0,
      warehouse: "Warehouse B",
      category: "Home",
      brand: "Brand Y",
    },
    {
      id: 3,
      name: "Adaptateur Pot",
      price: 120,
      qty: 1,
      tax: 0,
      warehouse: "Warehouse A",
      category: "Home",
      brand: "Brand Z",
    },
    {
      id: 4,
      name: "Adaptateur Pot",
      price: 120,
      qty: 1,
      tax: 0,
      warehouse: "Warehouse C",
      category: "Garden",
      brand: "Brand Y",
    },
    {
      id: 5,
      name: "Adaptateur Pot",
      price: 120,
      qty: 1,
      tax: 0,
      warehouse: "Warehouse B",
      category: "Electronics",
      brand: "Brand X",
    },
  ];

  const warehouses = Array.from(new Set(products.map((product) => product.warehouse)));
  const categories = Array.from(new Set(products.map((product) => product.category)));
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  const filteredProducts = products.filter((product) => {
    return (
      (!selectedWarehouse || product.warehouse === selectedWarehouse) &&
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedBrand || product.brand === selectedBrand)
    );
  });

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

  const updateQty = (id: number, qtyChange: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + qtyChange) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const resetCart = () => {
    Modal.confirm({
      title: "Are you sure you want to reset the cart?",
      onOk: () => setCart([]),
    });
  };

  const handlePayNow = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setCart([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalTax = cart.reduce(
    (sum, item) => sum + (item.price * item.qty * (item.tax || 0)) / 100,
    0
  );
  const total = subtotal - (subtotal * discount) / 100 + shipping + totalTax;
  const changeReturn = receivedAmount - total;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          placeholder="Choose warehouse"
          onChange={(value) => setSelectedWarehouse(value)}
          className="w-full"
          allowClear
        >
          {warehouses.map((warehouse) => (
            <Select.Option key={warehouse} value={warehouse}>
              {warehouse}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Select category"
          onChange={(value) => setSelectedCategory(value)}
          className="w-full"
          allowClear
        >
          {categories.map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Select brand"
          onChange={(value) => setSelectedBrand(value)}
          className="w-full"
          allowClear
        >
          {brands.map((brand) => (
            <Select.Option key={brand} value={brand}>
              {brand}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Section */}
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
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
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">
                        <p>{item.name}</p>
                        <p className="text-sm text-gray-500">
                          TAX: {item.tax || 0}%
                        </p>
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="px-2 py-1 bg-red-500 text-white rounded"
                          >
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="px-2 py-1 bg-green-500 text-white rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        €{item.price.toFixed(2)}
                      </td>
                      <td className="p-2 text-center">
                        €
                        {(
                          item.price *
                          item.qty *
                          (1 + (item.tax || 0) / 100)
                        ).toFixed(2)}
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Subtotal:</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total Tax:</span>
                  <span>€{totalTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total Quantity:</span>
                  <span>{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
                </div>
                <div className="flex flex-col ">
                  <span className="font-bold">Discount (%):</span>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-2/4 text-center border rounded"
                  />
                </div>

                <div className="flex flex-col ">
                  <span className="font-bold">Shipping (€):</span>
                  <Input
                    type="number"
                    value={shipping}
                    onChange={(e) => setShipping(Number(e.target.value))}
                    className="w-2/4 text-center border rounded"
                  />
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-lg font-bold">Total: </span>
                  <span className="text-lg font-bold">
                    € {total.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={handlePayNow}
                  className="bg-green-600 text-white px-4 py-2 rounded shadow"
                >
                  Pay Now
                </button>
                <button
                  onClick={resetCart}
                  className="bg-red-600 text-white px-4 py-2 rounded shadow ml-4"
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded shadow flex flex-col items-center text-center"
            >
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="mb-2">Price: €{product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title="Make Payment"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bold">Received Amount:</label>
            <Input
              type="number"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(Number(e.target.value))}
              className="w-full text-center border rounded"
            />
          </div>
          <div>
            <label className="font-bold">Paying Amount:</label>
            <Input
              type="number"
              value={total}
              disabled
              className="w-full text-center border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="font-bold">Payment Type:</label>
            <Select
              value={paymentType}
              onChange={(value) => setPaymentType(value)}
              className="w-full"
            >
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Card">Card</Select.Option>
              <Select.Option value="Online">Online</Select.Option>
            </Select>
          </div>
          <div>
            <label className="font-bold">Payment Status:</label>
            <Input
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full text-center border rounded"
            />
          </div>
          <div>
            <label className="font-bold">Due Amount:</label>
            <Input
              type="number"
              value={Math.max(0, total - receivedAmount).toFixed(2)}
              disabled
              className="w-full text-center border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="font-bold">Change Return:</label>
            <Input
              type="number"
              value={Math.max(0, changeReturn).toFixed(2)}
              disabled
              className="w-full text-center border rounded bg-gray-100"
            />
          </div>
          <div className="col-span-2">
            <label className="font-bold">Notes:</label>
            <Input.TextArea className="w-full border rounded" rows={3} />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleCancel} className="mr-4">
            Cancel
          </Button>
          <Button type="primary" onClick={handleOk}>
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Posbody;
