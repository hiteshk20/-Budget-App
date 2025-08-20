import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import type { AppContextType, InvestmentData, Debt, Investment, Insurance } from '../../types';
import Card from '../common/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

const InvestmentWizard: React.FC = () => {
    const { investments, setInvestments, userName, strings } = useContext(AppContext) as AppContextType;
    const [step, setStep] = useState(1);
    const [localInvestments, setLocalInvestments] = useState<InvestmentData>(investments);

    useEffect(() => {
        setLocalInvestments(investments);
    }, [investments]);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const handleFinish = () => {
        setInvestments(localInvestments);
        alert('Investment data saved!');
    };

    const updateEmergencyFund = (field: string, value: number) => {
        const newFund = { ...localInvestments.emergencyFund, [field]: value };
        newFund.target = newFund.monthlyExpense * newFund.fundMonths;
        setLocalInvestments({ ...localInvestments, emergencyFund: newFund });
    };

    const addDebt = () => {
        const newDebt: Debt = { id: Date.now().toString(), name: '', totalAmount: 0, paidAmount: 0 };
        setLocalInvestments({ ...localInvestments, debts: [...localInvestments.debts, newDebt] });
    };
    const updateDebt = (id: string, field: string, value: string | number) => {
        setLocalInvestments({
            ...localInvestments,
            debts: localInvestments.debts.map(d => d.id === id ? { ...d, [field]: value } : d)
        });
    };
    
    const addInvestment = () => {
        const newInv: Investment = {id: Date.now().toString(), type: 'SIP', amount: 0, startDate: '', interestRate: 0, tenureYears: 0 };
        setLocalInvestments({ ...localInvestments, investments: [...localInvestments.investments, newInv] });
    };
    const updateInvestment = (id: string, field: string, value: string | number) => {
        setLocalInvestments({
            ...localInvestments,
            investments: localInvestments.investments.map(i => i.id === id ? { ...i, [field]: value } : i)
        });
    };
    
    const addInsurance = () => {
        const newIns: Insurance = { id: Date.now().toString(), type: 'Term', policyNumber: '', premium: 0, dueDate: ''};
        setLocalInvestments({ ...localInvestments, insurances: [...localInvestments.insurances, newIns] });
    };
    const updateInsurance = (id: string, field: string, value: string | number) => {
        setLocalInvestments({
            ...localInvestments,
            insurances: localInvestments.insurances.map(i => i.id === id ? { ...i, [field]: value } : i)
        });
    };

    const steps = strings.investments.steps;
    const progress = (step / steps.length) * 100;

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Card>
                        <h3 className="text-xl font-bold mb-4">{strings.investments.step1.title}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block">{strings.investments.step1.monthlyExpense}</label>
                                <input type="number" value={localInvestments.emergencyFund.monthlyExpense} onChange={e => updateEmergencyFund('monthlyExpense', +e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                            </div>
                            <div>
                                <label className="block">{strings.investments.step1.fundDuration}</label>
                                <input type="number" value={localInvestments.emergencyFund.fundMonths} onChange={e => updateEmergencyFund('fundMonths', +e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                            </div>
                            <div>
                                <label className="block">{strings.investments.step1.currentSaved}</label>
                                <input type="number" value={localInvestments.emergencyFund.saved} onChange={e => updateEmergencyFund('saved', +e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                            </div>
                            <div className="text-lg font-semibold">{strings.investments.step1.target}: ₹{localInvestments.emergencyFund.target.toLocaleString('en-IN')}</div>
                        </div>
                    </Card>
                );
            case 2:
                return (
                    <Card>
                        <h3 className="text-xl font-bold mb-4">{strings.investments.step2.title}</h3>
                        {localInvestments.debts.map(debt => (
                            <div key={debt.id} className="space-y-2 border-b pb-4 mb-4">
                                <input type="text" placeholder={strings.investments.step2.debtName} value={debt.name} onChange={e => updateDebt(debt.id, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                                <input type="number" placeholder={strings.investments.step2.totalAmount} value={debt.totalAmount} onChange={e => updateDebt(debt.id, 'totalAmount', +e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                                <input type="number" placeholder={strings.investments.step2.paidAmount} value={debt.paidAmount} onChange={e => updateDebt(debt.id, 'paidAmount', +e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                            </div>
                        ))}
                        <button onClick={addDebt} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">{strings.investments.step2.addDebt}</button>
                    </Card>
                );
            case 3:
                 return (
                    <Card>
                        <h3 className="text-xl font-bold mb-4">{strings.investments.step3.title}</h3>
                        {localInvestments.investments.map(inv => (
                            <div key={inv.id} className="space-y-2 border-b pb-4 mb-4">
                                <select value={inv.type} onChange={e => updateInvestment(inv.id, 'type', e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900">
                                    <option className="text-black bg-white">SIP</option>
                                    <option className="text-black bg-white">PPF</option>
                                    <option className="text-black bg-white">NPS</option>
                                    <option className="text-black bg-white">FD</option>
                                    <option className="text-black bg-white">Gold</option>
                                </select>
                                <input type="number" placeholder={strings.investments.step3.monthlyAmount} value={inv.amount} onChange={e => updateInvestment(inv.id, 'amount', +e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                                <input type="number" placeholder={strings.investments.step3.interestRate} value={inv.interestRate} onChange={e => updateInvestment(inv.id, 'interestRate', +e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                                <input type="number" placeholder={strings.investments.step3.tenure} value={inv.tenureYears} onChange={e => updateInvestment(inv.id, 'tenureYears', +e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                            </div>
                        ))}
                        <button onClick={addInvestment} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">{strings.investments.step3.addInvestment}</button>
                    </Card>
                );
            case 4:
                 return (
                    <Card>
                        <h3 className="text-xl font-bold mb-4">{strings.investments.step4.title}</h3>
                        {localInvestments.insurances.map(ins => (
                            <div key={ins.id} className="space-y-2 border-b pb-4 mb-4">
                                <select value={ins.type} onChange={e => updateInsurance(ins.id, 'type', e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900">
                                    <option className="text-black bg-white">Term</option>
                                    <option className="text-black bg-white">Health</option>
                                </select>
                                <input type="text" placeholder={strings.investments.step4.policyNumber} value={ins.policyNumber} onChange={e => updateInsurance(ins.id, 'policyNumber', e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                                <input type="number" placeholder={strings.investments.step4.premium} value={ins.premium} onChange={e => updateInsurance(ins.id, 'premium', +e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                                <input type="date" placeholder={strings.investments.step4.dueDate} value={ins.dueDate} onChange={e => updateInsurance(ins.id, 'dueDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900" />
                            </div>
                        ))}
                        <button onClick={addInsurance} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">{strings.investments.step4.addInsurance}</button>
                    </Card>
                );
            case 5:
                const { saved, target } = localInvestments.emergencyFund;
                const chartData = [{ name: strings.investments.summary.targetVsCurrent, target, saved }];
                return (
                    <Card>
                        <h3 className="text-xl font-bold mb-4">{userName} जी, {strings.investments.summary.title}</h3>
                        <p>{strings.investments.summary.progressChart}</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" width={150}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="saved" name={strings.investments.step1.currentSaved} stackId="a" fill="#82ca9d" />
                                <Bar dataKey="target" name={strings.investments.step1.target} stackId="a" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold">{strings.investments.title}</h1>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
            <p className="text-center font-semibold">{steps[step-1]}</p>

            <div className="mt-6">{renderStep()}</div>
            
            <div className="flex justify-between mt-8">
                <button onClick={prevStep} disabled={step === 1} className="px-6 py-2 bg-gray-500 text-white rounded disabled:opacity-50">{strings.investments.back}</button>
                {step < 5 ? (
                    <button onClick={nextStep} className="px-6 py-2 bg-indigo-600 text-white rounded">{strings.investments.next}</button>
                ) : (
                    <button onClick={handleFinish} className="px-6 py-2 bg-green-600 text-white rounded">{strings.investments.finish}</button>
                )}
            </div>
        </div>
    );
};

export default InvestmentWizard;