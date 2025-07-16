
import React, { useState, useEffect, useCallback } from 'react';
import { AppView } from './types';
import ApiKeysModal from './components/ApiKeysModal';
import Sidebar from './components/Sidebar';
import HtmlCssJsLab from './components/HtmlCssJsLab';
import StackVisualization from './components/StackVisualization';
import SortingVisualization from './components/SortingVisualization';
import MultipleChoiceQuiz from './components/MultipleChoiceQuiz';
import DragAndDropQuiz from './components/DragAndDropQuiz';
import { CogIcon } from './components/icons/CogIcon';

type ActiveSubView = {
  [key in AppView]: string | null;
};

const App: React.FC = () => {
  const [showApiModal, setShowApiModal] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.Labs);
  const [activeSubView, setActiveSubView] = useState<ActiveSubView>({
    [AppView.Labs]: 'html_css_js',
    [AppView.Visualizations]: 'stack',
    [AppView.Quizzes]: 'mcq',
  });

  useEffect(() => {
    const geminiKey = localStorage.getItem('gemini_api_key');
    const openRouterKey = localStorage.getItem('openrouter_api_key');
    if (!geminiKey && !openRouterKey) {
      setShowApiModal(true);
    }
  }, []);

  const handleSetView = (view: AppView) => {
    setCurrentView(view);
  };

  const handleSetSubView = (subView: string) => {
    setActiveSubView(prev => ({ ...prev, [currentView]: subView }));
  };

  const renderSubNav = () => {
    const commonButtonClass = "px-4 py-2 text-sm rounded-md transition-colors duration-200";
    const activeClass = "bg-blue-600 text-white";
    const inactiveClass = "bg-gray-700 hover:bg-gray-600";

    switch (currentView) {
      case AppView.Labs:
        return (
          <>
            <button onClick={() => handleSetSubView('html_css_js')} className={`${commonButtonClass} ${activeSubView[AppView.Labs] === 'html_css_js' ? activeClass : inactiveClass}`}>HTML/CSS/JS</button>
            <button onClick={() => handleSetSubView('python')} className={`${commonButtonClass} ${activeSubView[AppView.Labs] === 'python' ? activeClass : inactiveClass}`}>Python (UI Only)</button>
            <button onClick={() => handleSetSubView('sql')} className={`${commonButtonClass} ${activeSubView[AppView.Labs] === 'sql' ? activeClass : inactiveClass}`}>SQL (UI Only)</button>
          </>
        );
      case AppView.Visualizations:
        return (
          <>
            <button onClick={() => handleSetSubView('stack')} className={`${commonButtonClass} ${activeSubView[AppView.Visualizations] === 'stack' ? activeClass : inactiveClass}`}>Stack</button>
            <button onClick={() => handleSetSubView('sorting')} className={`${commonButtonClass} ${activeSubView[AppView.Visualizations] === 'sorting' ? activeClass : inactiveClass}`}>Sorting</button>
          </>
        );
      case AppView.Quizzes:
        return (
          <>
            <button onClick={() => handleSetSubView('mcq')} className={`${commonButtonClass} ${activeSubView[AppView.Quizzes] === 'mcq' ? activeClass : inactiveClass}`}>Multiple Choice</button>
            <button onClick={() => handleSetSubView('dnd')} className={`${commonButtonClass} ${activeSubView[AppView.Quizzes] === 'dnd' ? activeClass : inactiveClass}`}>Drag & Drop</button>
          </>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    const subView = activeSubView[currentView];
    switch (currentView) {
      case AppView.Labs:
        if (subView === 'html_css_js') return <HtmlCssJsLab />;
        return <div className="p-8 text-center text-gray-400">This lab is for UI demonstration purposes only.</div>;
      case AppView.Visualizations:
        if (subView === 'stack') return <StackVisualization />;
        if (subView === 'sorting') return <SortingVisualization />;
        return null;
      case AppView.Quizzes:
        if (subView === 'mcq') return <MultipleChoiceQuiz />;
        if (subView === 'dnd') return <DragAndDropQuiz />;
        return null;
      default:
        return <HtmlCssJsLab />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showApiModal && <ApiKeysModal onClose={() => setShowApiModal(false)} />}
      
      <Sidebar currentView={currentView} setView={handleSetView} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center z-10">
          <h1 className="text-xl font-bold">IT Learning Hub</h1>
          <button 
            onClick={() => setShowApiModal(true)} 
            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label="Settings"
          >
            <CogIcon />
          </button>
        </header>
        
        <main className="flex-1 flex flex-col overflow-y-auto">
           <nav className="bg-gray-800/50 border-b border-gray-700 p-2 flex items-center space-x-2">
            {renderSubNav()}
           </nav>
          <div className="p-4 md:p-6 lg:p-8 flex-1">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
