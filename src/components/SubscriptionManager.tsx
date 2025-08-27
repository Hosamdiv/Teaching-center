import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserPlus, 
  FaCreditCard, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaSearch,
  FaFilter,
  FaDownload,
  FaEdit,
  FaTrash
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
      phone: '+966501234567',
      subscriptionType: 'monthly',
      amount: 199,
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
      phone: '+966507654321',
      subscriptionType: 'monthly',
      amount: 199,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'active',
      paymentMethod: 'تحويل بنكي',
      lastPayment: '2024-01-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newSubscription, setNewSubscription] = useState({
    studentName: '',
    email: '',
    phone: '',
    subscriptionType: 'monthly' as const,
    amount: 199,
    paymentMethod: 'بطاقة ائتمان'
  });

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.studentName.includes(searchTerm) || 
                         sub.email.includes(searchTerm) ||
                         sub.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSubscription = () => {
    if (!newSubscription.studentName || !newSubscription.email) return;

    const subscription: Subscription = {
      id: Date.now().toString(),
      ...newSubscription,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      lastPayment: new Date().toISOString().split('T')[0]
    };

    setSubscriptions([...subscriptions, subscription]);
    setNewSubscription({
      studentName: '',
      email: '',
      phone: '',
      subscriptionType: 'monthly',
      amount: 199,
      paymentMethod: 'بطاقة ائتمان'
    });
    setShowAddForm(false);
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'expired': return 'منتهي';
      case 'pending': return 'في الانتظار';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-right">إدارة الإشتراكات</h1>
        <p className="text-gray-600 text-right">تتبع الإشتراكات الشهرية والمدفوعات</p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="البحث عن طالب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            dir="rtl"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
          dir="rtl"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="expired">منتهي</option>
          <option value="pending">في الانتظار</option>
        </select>

        {/* Add Button */}
        <motion.button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 space-x-reverse"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUserPlus />
          <span>إضافة مشترك جديد</span>
        </motion.button>
      </div>

      {/* Add Subscription Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-right">إضافة مشترك جديد</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="اسم الطالب"
                value={newSubscription.studentName}
                onChange={(e) => setNewSubscription({...newSubscription, studentName: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                dir="rtl"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={newSubscription.email}
                onChange={(e) => setNewSubscription({...newSubscription, email: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                dir="rtl"
              />
              <input
                type="tel"
                placeholder="رقم الهاتف"
                value={newSubscription.phone}
                onChange={(e) => setNewSubscription({...newSubscription, phone: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                dir="rtl"
              />
              <select
                value={newSubscription.subscriptionType}
                onChange={(e) => setNewSubscription({...newSubscription, subscriptionType: e.target.value as any})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                dir="rtl"
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
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                dir="rtl"
              />
              <select
                value={newSubscription.paymentMethod}
                onChange={(e) => setNewSubscription({...newSubscription, paymentMethod: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                dir="rtl"
              >
                <option value="بطاقة ائتمان">بطاقة ائتمان</option>
                <option value="تحويل بنكي">تحويل بنكي</option>
                <option value="نقدي">نقدي</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddSubscription}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                إضافة
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطالب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نوع الإشتراك</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ البداية</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الانتهاء</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">آخر دفعة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription) => (
                <motion.tr
                  key={subscription.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{subscription.studentName}</div>
                      <div className="text-sm text-gray-500">{subscription.email}</div>
                      <div className="text-sm text-gray-500">{subscription.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {subscription.subscriptionType === 'monthly' ? 'شهري' : 
                     subscription.subscriptionType === 'quarterly' ? 'ربع سنوي' : 'سنوي'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {subscription.amount} ريال
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {new Date(subscription.startDate).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {new Date(subscription.endDate).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                      {getStatusText(subscription.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {new Date(subscription.lastPayment).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                    <div className="flex space-x-2 space-x-reverse">
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

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="text-right">
            <p className="text-sm text-gray-600">إجمالي المشتركين</p>
            <p className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="text-right">
            <p className="text-sm text-gray-600">المشتركين النشطين</p>
            <p className="text-2xl font-bold text-green-600">
              {subscriptions.filter(s => s.status === 'active').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="text-right">
            <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
            <p className="text-2xl font-bold text-blue-600">
              {subscriptions.reduce((sum, s) => sum + s.amount, 0)} ريال
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="text-right">
            <p className="text-sm text-gray-600">الإشتراكات المنتهية</p>
            <p className="text-2xl font-bold text-red-600">
              {subscriptions.filter(s => s.status === 'expired').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;
