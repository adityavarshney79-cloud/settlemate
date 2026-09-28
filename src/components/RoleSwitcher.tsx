/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sliders, Shield, Users, Briefcase, Gavel, Compass, ChevronUp, ChevronDown } from 'lucide-react';
import { User, UserRole } from '../types';

interface RoleSwitcherProps {
  currentUser: User | null;
  onSwitchRole: (role: UserRole) => void;
}

export default function RoleSwitcher({ currentUser, onSwitchRole }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!currentUser) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] sm:max-w-sm w-full bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 overflow-hidden max-h-[80vh] flex flex-col" id="rbac-simulator-bar">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-slate-950 flex justify-between items-center cursor-pointer select-none border-b border-slate-850 flex-shrink-0"
      >
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold tracking-tight">RBAC Simulator Controls</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded-sm uppercase font-mono font-bold">
            Sim Active
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-3 space-y-2.5 bg-slate-900 text-xs overflow-y-auto">
          <p className="text-[10px] text-slate-400 leading-normal">
            Currently simulated as <strong className="text-emerald-400 font-bold">{currentUser.name}</strong> (<strong className="text-emerald-400">{currentUser.role}</strong>). Switch roles instantly below to audit each individual dashboard:
          </p>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onSwitchRole('Home Buyer')}
              className={`flex items-center space-x-1 p-1.5 rounded-lg border text-left transition cursor-pointer text-[10px] font-bold ${
                currentUser.role === 'Home Buyer' 
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' 
                : 'bg-slate-850 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              id="switcher-btn-buyer"
            >
              <Users className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">Home Buyer</span>
            </button>

            <button
              onClick={() => onSwitchRole('Mortgage Adviser')}
              className={`flex items-center space-x-1 p-1.5 rounded-lg border text-left transition cursor-pointer text-[10px] font-bold ${
                currentUser.role === 'Mortgage Adviser' 
                ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                : 'bg-slate-850 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              id="switcher-btn-mortgage"
            >
              <Briefcase className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">Mortgage Adv.</span>
            </button>

            <button
              onClick={() => onSwitchRole('Property Lawyer')}
              className={`flex items-center space-x-1 p-1.5 rounded-lg border text-left transition cursor-pointer text-[10px] font-bold ${
                currentUser.role === 'Property Lawyer' 
                ? 'bg-purple-600/20 border-purple-500 text-purple-300' 
                : 'bg-slate-850 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              id="switcher-btn-lawyer"
            >
              <Gavel className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">Prop. Lawyer</span>
            </button>

            <button
              onClick={() => onSwitchRole('Real Estate Agent')}
              className={`flex items-center space-x-1 p-1.5 rounded-lg border text-left transition cursor-pointer text-[10px] font-bold ${
                currentUser.role === 'Real Estate Agent' 
                ? 'bg-amber-600/20 border-amber-500 text-amber-300' 
                : 'bg-slate-850 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              id="switcher-btn-agent"
            >
              <Compass className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">Real Estate Agent</span>
            </button>

            <button
              onClick={() => onSwitchRole('Super Admin')}
              className={`col-span-2 flex items-center justify-center space-x-1 p-1.5 rounded-lg border transition cursor-pointer text-[10px] font-bold ${
                currentUser.role === 'Super Admin' 
                ? 'bg-red-600/20 border-red-500 text-red-300' 
                : 'bg-slate-850 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              id="switcher-btn-admin"
            >
              <Shield className="w-3 h-3 flex-shrink-0" />
              <span>Super Admin Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
