import React, { useState, useEffect, useCallback } from 'react';
import type { View, Language, Settings, Income, Expense, InvestmentData } from './types';
import { AppContext } from './contexts/AppContext';
import useLocalStorage from './hooks/useLocalStorage';
import Onboarding from './components/onboarding/Onboarding';
import Dashboard from './components/dashboard/Dashboard';
import IncomeSection from './components/income/IncomeSection';
import ExpensesSection from './components/expenses/ExpensesSection';
import InvestmentWizard from './components/investments/InvestmentWizard';
import SettingsComponent from './components/settings/Settings';
import Reports from './components/reports/Reports';
import { STRINGS } from './constants';

const App: React.FC = () => {
    const [userName, setUserName] = useLocalStorage<string | null>('userName', null);
    const [view, setView] = useState<View>('dashboard');
    const [settings, setSettings] = useLocalStorage<Settings>('settings', {
        darkMode: false,
        language: 'hi',
        notifications: true,
        pin: null,
    });
    const [income, setIncome] = useLocalStorage<Income[]>('income', []);
    const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
    const [investments, setInvestments] = useLocalStorage<InvestmentData>('investments', {
        emergencyFund: { monthlyExpense: 0, fundMonths: 6, target: 0, saved: 0 },
        debts: [],
        investments: [],
        insurances: [],
    });

    useEffect(() => {
        if (!userName) {
            setView('onboarding');
        } else {
            setView('dashboard');
        }
    }, [userName]);

    useEffect(() => {
        if (settings.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [settings.darkMode]);

    const handleLogin = (name: string) => {
        setUserName(name);
        setView('dashboard');
    };

    const strings = STRINGS[settings.language];

    const renderView = useCallback(() => {
        switch (view) {
            case 'onboarding':
                return <Onboarding onLogin={handleLogin} />;
            case 'dashboard':
                return <Dashboard />;
            case 'income':
                return <IncomeSection />;
            case 'expenses':
                return <ExpensesSection />;
            case 'investments':
                return <InvestmentWizard />;
            case 'reports':
                return <Reports />;
            case 'settings':
                return <SettingsComponent />;
            default:
                return <Dashboard />;
        }
    }, [view]);

    if (view === 'onboarding') {
        return <Onboarding onLogin={handleLogin} />;
    }

    const navItems: { view: View; icon: string; label: keyof typeof strings.nav }[] = [
        { view: 'dashboard', icon: 'fa-home', label: 'dashboard' },
        { view: 'income', icon: 'fa-coins', label: 'income' },
        { view: 'expenses', icon: 'fa-receipt', label: 'expenses' },
        { view: 'investments', icon: 'fa-chart-line', label: 'investments' },
        { view: 'reports', icon: 'fa-chart-pie', label: 'reports' },
        { view: 'settings', icon: 'fa-cog', label: 'settings' },
    ];

    return (
        <AppContext.Provider value={{
            userName, setUserName,
            view, setView,
            settings, setSettings,
            income, setIncome,
            expenses, setExpenses,
            investments, setInvestments,
            strings
        }}>
            <div className="flex flex-col h-screen font-sans text-gray-800 dark:text-gray-200">
                <main className="flex-1 overflow-y-auto pb-20">
                    {renderView()}
                </main>
                <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
                    <div className="flex justify-around max-w-2xl mx-auto">
                        {navItems.map(item => (
                            <button
                                key={item.view}
                                onClick={() => setView(item.view)}
                                className={`flex flex-col items-center justify-center p-2 w-full text-center transition-colors duration-300 ${
                                    view === item.view ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300'
                                }`}
                            >
                                <i className={`fas ${item.icon} text-xl`}></i>
                                <span className="text-xs mt-1">{strings.nav[item.label]}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
        </AppContext.Provider>
    );
};

export default App;
