import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Card from '../common/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import type { AppContextType } from '../../types';

const Dashboard: React.FC = () => {
    const { userName, income, expenses, strings } = useContext(AppContext) as AppContextType;

    const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
    const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
    const totalSavings = totalIncome - totalExpenses;

    const expenseData = expenses
        .reduce((acc, expense) => {
            const existing = acc.find(item => item.name === expense.category);
            if (existing) {
                existing.value += expense.amount;
            } else {
                acc.push({ name: expense.category, value: expense.amount });
            }
            return acc;
        }, [] as { name: string; value: number }[]);
    
    const incomeVsExpenseData = [
        { name: strings.dashboard.income, value: totalIncome },
        { name: strings.dashboard.expenses, value: totalExpenses },
    ];

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f', '#ffbb28'];

    return (
        <div className="p-4 md:p-6 space-y-6 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {strings.dashboard.greeting} {userName} जी,
                </h1>
                <p className="text-md text-gray-500 dark:text-gray-400">{strings.dashboard.welcome}</p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-r from-green-400 to-teal-500 text-white">
                    <h2 className="font-bold text-lg">{strings.dashboard.income}</h2>
                    <p className="text-2xl font-semibold">₹{totalIncome.toLocaleString('en-IN')}</p>
                </Card>
                <Card className="bg-gradient-to-r from-red-400 to-orange-500 text-white">
                    <h2 className="font-bold text-lg">{strings.dashboard.expenses}</h2>
                    <p className="text-2xl font-semibold">₹{totalExpenses.toLocaleString('en-IN')}</p>
                </Card>
                <Card className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                    <h2 className="font-bold text-lg">{strings.dashboard.savings}</h2>
                    <p className="text-2xl font-semibold">₹{totalSavings.toLocaleString('en-IN')}</p>
                </Card>
                <Card className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                    <h2 className="font-bold text-lg">{strings.dashboard.investments}</h2>
                    <p className="text-2xl font-semibold">₹0</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="font-bold text-xl mb-4 text-gray-700 dark:text-gray-200">{strings.dashboard.expenseDistribution}</h3>
                    {expenseData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                    {expenseData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                         <div className="h-[300px] flex items-center justify-center text-gray-500">{strings.expenses.add}</div>
                    )}
                </Card>
                <Card>
                    <h3 className="font-bold text-xl mb-4 text-gray-700 dark:text-gray-200">{strings.dashboard.incomeVsExpense}</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={incomeVsExpenseData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8">
                               <Cell fill="#82ca9d" />
                               <Cell fill="#ff8042" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;