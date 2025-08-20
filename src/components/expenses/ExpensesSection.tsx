import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import type { Expense, AppContextType } from '../../types';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { EXPENSE_CATEGORIES } from '../../constants';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ExpensesSection: React.FC = () => {
    const { expenses, setExpenses, settings, strings } = useContext(AppContext) as AppContextType;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentExpense, setCurrentExpense] = useState<Partial<Expense>>({});
    const [isEditing, setIsEditing] = useState(false);

    const handleAddOrUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && currentExpense.id) {
            setExpenses(expenses.map(ex => ex.id === currentExpense.id ? (currentExpense as Expense) : ex));
        } else {
            const newExpense: Expense = {
                id: Date.now().toString(),
                category: currentExpense.category || '',
                date: currentExpense.date || new Date().toISOString().split('T')[0],
                amount: currentExpense.amount || 0,
                notes: currentExpense.notes || ''
            };
            setExpenses([...expenses, newExpense]);
        }
        closeModal();
    };

    const openModalForNew = () => {
        setCurrentExpense({ date: new Date().toISOString().split('T')[0] });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openModalForEdit = (exp: Expense) => {
        setCurrentExpense(exp);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentExpense({});
        setIsEditing(false);
    };

    const handleDelete = (id: string) => {
        setExpenses(expenses.filter(ex => ex.id !== id));
    };

    const totalExpenses = expenses.reduce((sum, ex) => sum + ex.amount, 0);
    const expenseCategories = EXPENSE_CATEGORIES[settings.language];

    const expenseData = Object.keys(expenseCategories).map(category => {
        const total = expenses
            .filter(ex => ex.category === category)
            .reduce((sum, ex) => sum + ex.amount, 0);
        return { name: category, value: total };
    }).filter(item => item.value > 0);

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f', '#ffbb28', '#ff7300', '#d0ed57', '#a4de6c'];

    return (
        <div className="p-4 md:p-6 space-y-6 animate-fade-in">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{strings.expenses.title}</h1>
                <button onClick={openModalForNew} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                    <i className="fas fa-plus mr-2"></i>{strings.expenses.add}
                </button>
            </header>

            <Card>
                <div className="text-xl font-bold">{strings.expenses.total}: <span className="text-red-500">₹{totalExpenses.toLocaleString('en-IN')}</span></div>
            </Card>

            <Card>
                <h3 className="font-bold text-xl mb-4">{strings.dashboard.expenseDistribution}</h3>
                 {expenseData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {expenseData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500">{strings.expenses.add}</div>
                )}
            </Card>

            <div className="space-y-4">
                {expenses.map(exp => (
                    <Card key={exp.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <i className={`fas ${expenseCategories[exp.category] || 'fa-question-circle'} text-2xl text-indigo-500`}></i>
                            <div>
                                <p className="text-lg font-bold">{exp.category}</p>
                                <p className="text-xl text-red-600 dark:text-red-400 font-semibold">₹{exp.amount.toLocaleString('en-IN')}</p>
                                <p className="text-sm text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
                                {exp.notes && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exp.notes}</p>}
                            </div>
                        </div>
                        <div className="space-x-2">
                             <button onClick={() => openModalForEdit(exp)} className="p-2 text-blue-500 hover:text-blue-700"><i className="fas fa-edit"></i></button>
                            <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={isEditing ? strings.common.edit : strings.expenses.add}>
                <form onSubmit={handleAddOrUpdate} className="space-y-4">
                     <div>
                        <label className="block mb-1 font-semibold">{strings.expenses.category}</label>
                        <select
                            value={currentExpense.category}
                            onChange={(e) => setCurrentExpense({ ...currentExpense, category: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            required
                        >
                            <option value="" className="text-gray-500">Select category</option>
                            {Object.keys(expenseCategories).map(cat => <option key={cat} value={cat} className="text-black bg-white">{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">{strings.expenses.amount}</label>
                        <input
                            type="number"
                            value={currentExpense.amount || ''}
                            onChange={(e) => setCurrentExpense({ ...currentExpense, amount: parseFloat(e.target.value) })}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">{strings.expenses.date}</label>
                        <input
                            type="date"
                            value={currentExpense.date || ''}
                            onChange={(e) => setCurrentExpense({ ...currentExpense, date: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">{strings.expenses.notes}</label>
                        <textarea
                            value={currentExpense.notes || ''}
                            onChange={(e) => setCurrentExpense({ ...currentExpense, notes: e.target.value })}
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

export default ExpensesSection;