import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import type { AppContextType, Language } from '../../types';
import Card from '../common/Card';

const Settings: React.FC = () => {
    const { settings, setSettings, strings } = useContext(AppContext) as AppContextType;

    const toggleDarkMode = () => {
        setSettings({ ...settings, darkMode: !settings.darkMode });
    };

    const toggleLanguage = () => {
        const newLang: Language = settings.language === 'hi' ? 'en' : 'hi';
        setSettings({ ...settings, language: newLang });
    };

    const toggleNotifications = () => {
        setSettings({ ...settings, notifications: !settings.notifications });
    };

    return (
        <div className="p-4 md:p-6 space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold">{strings.settings.title}</h1>
            <Card>
                <ul className="space-y-2">
                    <li className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <span className="font-semibold">{strings.settings.darkMode}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={settings.darkMode} onChange={toggleDarkMode} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </li>
                    <li className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <span className="font-semibold">{strings.settings.language}</span>
                        <button onClick={toggleLanguage} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                            {settings.language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
                        </button>
                    </li>
                     <li className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <span className="font-semibold">{strings.settings.notifications}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={settings.notifications} onChange={toggleNotifications} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </li>
                    <li className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 opacity-50">
                        <span className="font-semibold">{strings.settings.security}</span>
                        <i className="fas fa-chevron-right"></i>
                    </li>
                    <li className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 opacity-50">
                        <span className="font-semibold">{strings.settings.dataBackup}</span>
                        <i className="fas fa-chevron-right"></i>
                    </li>
                    <li className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <span className="font-semibold">{strings.settings.about}</span>
                         <i className="fas fa-info-circle"></i>
                    </li>
                </ul>
            </Card>
        </div>
    );
};

export default Settings;