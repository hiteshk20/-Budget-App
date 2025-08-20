import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import type { Income, AppContextType } from '../../types';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { INCOME_CATEGORIES } from '../../constants';

const IncomeSection: React.FC = () => {
    const { income, setIncome, settings, strings } = useContext(AppContext) as AppContextType;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIncome, setCurrentIncome] = useState<Partial<Income>>({});
    const [isEditing, setIsEditing] = useState(false);

    const handleAddOrUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && currentIncome.id) {
            setIncome(income.map(i => i.id === currentIncome.id ? (currentIncome as Income) : i));
        } else {
            const newIncome: Income = {
                id: Date.now().toString(),
                source: currentIncome.source || '',
                date: currentIncome.date || new Date().toISOString().split('T')[0],
                amount: currentIncome.amount || 0,
                notes: currentIncome.notes || ''
            };
            setIncome([...income, newIncome]);
        }
        closeModal();
    };
    
    const openModalForNew = () => {
        setCurrentIncome({ date: new Date().toISOString().split('T')[0] });
        setIsEditing(false);
        setIsModalOpen(true);
    };
    
    const openModalForEdit = (inc: Income) => {
        setCurrentIncome(inc);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentIncome({});
        setIsEditing(false);
    };
    
    const handleDelete = (id: string) => {
        setIncome(income.filter(i => i.id !== id));
    };

    const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
    const incomeCategories = INCOME_CATEGORIES[settings.language];

    return (
        <div className="p-4 md:p-6 space-y-6 animate-fade-in">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{strings.income.title}</h1>
                <button onClick={openModalForNew} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                    <i className="fas fa-plus mr-2"></i>{strings.income.add}
                </button>
            </header>
            
            <Card>
                <div className="text-xl font-bold">{strings.income.total}: <span className="text-green-500">₹{totalIncome.toLocaleString('en-IN')}</span></div>
            </Card>

            <div className="space-y-4">
                {income.map(inc => (
                    <Card key={inc.id} className="flex justify-between items-center">
                        <div>
                            <p className="text-lg font-bold">{inc.source}</p>
                            <p className="text-xl text-green-600 dark:text-green-400 font-semibold">₹{inc.amount.toLocaleString('en-IN')}</p>
                            <p className="text-sm text-gray-500">{new Date(inc.date).toLocaleDateString()}</p>
                            {inc.notes && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{inc.notes}</p>}
                        </div>
                        <div className="space-x-2">
                             <button onClick={() => openModalForEdit(inc)} className="p-2 text-blue-500 hover:text-blue-700"><i className="fas fa-edit"></i></button>
                            <button onClick={() => handleDelete(inc.id)} className="p-2 text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={isEditing ? strings.common.edit : strings.income.add}>
                <form onSubmit={handleAddOrUpdate} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">{strings.income.source}</label>
                        <select
                            value={currentIncome.source}
                            onChange={(e) => setCurrentIncome({ ...currentIncome, source: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            required
                        >
                            <option value="" className="text-gray-500">Select source</option>
                            {incomeCategories.map(cat => <option key={cat} value={cat} className="text-black bg-white">{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">{strings.income.amount}</label>
                        <input
                            type="number"
                            value={currentIncome.amount || ''}
                            onChange={(e) => setCurrentIncome({ ...currentIncome, amount: parseFloat(e.target.value) })}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">{strings.income.date}</label>
                        <input
                            type="date"
                            value={currentIncome.date || ''}
                            onChange={(e) => setCurrentIncome({ ...currentIncome, date: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">{strings.income.notes}</label>
                        <textarea
                            value={currentIncome.notes || ''}
                            onChange={(e) => setCurrentIncome({ ...currentIncome, notes: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            rows={3}
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400">{strings.common.cancel}</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{strings.common.save}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default IncomeSection;