/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Bell, X, Shield, Briefcase, Gavel, Compass, AlertCircle } from 'lucide-react';
import { SystemNotification } from '../types';

interface NotificationToastProps {
  notifications: SystemNotification[];
}

export default function NotificationToast({ notifications }: NotificationToastProps) {
  const [activeToast, setActiveToast] = useState<SystemNotification | null>(null);

  useEffect(() => {
    if (notifications.length === 0) return;
    
    // Grab the latest notification
    const latest = notifications[notifications.length - 1];
    
    // Only show if it's less than 3 seconds old
    const ageMs = Date.now() - new Date(latest.timestamp).getTime();
    if (ageMs < 3000) {
      setActiveToast(latest);
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (!activeToast) return null;

  const getToastIcon = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return <Shield className="w-5 h-5 text-red-500" />;
      case 'Mortgage Adviser':
        return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'Property Lawyer':
        return <Gavel className="w-5 h-5 text-purple-500" />;
      case 'Real Estate Agent':
        return <Compass className="w-5 h-5 text-amber-500" />;
      default:
        return <Bell className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 p-4 animate-slide-in flex items-start space-x-3" id="realtime-notification-toast">
      <div className="p-1.5 bg-slate-800 rounded-lg">
        {getToastIcon(activeToast.senderRole)}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-100">{activeToast.title}</span>
          <button 
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[11px] text-slate-300 leading-normal">{activeToast.message}</p>
        <span className="block text-[9px] text-slate-400 font-mono">
          Sender: {activeToast.senderName} ({activeToast.senderRole})
        </span>
      </div>
    </div>
  );
}
