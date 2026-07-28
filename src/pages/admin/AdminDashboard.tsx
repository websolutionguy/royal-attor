import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'motion/react';
import {
  Crown,
  LogOut,
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Trash2,
  Edit,
  Plus,
  Phone,
  MapPin,
  Sparkles,
  RefreshCw,
  X,
  UserCheck,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Order, Product, VolumeOption } from '../../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../../data/products';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'analytics' | 'account'>('orders');

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Products State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch Orders from API (or local storage fallback)
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await axios.get('/api/orders');
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      }
    } catch (e) {
      // Fallback read from localStorage if offline
      const savedOrders = localStorage.getItem('royal_attar_admin_orders');
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch {}
      }
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  // Handle Order Status Update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await axios.patch(`/api/orders/${orderId}/status`, { status: newStatus });
    } catch (err) {
      console.warn('API update failed, updating local state');
    }

    setOrders((prev) => {
      const updated = prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o));
      localStorage.setItem('royal_attar_admin_orders', JSON.stringify(updated));
      return updated;
    });

    if (selectedOrderDetails && selectedOrderDetails.orderId === orderId) {
      setSelectedOrderDetails((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Handle Order Delete
  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm(`Are you sure you want to delete order #${orderId}?`)) return;

    try {
      await axios.delete(`/api/orders/${orderId}`);
    } catch (err) {
      console.warn('API delete failed, removing locally');
    }

    setOrders((prev) => {
      const updated = prev.filter((o) => o.orderId !== orderId);
      localStorage.setItem('royal_attar_admin_orders', JSON.stringify(updated));
      return updated;
    });

    if (selectedOrderDetails?.orderId === orderId) {
      setSelectedOrderDetails(null);
    }
  };

  // Metrics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const confirmedOrdersCount = orders.filter((o) => o.status === 'Confirmed' || o.status === 'Processing').length;

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const query = orderSearch.toLowerCase();
    const matchesQuery =
      order.orderId.toLowerCase().includes(query) ||
      order.customer.name.toLowerCase().includes(query) ||
      order.customer.phone.includes(query) ||
      order.customer.address.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#D4AF37]">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] pt-20 pb-16 text-white font-sans">
      {/* Top Admin Navigation Header */}
      <div className="bg-[#161616] border-b border-neutral-800 sticky top-16 z-30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#B8860B] to-[#D4AF37] p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#111111] rounded-[10px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold font-serif-luxury text-white">
                  Royal Attar Admin Control Panel
                </h1>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                  Session Active
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Logged in as: <span className="text-[#D4AF37]">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchOrders}
              className="px-3 py-1.5 rounded-lg bg-[#111111] border border-neutral-800 text-xs text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Orders</span>
            </button>

            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="px-4 py-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/80 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 border-t border-neutral-800/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Management</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-[#D4AF37] text-black font-mono font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Fragrance Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Sales & Revenue Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('account')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'account'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Admin Credentials</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Analytics Top Cards Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
              Total Revenue
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold font-mono text-[#D4AF37]">
                ৳{totalRevenue}
              </span>
              <DollarSign className="w-6 h-6 text-[#D4AF37]/40" />
            </div>
            <span className="text-[10px] text-neutral-500 block">From {totalOrdersCount} orders</span>
          </div>

          <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
              Total Orders
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold font-mono text-white">
                {totalOrdersCount}
              </span>
              <ShoppingBag className="w-6 h-6 text-neutral-600" />
            </div>
            <span className="text-[10px] text-neutral-500 block">All time customer orders</span>
          </div>

          <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
              Pending Orders
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold font-mono text-amber-400">
                {pendingOrdersCount}
              </span>
              <Clock className="w-6 h-6 text-amber-400/40" />
            </div>
            <span className="text-[10px] text-neutral-500 block">Awaiting confirmation</span>
          </div>

          <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
              Active Products
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold font-mono text-emerald-400">
                {products.length}
              </span>
              <Package className="w-6 h-6 text-emerald-400/40" />
            </div>
            <span className="text-[10px] text-neutral-500 block">Pure Attar Fragrances</span>
          </div>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#1A1A1A] p-4 rounded-2xl border border-neutral-800">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, Phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-[#111111] border border-neutral-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs uppercase text-neutral-500 font-bold shrink-0 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Status:
                </span>
                {['All', 'Pending', 'Confirmed', 'Processing', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'bg-[#111111] text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#111111] text-neutral-400 uppercase tracking-widest text-[10px] border-b border-neutral-800">
                    <tr>
                      <th className="p-4">Order ID & Date</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Items & Volumes</th>
                      <th className="p-4">Total Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-neutral-500">
                          No orders found matching your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr
                          key={order.orderId}
                          className="hover:bg-neutral-800/30 transition-colors cursor-pointer"
                          onClick={() => setSelectedOrderDetails(order)}
                        >
                          {/* ID & Date */}
                          <td className="p-4 whitespace-nowrap">
                            <span className="font-mono font-bold text-[#D4AF37] block">
                              #{order.orderId}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </td>

                          {/* Customer */}
                          <td className="p-4">
                            <span className="font-bold text-white block">
                              {order.customer.name}
                            </span>
                            <span className="text-[11px] text-[#D4AF37] font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {order.customer.phone}
                            </span>
                            <span className="text-[10px] text-neutral-400 truncate max-w-xs block">
                              {order.customer.address}
                            </span>
                          </td>

                          {/* Items Summary */}
                          <td className="p-4">
                            <div className="space-y-1">
                              {order.items.map((it, idx) => (
                                <div key={idx} className="flex items-center space-x-1.5 text-[11px]">
                                  <span className="text-white font-medium">{it.name}</span>
                                  <span className="bg-[#D4AF37]/15 text-[#D4AF37] px-1.5 py-0.2 rounded font-mono text-[9px]">
                                    {it.selectedVolume}
                                  </span>
                                  <span className="text-neutral-500">×{it.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </td>

                          {/* Grand Total */}
                          <td className="p-4 whitespace-nowrap">
                            <span className="text-sm font-extrabold font-mono text-[#D4AF37]">
                              ৳{order.grandTotal}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-emerald-400 block">
                              COD
                            </span>
                          </td>

                          {/* Interactive Status Selector */}
                          <td className="p-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateOrderStatus(
                                  order.orderId,
                                  e.target.value as Order['status']
                                )
                              }
                              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                                order.status === 'Pending'
                                  ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                                  : order.status === 'Confirmed'
                                  ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                                  : order.status === 'Processing'
                                  ? 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                                  : order.status === 'Completed'
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                                  : 'bg-red-950/80 text-red-300 border-red-500/40'
                              }`}
                            >
                              <option value="Pending" className="bg-[#111111] text-amber-300">
                                Pending
                              </option>
                              <option value="Confirmed" className="bg-[#111111] text-blue-300">
                                Confirmed
                              </option>
                              <option value="Processing" className="bg-[#111111] text-purple-300">
                                Processing
                              </option>
                              <option value="Completed" className="bg-[#111111] text-emerald-300">
                                Completed
                              </option>
                              <option value="Cancelled" className="bg-[#111111] text-red-300">
                                Cancelled
                              </option>
                            </select>
                          </td>

                          {/* Action Buttons */}
                          <td className="p-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setSelectedOrderDetails(order)}
                                className="p-1.5 rounded bg-neutral-800 hover:bg-[#D4AF37]/20 text-neutral-300 hover:text-[#D4AF37] transition-colors"
                                title="View Details"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(order.orderId)}
                                className="p-1.5 rounded bg-red-950/50 hover:bg-red-900 text-red-400 transition-colors"
                                title="Delete Order"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-2xl border border-neutral-800">
              <div>
                <h2 className="text-lg font-bold font-serif-luxury text-white">
                  Fragrance Inventory & Dynamic Variations
                </h2>
                <p className="text-xs text-neutral-400">
                  Manage attar prices across 10ml, 20ml, and 30ml flacons.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowAddProductModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#F9F1DC] via-[#D4AF37] to-[#B8860B] text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Attar</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-5 space-y-4 hover:border-[#D4AF37]/40 transition-all shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl bg-black shrink-0 border border-neutral-800"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-white font-serif-luxury truncate">
                            {product.name}
                          </h3>
                          {product.isBestseller && (
                            <span className="bg-[#D4AF37] text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                              Bestseller
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#D4AF37] font-mono">{product.category}</p>
                        <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Variations Grid */}
                    <div className="bg-[#111111] p-3 rounded-xl border border-neutral-800 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                        Volume Pricing:
                      </span>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center font-mono">
                        <div className="bg-neutral-900 p-1.5 rounded border border-neutral-800">
                          <span className="text-neutral-500 block text-[9px]">10ml</span>
                          <span className="text-[#D4AF37] font-bold">
                            ৳{product.variations['10ml']}
                          </span>
                        </div>
                        <div className="bg-neutral-900 p-1.5 rounded border border-neutral-800">
                          <span className="text-neutral-500 block text-[9px]">20ml</span>
                          <span className="text-[#D4AF37] font-bold">
                            ৳{product.variations['20ml']}
                          </span>
                        </div>
                        <div className="bg-neutral-900 p-1.5 rounded border border-neutral-800">
                          <span className="text-neutral-500 block text-[9px]">30ml</span>
                          <span className="text-[#D4AF37] font-bold">
                            ৳{product.variations['30ml']}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowAddProductModal(true);
                      }}
                      className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Fragrance</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete fragrance ${product.name}?`)) {
                          setProducts((prev) => prev.filter((p) => p.id !== product.id));
                        }
                      }}
                      className="text-xs text-red-400 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SALES ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold font-serif-luxury text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                Store Performance Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="bg-[#111111] p-5 rounded-2xl border border-neutral-800 space-y-2">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider block">
                    Average Order Value
                  </span>
                  <span className="text-3xl font-extrabold font-mono text-[#D4AF37]">
                    ৳
                    {totalOrdersCount > 0
                      ? Math.round(totalRevenue / totalOrdersCount)
                      : 0}
                  </span>
                </div>

                <div className="bg-[#111111] p-5 rounded-2xl border border-neutral-800 space-y-2">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider block">
                    Order Completion Rate
                  </span>
                  <span className="text-3xl font-extrabold font-mono text-emerald-400">
                    {totalOrdersCount > 0
                      ? Math.round(
                          (orders.filter((o) => o.status === 'Completed').length /
                            totalOrdersCount) *
                            100
                        )
                      : 100}
                    %
                  </span>
                </div>

                <div className="bg-[#111111] p-5 rounded-2xl border border-neutral-800 space-y-2">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider block">
                    Flat Delivery Collected
                  </span>
                  <span className="text-3xl font-extrabold font-mono text-white">
                    ৳{totalOrdersCount * 80}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ADMIN ACCOUNT INFO */}
        {activeTab === 'account' && (
          <div className="max-w-2xl mx-auto bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3 border-b border-neutral-800 pb-4">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
              <div>
                <h2 className="text-xl font-bold font-serif-luxury text-white">
                  Local JSON Admin Account
                </h2>
                <p className="text-xs text-neutral-400">
                  Managed strictly via local JSON file at <code className="text-[#D4AF37]">src/data/users.json</code>
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="bg-[#111111] p-4 rounded-xl border border-neutral-800 space-y-2">
                <span className="text-neutral-500 uppercase block text-[10px] font-bold">
                  User ID:
                </span>
                <span className="text-white">{user?.id || 'admin-1'}</span>
              </div>

              <div className="bg-[#111111] p-4 rounded-xl border border-neutral-800 space-y-2">
                <span className="text-neutral-500 uppercase block text-[10px] font-bold">
                  Email Address:
                </span>
                <span className="text-[#D4AF37] font-bold">{user?.email || 'admin@gmail.com'}</span>
              </div>

              <div className="bg-[#111111] p-4 rounded-xl border border-neutral-800 space-y-2">
                <span className="text-neutral-500 uppercase block text-[10px] font-bold">
                  Password Credential:
                </span>
                <span className="text-white">Admin!@#007</span>
              </div>

              <div className="bg-[#111111] p-4 rounded-xl border border-neutral-800 space-y-2">
                <span className="text-neutral-500 uppercase block text-[10px] font-bold">
                  Session Persistence Status:
                </span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle className="w-4 h-4" /> Active (Persisted in LocalStorage)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-[#D4AF37]/40 rounded-3xl p-6 max-w-lg w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white bg-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#D4AF37] font-bold">
                Order #{selectedOrderDetails.orderId}
              </span>
              <h3 className="text-xl font-bold font-serif-luxury text-white">
                Customer Shipping Details
              </h3>
            </div>

            <div className="bg-[#111111] p-4 rounded-2xl border border-neutral-800 space-y-3 text-xs">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Customer Name:</span>
                <span className="font-bold text-white">{selectedOrderDetails.customer.name}</span>
              </div>

              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Phone Number:</span>
                <a
                  href={`tel:${selectedOrderDetails.customer.phone}`}
                  className="font-bold text-[#D4AF37] font-mono hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {selectedOrderDetails.customer.phone}
                </a>
              </div>

              {selectedOrderDetails.customer.email && (
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Email:</span>
                  <span className="text-neutral-200">{selectedOrderDetails.customer.email}</span>
                </div>
              )}

              <div className="space-y-1 pt-1">
                <span className="text-neutral-400 block font-bold">Delivery Address:</span>
                <p className="text-neutral-200 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                  {selectedOrderDetails.customer.address}
                </p>
              </div>

              {selectedOrderDetails.customer.notes && (
                <div className="space-y-1 pt-1">
                  <span className="text-neutral-400 block font-bold">Order Notes:</span>
                  <p className="text-amber-300 italic bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20">
                    "{selectedOrderDetails.customer.notes}"
                  </p>
                </div>
              )}
            </div>

            {/* Itemized breakdown */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-neutral-400 block">
                Ordered Products:
              </span>
              <div className="space-y-2">
                {selectedOrderDetails.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-[#111111] rounded-xl border border-neutral-800 text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-10 h-10 object-cover rounded-lg bg-black"
                      />
                      <div>
                        <span className="font-bold text-white block">{it.name}</span>
                        <span className="text-[10px] text-[#D4AF37] font-mono">
                          {it.selectedVolume} × {it.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-white">
                      ৳{it.unitPrice * it.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-sm font-bold pt-2 border-t border-neutral-800">
              <span>Grand Total Payable:</span>
              <span className="font-mono text-[#D4AF37] text-lg">
                ৳{selectedOrderDetails.grandTotal}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-[#D4AF37]/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddProductModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white bg-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif-luxury text-white">
              {editingProduct ? 'Edit Fragrance' : 'Add New Fragrance'}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                const category = formData.get('category') as any;
                const p10 = Number(formData.get('p10'));
                const p20 = Number(formData.get('p20'));
                const p30 = Number(formData.get('p30'));
                const description = formData.get('description') as string;

                if (editingProduct) {
                  setProducts((prev) =>
                    prev.map((p) =>
                      p.id === editingProduct.id
                        ? {
                            ...p,
                            name,
                            category,
                            description,
                            variations: { '10ml': p10, '20ml': p20, '30ml': p30 },
                          }
                        : p
                    )
                  );
                } else {
                  const newP: Product = {
                    id: name.toLowerCase().replace(/\s+/g, '-'),
                    name,
                    tagline: 'Luxury Fragrance Oil',
                    description,
                    category,
                    image:
                      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
                    notes: {
                      top: 'Oriental Spices',
                      middle: 'Warm Resin',
                      base: 'Pure Cedar & Musk',
                    },
                    variations: { '10ml': p10, '20ml': p20, '30ml': p30 },
                  };
                  setProducts((prev) => [...prev, newP]);
                }
                setShowAddProductModal(false);
              }}
              className="space-y-4 text-xs"
            >
              <Input
                label="Fragrance Name"
                name="name"
                required
                defaultValue={editingProduct?.name || ''}
              />

              <div className="space-y-1">
                <label className="block uppercase font-bold text-neutral-300">Category</label>
                <select
                  name="category"
                  defaultValue={editingProduct?.category || 'Oud'}
                  className="w-full bg-[#111111] text-white border border-neutral-800 rounded-lg p-2.5 focus:border-[#D4AF37]"
                >
                  <option value="Oud">Oud</option>
                  <option value="Musk">Musk</option>
                  <option value="Floral">Floral</option>
                  <option value="Woody">Woody</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-neutral-400 font-mono">10ml Price (৳)</label>
                  <input
                    type="number"
                    name="p10"
                    required
                    defaultValue={editingProduct?.variations['10ml'] || 450}
                    className="w-full bg-[#111111] text-white border border-neutral-800 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono">20ml Price (৳)</label>
                  <input
                    type="number"
                    name="p20"
                    required
                    defaultValue={editingProduct?.variations['20ml'] || 800}
                    className="w-full bg-[#111111] text-white border border-neutral-800 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono">30ml Price (৳)</label>
                  <input
                    type="number"
                    name="p30"
                    required
                    defaultValue={editingProduct?.variations['30ml'] || 1100}
                    className="w-full bg-[#111111] text-white border border-neutral-800 rounded-lg p-2 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block uppercase font-bold text-neutral-300">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={editingProduct?.description || ''}
                  className="w-full bg-[#111111] text-white border border-neutral-800 rounded-lg p-2.5 focus:border-[#D4AF37]"
                />
              </div>

              <Button type="submit" fullWidth size="md">
                Save Fragrance
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
