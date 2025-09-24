import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import SubscriptionManager from '../components/SubscriptionManager';
import VideoManager from '../components/VideoManager';
import { FaUsers, FaVideo, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';

type TabType = 'subscriptions' | 'videos' | 'analytics' | 'settings';

const Dashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('subscriptions');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (_email: string, _password: string) => {
    setIsLoading(true);
    console.log(_email);
    console.log(_password);

    // Simulate login delay
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // if (!isLoggedIn) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
  //       <LoginForm onLogin={handleLogin} isLoading={isLoading} />
  //     </div>
  //   );
  // }

  const tabs = [
    { id: 'subscriptions', name: 'الإشتراكات', icon: FaUsers, color: 'blue' },
    { id: 'videos', name: 'الفيديوهات', icon: FaVideo, color: 'green' },
    { id: 'analytics', name: 'الإحصائيات', icon: FaChartLine, color: 'purple' },
    { id: 'settings', name: 'الإعدادات', icon: FaCog, color: 'gray' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'subscriptions':
        return <SubscriptionManager />;
      case 'videos':
        return <VideoManager />;
      case 'analytics':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2 text-right">لوحة الإحصائيات</h1>
              <p className="text-gray-600 text-right">نظرة عامة على أداء المركز التعليمي</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="text-right">
                  <p className="text-sm text-gray-600">إجمالي الطلاب</p>
                  <p className="text-3xl font-bold text-blue-600">247</p>
                  <p className="text-xs text-green-600">+12% من الشهر الماضي</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="text-right">
                  <p className="text-sm text-gray-600">إجمالي الفيديوهات</p>
                  <p className="text-3xl font-bold text-green-600">89</p>
                  <p className="text-xs text-green-600">+5 فيديوهات جديدة</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="text-right">
                  <p className="text-sm text-gray-600">إجمالي المشاهدات</p>
                  <p className="text-3xl font-bold text-purple-600">12,456</p>
                  <p className="text-xs text-green-600">+23% من الشهر الماضي</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="text-right">
                  <p className="text-sm text-gray-600">الإيرادات الشهرية</p>
                  <p className="text-3xl font-bold text-orange-600">49,250 ريال</p>
                  <p className="text-xs text-green-600">+8% من الشهر الماضي</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-right">أكثر الفيديوهات مشاهدة</h3>
                <div className="space-y-3">
                  {[
                    { title: 'مقدمة في علم النفس', views: 1256, category: 'علم النفس' },
                    { title: 'الفلسفة اليونانية', views: 987, category: 'الفلسفة' },
                    { title: 'نظريات التعلم', views: 756, category: 'علم النفس' },
                    { title: 'المنطق الفلسفي', views: 654, category: 'الفلسفة' }
                  ].map((video, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{video.title}</p>
                        <p className="text-sm text-gray-600">{video.category}</p>
                      </div>
                      <span className="text-sm text-gray-500">{video.views} مشاهدة</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-right">توزيع الإشتراكات</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>شهري</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>ربع سنوي</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>سنوي</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2 text-right">الإعدادات</h1>
              <p className="text-gray-600 text-right">تخصيص إعدادات المركز التعليمي</p>
            </motion.div>

            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-right">إعدادات عامة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">اسم المركز</label>
                      <input
                        type="text"
                        defaultValue="مركز التدريس - علم النفس والفلسفة"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">البريد الإلكتروني</label>
                      <input
                        type="email"
                        defaultValue="info@teaching-center.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-right">إعدادات الإشتراكات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الإشتراك الشهري ([جنيه])</label>
                      <input
                        type="number"
                        defaultValue="199"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الإشتراك الربع سنوي (جنيه)</label>
                      <input
                        type="number"
                        defaultValue="549"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الإشتراك السنوي (جنيه)</label>
                      <input
                        type="number"
                        defaultValue="1999"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    حفظ الإعدادات
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="pt-24 pb-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handleLogout}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt />
              <span>تسجيل الخروج</span>
            </motion.button>

            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900">مرحباً بك في لوحة التحكم</h1>
              <p className="text-gray-600">إدارة مركز التدريس التعليمي</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8 space-x-reverse">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 space-x-reverse py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${isActive
                    ? `border-${tab.color}-500 text-${tab.color}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
