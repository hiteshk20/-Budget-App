import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import type { AppContextType } from '../../types';
import Card from '../common/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Reports: React.FC = () => {
    const { income, expenses, strings } = useContext(AppContext) as AppContextType;
    
    // For simplicity, this is an overall summary. A real app would filter by month/year.
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

    const data = [
        { name: 'Summary', [strings.dashboard.income]: totalIncome, [strings.dashboard.expenses]: totalExpenses },
    ];

    const exportToCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Type,Date,Category/Source,Amount,Notes\r\n";
        income.forEach(item => {
            csvContent += `Income,${item.date},${item.source},${item.amount},"${item.notes}"\r\n`;
        });
        expenses.forEach(item => {
            csvContent += `Expense,${item.date},${item.category},${item.amount},"${item.notes}"\r\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "budget_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-4 md:p-6 space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold">{strings.reports.title}</h1>
            <Card>
                <h2 className="text-xl font-bold mb-4">{strings.reports.monthly}</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={strings.dashboard.income} fill="#82ca9d" />
                        <Bar dataKey={strings.dashboard.expenses} fill="#ff8042" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
            <Card>
                <h2 className="text-xl font-bold mb-4">{strings.settings.exportData}</h2>
                <div className="flex space-x-4">
                    <button onClick={exportToCSV} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                        <i className="fas fa-file-csv mr-2"></i>{strings.reports.exportCSV}
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition opacity-50 cursor-not-allowed">
                        <i className="fas fa-file-pdf mr-2"></i>{strings.reports.exportPDF}
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Reports;