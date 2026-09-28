/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bell, 
  LogOut, 
  User as UserIcon, 
  Shield, 
  Building2, 
  Menu, 
  X,
  CheckCheck,
  Briefcase,
  Gavel,
  Compass
} from 'lucide-react';
import { User, SystemNotification, UserRole } from '../types';

interface NavbarProps {
  currentUser: User | null;
  onLogout: () => void;
  notifications: SystemNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearNotifications: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Navbar({
  currentUser,
  onLogout,
  notifications,
  onMarkNotificationRead,
  onClearNotifications,
  onNavigate
}: NavbarProps) {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Filter notifications for this specific user or their role
  const relevantNotifications = notifications.filter(notif => {
    if (!currentUser) return false;
    // Private notifications to specific user
    if (notif.recipientId === currentUser.id) return true;
    // Role-based notifications (broadcasts)
    if (notif.recipientRole === currentUser.role) return true;
    return false;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const unreadCount = relevantNotifications.filter(n => !n.isRead).length;

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Mortgage Adviser':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Property Lawyer':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Real Estate Agent':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Home Buyer':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'Super Admin':
        return <Shield className="w-4 h-4 mr-1 text-red-600" id="role-icon-admin" />;
      case 'Mortgage Adviser':
        return <Briefcase className="w-4 h-4 mr-1 text-blue-600" id="role-icon-mortgage" />;
      case 'Property Lawyer':
        return <Gavel className="w-4 h-4 mr-1 text-purple-600" id="role-icon-lawyer" />;
      case 'Real Estate Agent':
        return <Compass className="w-4 h-4 mr-1 text-amber-600" id="role-icon-agent" />;
      case 'Home Buyer':
        return <Building2 className="w-4 h-4 mr-1 text-emerald-600" id="role-icon-buyer" />;
    }
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40" id="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center py-1">
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="flex flex-col items-start justify-center hover:opacity-90 cursor-pointer text-left transition-opacity group"
              id="brand-logo-btn"
              title="SettleMate - One Journey. One Coordinator."
            >
              <div className="flex items-center space-x-2.5">
                <img 
                  src="https://settlemate.co.nz/logo1.png" 
                  alt="SettleMate" 
                  className="h-8 object-contain" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallbackSpan = document.getElementById('navbar-fallback-name');
                    if (fallbackSpan) fallbackSpan.style.display = 'inline-block';
                  }}
                />
                <span id="navbar-fallback-name" className="hidden font-sans tracking-tight text-slate-900 font-black text-lg leading-tight">
                  SettleMate
                </span>
              </div>
              <span className="text-[10px] text-[#de5d26] font-bold tracking-tight leading-none mt-0.5" id="navbar-tagline">
                One Journey. One Coordinator.
              </span>
            </button>
          </div>

          {/* User Actions (Desktop) */}
          {currentUser && (
            <div className="hidden md:flex items-center space-x-4">
              {/* Role badge */}
              <div className={`flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold ${getRoleBadgeStyle(currentUser.role)}`} id="user-role-badge">
                {getRoleIcon(currentUser.role)}
                {currentUser.role}
              </div>

              {/* User Profile Navigation */}
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-2 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition text-slate-700 text-sm border border-transparent hover:border-slate-100 cursor-pointer"
                id="navbar-profile-btn"
                title="Configure Profile & Avatar"
              >
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover border border-slate-200 referrer-no-referrer" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-xs border border-slate-200">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <span className="font-medium text-slate-800">{currentUser.name}</span>
              </button>

              {/* Notifications Dropdown Container */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className={`relative p-2 rounded-lg text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition cursor-pointer ${showNotifDropdown ? 'bg-slate-50 border-slate-100' : ''}`}
                  id="notifications-toggle"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white font-semibold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse" id="notif-badge-count">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Panel */}
                {showNotifDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in" id="notifications-panel">
                    <div className="p-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                      <span className="font-semibold text-xs text-slate-700">Notifications ({unreadCount} unread)</span>
                      {unreadCount > 0 && (
                        <button 
                          onClick={onClearNotifications}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1 cursor-pointer"
                          id="clear-all-notifs"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Mark all read</span>
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y divide-slate-50">
                      {relevantNotifications.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-sm">
                          No notifications yet.
                        </div>
                      ) : (
                        relevantNotifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            onClick={() => {
                              onMarkNotificationRead(notif.id);
                            }}
                            className={`p-3 hover:bg-slate-50 transition cursor-pointer ${!notif.isRead ? 'bg-emerald-50/30' : ''}`}
                            id={`notif-item-${notif.id}`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-semibold text-xs text-slate-800">{notif.title}</span>
                              <span className="text-[10px] text-slate-400">
                                {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-normal">{notif.message}</p>
                            <div className="mt-1.5 flex items-center text-[10px] text-slate-400 space-x-1">
                              <span className="font-medium text-slate-500">{notif.senderName}</span>
                              <span>•</span>
                              <span>{notif.senderRole}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Privacy Policy Link */}
              <button
                onClick={() => onNavigate('privacy')}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                title="Privacy Policy"
                id="navbar-privacy-btn"
              >
                Privacy
              </button>

              {/* Cookie Policy Link */}
              <button
                onClick={() => onNavigate('cookies')}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                title="Cookie Policy"
                id="navbar-cookies-btn"
              >
                Cookies
              </button>

              {/* Customer Service Agreement Link */}
              <button
                onClick={() => onNavigate('csa')}
                className="text-xs font-medium text-slate-500 hover:text-[#de5d26] transition px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                title="Customer Service Agreement"
                id="navbar-csa-btn"
              >
                CSA
              </button>

              {/* Disclaimer Link */}
              <button
                onClick={() => onNavigate('disclaimer')}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                title="Disclaimer"
                id="navbar-disclaimer-btn"
              >
                Disclaimer
              </button>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition cursor-pointer"
                title="Log Out"
                id="logout-btn"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          {currentUser && currentUser.role !== 'Super Admin' && (
            <div className="md:hidden flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 relative cursor-pointer"
                  id="mobile-notifications-toggle"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                id="mobile-menu-toggle"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && currentUser && (
        <div 
          className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain" 
          id="mobile-menu-panel"
        >
          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 referrer-no-referrer" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600">
                {currentUser.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm text-slate-800 truncate">{currentUser.name}</div>
              <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-slate-50/50 rounded-lg border border-slate-100">
            <span className="text-xs font-medium text-slate-500">Active Role:</span>
            <div className={`flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold ${getRoleBadgeStyle(currentUser.role)}`}>
              {getRoleIcon(currentUser.role)}
              {currentUser.role}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onNavigate('dashboard');
                setShowMobileMenu(false);
              }}
              className="px-3 py-2.5 text-center rounded-lg text-sm bg-slate-900 text-white font-medium hover:bg-slate-800 transition cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                onNavigate('profile');
                setShowMobileMenu(false);
              }}
              className="px-3 py-2.5 text-center rounded-lg text-sm bg-slate-100 text-slate-800 font-medium hover:bg-slate-200 transition cursor-pointer"
            >
              My Profile
            </button>
          </div>

          {/* Mobile Notifications Section in Mobile Menu */}
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-xs text-slate-700 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-slate-500" />
                Notifications ({unreadCount} unread)
              </span>
              {unreadCount > 0 && (
                <button 
                  onClick={onClearNotifications}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1 cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark read</span>
                </button>
              )}
            </div>
            
            <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 border border-slate-100 rounded-xl bg-slate-50/50">
              {relevantNotifications.length === 0 ? (
                <div className="p-3 text-center text-slate-400 text-xs">
                  No notifications yet.
                </div>
              ) : (
                relevantNotifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    onClick={() => {
                      onMarkNotificationRead(notif.id);
                    }}
                    className={`p-2.5 hover:bg-slate-100 transition cursor-pointer ${!notif.isRead ? 'bg-emerald-50/50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-0.5">
                      <span className="font-semibold text-xs text-slate-800">{notif.title}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">{notif.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Mobile Legal Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500 py-1.5 border-t border-slate-100">
            <button
              onClick={() => {
                onNavigate('privacy');
                setShowMobileMenu(false);
              }}
              className="hover:text-slate-800 underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => {
                onNavigate('cookies');
                setShowMobileMenu(false);
              }}
              className="hover:text-slate-800 underline cursor-pointer"
            >
              Cookie Policy
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => {
                onNavigate('csa');
                setShowMobileMenu(false);
              }}
              className="hover:text-[#de5d26] underline font-semibold text-[#de5d26] cursor-pointer"
            >
              CSA
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => {
                onNavigate('disclaimer');
                setShowMobileMenu(false);
              }}
              className="hover:text-slate-800 underline cursor-pointer"
            >
              Disclaimer
            </button>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 text-sm font-medium transition cursor-pointer mt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </nav>
  );
}
