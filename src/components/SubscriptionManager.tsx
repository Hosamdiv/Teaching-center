

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUserPlus, FaSearch, FaEdit, FaTrash
} from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

interface Subscription {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  subscriptionType: 'monthly' | 'quarterly' | 'yearly';
  amount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  paymentMethod: string;
  lastPayment: string;
}

const SubscriptionManager: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      studentName: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '+201234567890',
      subscriptionType: 'monthly',
      amount: 200,
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      status: 'active',
      paymentMethod: 'بطاقة ائتمان',
      lastPayment: '2024-01-01'
    },
    {
      id: '2',
      studentName: 'فاطمة علي',
      email: 'fatima@example.com',
      phone: '+201234567891',
      subscriptionType: 'quarterly',
      amount: 500,
      startDate: '2024-01-01',
      endDate: '2024-04-01',
      status: 'active',
      paymentMethod: 'تحويل بنكي',
      lastPayment: '2024-01-01'
    },
    {
      id: '3',
      studentName: 'محمد أحمد',
      email: 'mohamed@example.com',
      phone: '+201234567892',
      subscriptionType: 'yearly',
      amount: 1800,
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      status: 'active',
      paymentMethod: 'بطاقة ائتمان',
      lastPayment: '2024-01-01'
    }
  ]);

  const [newSubscription, setNewSubscription] = useState<Omit<Subscription, 'id'>>({
    studentName: '',
    email: '',
    phone: '',
    subscriptionType: 'monthly',
    amount: 0,
    startDate: '',
    endDate: '',
    status: 'pending',
    paymentMethod: '',
    lastPayment: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'pending'>('all');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddSubscription = () => {
    if (newSubscription.studentName && newSubscription.email && newSubscription.amount > 0) {
      const subscription: Subscription = {
        ...newSubscription,
        id: Date.now().toString(),
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        lastPayment: new Date().toISOString().split('T')[0]
      };
      
      setSubscriptions([...subscriptions, subscription]);
      setNewSubscription({
        studentName: '',
        email: '',
        phone: '',
        subscriptionType: 'monthly',
        amount: 0,
        startDate: '',
        endDate: '',
        status: 'pending',
        paymentMethod: '',
        lastPayment: ''
      });
      setIsAddingNew(false);
    }
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSubscribers = subscriptions.length;
  const activeSubscribers = subscriptions.filter(sub => sub.status === 'active').length;
  const expiredSubscribers = subscriptions.filter(sub => sub.status === 'expired').length;
  const totalRevenue = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">إدارة الاشتراكات</h2>
            <p className="text-gray-600">سجل وإدارة اشتراكات الطلاب</p>
          </div>
          <motion.button
            onClick={() => setIsAddingNew(true)}
            className="inline-flex items-center space-x-2 space-x-reverse px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUserPlus className="w-5 h-5" />
            <span>إضافة اشتراك جديد</span>
          </motion.button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">إجمالي المشتركين</p>
                <p className="text-3xl font-bold">{totalSubscribers}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FaUserPlus className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">المشتركين النشطين</p>
                <p className="text-3xl font-bold">{activeSubscribers}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FaUserPlus className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">الاشتراكات المنتهية</p>
                <p className="text-3xl font-bold">{expiredSubscribers}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FaUserPlus className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold">${totalRevenue}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FaUserPlus className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث عن طالب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-80 pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="expired">منتهي</option>
              <option value="pending">في الانتظار</option>
            </select>
          </div>
        </div>

        {/* Add New Subscription Form */}
        <AnimatePresence>
          {isAddingNew && (
            <motion.div
              className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">إضافة اشتراك جديد</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="اسم الطالب"
                  value={newSubscription.studentName}
                  onChange={(e) => setNewSubscription({...newSubscription, studentName: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={newSubscription.email}
                  onChange={(e) => setNewSubscription({...newSubscription, email: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  value={newSubscription.phone}
                  onChange={(e) => setNewSubscription({...newSubscription, phone: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newSubscription.subscriptionType}
                  onChange={(e) => setNewSubscription({...newSubscription, subscriptionType: e.target.value as any})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="monthly">شهري</option>
                  <option value="quarterly">ربع سنوي</option>
                  <option value="yearly">سنوي</option>
                </select>
                <input
                  type="number"
                  placeholder="المبلغ"
                  value={newSubscription.amount}
                  onChange={(e) => setNewSubscription({...newSubscription, amount: Number(e.target.value)})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newSubscription.paymentMethod}
                  onChange={(e) => setNewSubscription({...newSubscription, paymentMethod: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">طريقة الدفع</option>
                  <option value="بطاقة ائتمان">بطاقة ائتمان</option>
                  <option value="تحويل بنكي">تحويل بنكي</option>
                  <option value="نقدي">نقدي</option>
                </select>
              </div>
              <div className="flex items-center justify-end space-x-3 space-x-reverse mt-4">
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleAddSubscription}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  إضافة
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subscriptions Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطالب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نوع الاشتراك</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الانتهاء</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscriptions.map((subscription, index) => (
                  <motion.tr
                    key={subscription.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {subscription.studentName.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">{subscription.studentName}</div>
                          <div className="text-sm text-gray-500">{subscription.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subscription.subscriptionType === 'monthly' && 'شهري'}
                      {subscription.subscriptionType === 'quarterly' && 'ربع سنوي'}
                      {subscription.subscriptionType === 'yearly' && 'سنوي'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${subscription.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                        subscription.status === 'expired' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subscription.status === 'active' && 'نشط'}
                        {subscription.status === 'expired' && 'منتهي'}
                        {subscription.status === 'pending' && 'في الانتظار'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(subscription.endDate).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSubscription(subscription.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;
