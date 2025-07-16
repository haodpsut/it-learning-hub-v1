
import React from 'react';
import { AppView } from '../types';
import { CodeIcon } from './icons/CodeIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: AppView;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  const baseClasses = "flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <li>
      <button
        onClick={onClick}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </button>
    </li>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <nav className="w-64 bg-gray-800 h-full p-4 flex-shrink-0 flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-white tracking-wider">IT Hub</h2>
      </div>
      <ul className="space-y-2">
        <NavItem 
          icon={<CodeIcon />} 
          label={AppView.Labs}
          isActive={currentView === AppView.Labs}
          onClick={() => setView(AppView.Labs)}
        />
        <NavItem 
          icon={<ChartBarIcon />} 
          label={AppView.Visualizations}
          isActive={currentView === AppView.Visualizations}
          onClick={() => setView(AppView.Visualizations)}
        />
        <NavItem 
          icon={<QuestionMarkCircleIcon />} 
          label={AppView.Quizzes}
          isActive={currentView === AppView.Quizzes}
          onClick={() => setView(AppView.Quizzes)}
        />
      </ul>
      <div className="mt-auto text-center text-xs text-gray-500">
        <p>Interactive Learning Platform</p>
        <p>&copy; 2024</p>
      </div>
    </nav>
  );
};

export default Sidebar;
