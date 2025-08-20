import React, { useState } from 'react';
import { STRINGS } from '../../constants';

interface OnboardingProps {
    onLogin: (name: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onLogin }) => {
    const [name, setName] = useState('');
    const strings = STRINGS['hi'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin(name.trim());
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-blue-900 dark:to-purple-900 text-center animate-fade-in">
            <img src="https://picsum.photos/seed/family/200/200" alt="Family Illustration" className="w-40 h-40 rounded-full shadow-lg mb-8" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {strings.onboarding.welcome}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{strings.onboarding.prompt}</p>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={strings.onboarding.placeholder}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full mt-6 px-6 py-3 text-lg font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                    {strings.onboarding.button}
                </button>
            </form>
        </div>
    );
};

export default Onboarding;