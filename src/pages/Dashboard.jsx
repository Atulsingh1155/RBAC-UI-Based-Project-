import React, { useState } from 'react';
import { Users, Shield, Lock, Activity, Globe, ChevronRight, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('users');

  const companyStats = [
    { 
      icon: Globe, 
      label: 'Global Presence', 
      value: '12+ Countries',
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      textColor: 'text-cyan-300'
    },
    { 
      icon: Shield, 
      label: 'Secured Endpoints', 
      value: '1M+ Protected',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/20',
      textColor: 'text-green-300'
    },
    { 
      icon: Activity, 
      label: 'Threat Monitoring', 
      value: '500K+ Hours',
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      textColor: 'text-purple-300'
    }
  ];

  const sectionContent = {
    users: {
      title: 'User Management',
      description: 'Comprehensive user lifecycle management and access control.',
      features: [
        'Add, edit, and remove user accounts',
        'Set individual user permissions',
        'Monitor user activity and login history'
      ]
    },
    roles: {
      title: 'Role & Permissions',
      description: 'Granular access control and role-based permissions.',
      features: [
        'Create custom roles',
        'Define detailed permission sets',
        'Implement principle of least privilege'
      ]
    },
    security: {
      title: 'Security Overview',
      description: 'Advanced security monitoring and threat detection.',
      features: [
        'Real-time threat detection',
        'Endpoint protection',
        'Comprehensive security logs'
      ]
    }
  };

  const menuItems = [
    { 
      key: 'users', 
      icon: Users, 
      label: 'User Management',
      activeColor: 'bg-cyan-500/30 text-cyan-300',
      hoverColor: 'hover:bg-cyan-500/20 hover:text-cyan-200'
    },
    { 
      key: 'roles', 
      icon: Lock, 
      label: 'Role & Permissions',
      activeColor: 'bg-green-500/30 text-green-300',
      hoverColor: 'hover:bg-green-500/20 hover:text-green-200'
    },
    { 
      key: 'security', 
      icon: Shield, 
      label: 'Security Overview',
      activeColor: 'bg-purple-500/30 text-purple-300',
      hoverColor: 'hover:bg-purple-500/20 hover:text-purple-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex flex-col md:flex-row bg-gray-950">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-gray-800/70 backdrop-blur-lg border-r border-gray-700 p-6 md:max-w-[280px]">
        <div className="flex items-center mb-12 space-x-4 justify-center md:justify-start">
          <div className="bg-cyan-500 p-2 rounded-full transition-all hover:rotate-45 hover:scale-110">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-cyan-300 hidden md:block">VRV Security</h1>
        </div>

        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 group
                ${activeSection === item.key 
                  ? item.activeColor
                  : `text-gray-400 ${item.hoverColor}`
                } hover:scale-105 active:scale-95 transform`}
            >
              <div className="flex items-center">
                <item.icon className="mr-3 group-hover:rotate-6 transition-transform" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 overflow-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {companyStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className={`${stat.bgColor} rounded-xl p-6 flex items-center space-x-5 
                  transform transition-all hover:scale-105 hover:shadow-2xl 
                  group cursor-pointer`}
              >
                <IconComponent className={`w-10 h-10 ${stat.iconColor} group-hover:scale-110 transition-transform`} />
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.textColor} group-hover:opacity-80`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Section */}
        <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300 transition-colors hover:text-cyan-200">
              {sectionContent[activeSection].title}
            </h2>
            <div className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full 
              hover:bg-cyan-500/30 hover:text-cyan-200 transition-all cursor-pointer">
              Active Section
            </div>
          </div>

          <div className="text-gray-300">
            <p className="mb-4 hover:text-gray-100 transition-colors">
              {sectionContent[activeSection].description}
            </p>
            <div className="space-y-2">
              {sectionContent[activeSection].features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 
                    hover:bg-gray-700/50 p-2 rounded-lg transition-colors 
                    hover:pl-4 hover:text-cyan-300"
                >
                  <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;