// Full Admin Panel with Cloudinary Upload and Category Dropdown
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
   const [newProduct, setNewProduct] = useState({
  title: "",
  price: "",
  image: null,
  category: "",
  id: "",
  stock: true,
  size: "",
  description: "",
});

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders");
    setOrders(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/products/categories");
    setCategories(res.data);
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "woodshope");
    data.append("cloud_name", "dadclqksp");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dadclqksp/image/upload",
        data
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed:", err.message);
      return null;
    }
  };

  const addProduct = async () => {
    let imageUrl = "";

    if (newProduct.image) {
      imageUrl = await uploadImageToCloudinary(newProduct.image);
    }

    const payload = {
      ...newProduct,
      image: imageUrl,
      price: Number(newProduct.price),
      id: Number(newProduct.id),
    };

    try {
      await axios.post("http://localhost:5000/api/products/add", [payload]);
      setNewProduct({
         title: "",
  price: "",
  image: null,
  category: "",
  id: "",
  stock: true,
  size: "",
  description: "",
      });
      fetchProducts();
    } catch (err) {
      console.error("Add product failed:", err.response?.data || err.message);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const updateOrderStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
    fetchOrders();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const toggleStock = async (id, currentStock) => {
    await axios.put(`http://localhost:5000/api/products/${id}`, { stock: !currentStock });
    fetchProducts();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-18 bg-gray-100 text-gray-900">
      <div className="w-full md:w-64 bg-[#1f2937] text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <button onClick={() => setActiveTab("users")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">👤 Users</button>
        <button onClick={() => setActiveTab("orders")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">📦 Orders</button>
        <button onClick={() => setActiveTab("products")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">🛒 Products</button>
      </div>

      <div className="flex-1 p-6 md:p-10 overflow-auto">
        {activeTab === "products" && (
          <div>
            <h3 className="text-3xl font-bold mb-6 text-purple-700">All Products</h3>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <input type="text" placeholder="Title" value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                className="border p-2 rounded-md w-full" />

              <input type="number" placeholder="Price" value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="border p-2 rounded-md w-full" />

              <input type="file" accept="image/*"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                className="border p-2 rounded-md w-full" />

              <select value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="border p-2 rounded-md w-full">
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <input type="text" placeholder="Size" value={newProduct.size}
  onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
  className="border p-2 rounded-md w-full" />

<input type="text" placeholder="Description" value={newProduct.description}
  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
  className="border p-2 rounded-md w-full" />


              <input type="number" placeholder="ID" value={newProduct.id}
                onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                className="border p-2 rounded-md w-full" />

              <button onClick={addProduct}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
                Add Product
              </button>
            </div>

            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product._id} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow p-4 rounded-md">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.title} className="w-16 h-16 object-contain rounded border" />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{product.title}</p>
                      <p className="text-sm text-gray-500">₹{product.price}</p>
                      {!product.stock && <p className="text-red-600 text-sm font-medium">Out of Stock</p>}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 md:mt-0">
                    <button onClick={() => toggleStock(product._id, product.stock)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md">
                      {product.stock ? "Mark Out of Stock" : "Restock"}
                    </button>
                    <button onClick={() => deleteProduct(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}


 {activeTab === 'users' && (
          <div>
            <h3 className="text-3xl font-bold mb-6 text-blue-700">All Users</h3>
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user._id} className="flex justify-between items-center bg-white shadow p-4 rounded-md">
                  <div className="text-lg font-medium">{user.name} <span className="text-gray-500">({user.email})</span></div>
                  <button onClick={() => deleteUser(user._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h3 className="text-3xl font-bold mb-6 text-green-700">All Orders</h3>
            <ul className="space-y-4">
             {orders.map((order) => (
  <li key={order._id} className="bg-white shadow p-4 rounded-md space-y-2">
    <div className="flex items-center gap-4">
      <img
        src={order.cartItems[0]?.image}
        alt="Product"
        className="w-20 h-20 object-cover rounded"
      />
      <div>
        <p className="font-semibold text-lg text-gray-800">
          {order.cartItems[0]?.title || "Product"}
        </p>
        <p className="text-gray-600">
          ₹{order.cartItems[0]?.price} x {order.cartItems[0]?.quantity}
        </p>
        <p className="text-gray-700 font-medium mt-1">
          Total: ₹{order.total}
        </p>
      </div>
    </div>

    <div>
      <strong>Customer:</strong> {order.shippingInfo?.fullName}
    </div>
    <div>
      <strong>Phone:</strong> {order.shippingInfo?.phone}
    </div>
    <div>
      <strong>Address:</strong>{" "}
      {`${order.shippingInfo?.street}, ${order.shippingInfo?.landmark}, ${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.state} - ${order.shippingInfo?.pincode}`}
    </div>
    <div>
      <strong>Status:</strong>{" "}
      <span className="text-blue-600">{order.status}</span>
    </div>
    <div>
      <strong>Date:</strong>{" "}
      {new Date(order.createdAt).toLocaleDateString()}
    </div>

    <div className="mt-4">
      <button
        onClick={() => updateOrderStatus(order._id, "Delivered")}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
      >
        Mark as Delivered
      </button>
    </div>
  </li>
))}

            </ul>
          </div>
        )}
        {/* Add Users and Orders tab logic as you had previously */}
      </div>
    </div>
  );
};

export default AdminPanel;
