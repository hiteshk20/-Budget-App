export type View = 'onboarding' | 'dashboard' | 'income' | 'expenses' | 'investments' | 'reports' | 'settings';
export type Language = 'hi' | 'en';

export interface Settings {
    darkMode: boolean;
    language: Language;
    notifications: boolean;
    pin: string | null;
}

export interface Income {
    id: string;
    source: string;
    date: string;
    amount: number;
    notes: string;
}

export interface Expense {
    id: string;
    category: string;
    date: string;
    amount: number;
    notes: string;
}

export interface Debt {
    id: string;
    name: string;
    totalAmount: number;
    paidAmount: number;
}

export interface Investment {
    id: string;
    type: 'SIP' | 'PPF' | 'NPS' | 'FD' | 'Gold';
    amount: number;
    startDate: string;
    interestRate: number;
    tenureYears: number;
}

export interface Insurance {
    id: string;
    type: 'Term' | 'Health';
    policyNumber: string;
    premium: number;
    dueDate: string;
}

export interface InvestmentData {
    emergencyFund: {
        monthlyExpense: number;
        fundMonths: number;
        target: number;
        saved: number;
    };
    debts: Debt[];
    investments: Investment[];
    insurances: Insurance[];
}

export interface AppContextType {
    userName: string | null;
    setUserName: (name: string | null) => void;
    view: View;
    setView: (view: View) => void;
    settings: Settings;
    setSettings: (settings: Settings) => void;
    income: Income[];
    setIncome: (income: Income[]) => void;
    expenses: Expense[];
    setExpenses: (expenses: Expense[]) => void;
    investments: InvestmentData;
    setInvestments: (investments: InvestmentData) => void;
    strings: any; 
}