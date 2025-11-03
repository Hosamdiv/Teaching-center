import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaVideo, FaChartLine, FaUserGraduate } from 'react-icons/fa';
import VideoManager from '../components/VideoManager';
import UsersPage from './dashboard/UsersPage';

type TabType = 'subscriptions' | 'videos' | 'analytics' | 'students';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('subscriptions');





  const tabs = [
    { id: 'subscriptions', name: 'الإشتراكات', icon: FaUsers, color: 'blue' },
    { id: 'videos', name: 'الفيديوهات', icon: FaVideo, color: 'green' },
    { id: 'analytics', name: 'الإحصائيات', icon: FaChartLine, color: 'purple' },
    {
      name: 'الطلاب',
      id: 'students',
      icon: FaUserGraduate, color: "emerald"
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'subscriptions':
        return
      case 'videos':
        return <VideoManager />
      case 'analytics':
        return (
          <div className=" mx-5 ">
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
      case 'students':
        return (
          <UsersPage />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
    <div className="w-full overflow-x-auto">
  <nav
    className="flex justify-center items-center space-x-8 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center"
  >
    {tabs.map((tab) => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.id;
      const colorClasses: Record<string, string> = {
        blue: 'border-blue-500 text-blue-600',
        green: 'border-green-500 text-green-600',
        purple: 'border-purple-500 text-purple-600',
        emerald: 'border-emerald-500 text-emerald-600',
      };

      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as TabType)}
          className={`flex items-center justify-center space-x-2 space-x-reverse py-3 px-2 border-b-2 font-medium text-sm transition-colors duration-200
            ${isActive
              ? colorClasses[tab.color]
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
        >
          <Icon className="w-4 h-4" />
          <span className="whitespace-nowrap">{tab.name}</span>
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
