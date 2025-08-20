export const INCOME_CATEGORIES = {
    hi: ['वेतन', 'स्व-रोज़गार', 'फ्रीलांस/कमीशन', 'किराया आय', 'ब्याज / FD / RD', 'पेंशन', 'अन्य'],
    en: ['Salary', 'Self Business', 'Freelance/Commission', 'Rent Income', 'Interest / FD / RD', 'Pension', 'Other']
};

export const EXPENSE_CATEGORIES = {
    hi: {
        'घर/आवास': 'fa-home',
        'रसोई': 'fa-utensils',
        'शिक्षा': 'fa-book-open',
        'यातायात': 'fa-car',
        'स्वास्थ्य': 'fa-heartbeat',
        'मोबाइल/इंटरनेट/OTT': 'fa-wifi',
        'व्यक्तिगत': 'fa-user-tie',
        'मनोरंजन': 'fa-film',
        'सामाजिक/त्यौहार/दान': 'fa-users',
        'ग्रामीण/कृषि': 'fa-tractor',
        'अन्य': 'fa-ellipsis-h'
    },
    en: {
        'Home/Housing': 'fa-home',
        'Kitchen': 'fa-utensils',
        'Education': 'fa-book-open',
        'Transport': 'fa-car',
        'Health': 'fa-heartbeat',
        'Mobile/Internet/OTT': 'fa-wifi',
        'Personal': 'fa-user-tie',
        'Entertainment': 'fa-film',
        'Social/Festival/Donation': 'fa-users',
        'Rural/Agriculture': 'fa-tractor',
        'Other': 'fa-ellipsis-h'
    }
};

export const STRINGS = {
    hi: {
        appName: 'परिवार बजट',
        onboarding: {
            welcome: 'परिवार बजट और निवेश ऐप में आपका स्वागत है',
            prompt: 'कृपया अपना नाम दर्ज करें',
            placeholder: 'आपका नाम',
            button: 'शुरू करें'
        },
        dashboard: {
            greeting: 'नमस्ते',
            welcome: 'स्वागत है',
            income: 'आय',
            expenses: 'खर्च',
            savings: 'बचत',
            investments: 'निवेश',
            expenseDistribution: 'खर्च का वितरण',
            incomeVsExpense: 'आय बनाम खर्च'
        },
        nav: {
            dashboard: 'डैशबोर्ड',
            income: 'आय',
            expenses: 'खर्च',
            investments: 'निवेश',
            reports: 'रिपोर्ट',
            settings: 'सेटिंग्स'
        },
        income: {
            title: 'आय प्रबंधन',
            add: 'नई आय जोड़ें',
            source: 'स्रोत',
            date: 'तारीख',
            amount: 'राशि',
            notes: 'टिप्पणी',
            save: 'सहेजें',
            total: 'कुल मासिक आय'
        },
        expenses: {
            title: 'खर्च प्रबंधन',
            add: 'नया खर्च जोड़ें',
            category: 'श्रेणी',
            date: 'तारीख',
            amount: 'राशि',
            notes: 'टिप्पणी',
            save: 'सहेजें',
            total: 'कुल मासिक खर्च'
        },
        investments: {
            title: 'निवेश सेटअप विज़ार्ड',
            steps: ['आपातकालीन निधि', 'कर्ज प्राथमिकता', 'निवेश योजना', 'बीमा रिकॉर्ड', 'सारांश'],
            next: 'आगे',
            back: 'वापस',
            finish: 'समाप्त करें',
            step1: {
                title: 'इमरजेंसी फंड कैलकुलेटर',
                monthlyExpense: 'मासिक खर्च',
                fundDuration: 'कितने महीने का फंड (3-6)',
                target: 'लक्ष्य',
                currentSaved: 'वर्तमान में बचाया',
            },
            step2: {
                title: 'कर्ज़ प्राथमिकता',
                addDebt: 'नया कर्ज़ जोड़ें',
                debtName: 'कर्ज़ का नाम (जैसे क्रेडिट कार्ड)',
                totalAmount: 'कुल राशि',
                paidAmount: 'चुकाई गई राशि',
            },
            step3: {
                title: 'SIP/PPF/NPS/FD/Gold',
                addInvestment: 'नया निवेश जोड़ें',
                type: 'प्रकार',
                monthlyAmount: 'मासिक राशि',
                interestRate: 'ब्याज दर (%)',
                tenure: 'अवधि (वर्षों में)',
            },
            step4: {
                title: 'बीमा रिकॉर्ड',
                addInsurance: 'नया बीमा जोड़ें',
                type: 'बीमा का प्रकार (टर्म/स्वास्थ्य)',
                policyNumber: 'पॉलिसी नंबर',
                premium: 'प्रीमियम राशि',
                dueDate: 'नियत तारीख',
            },
            summary: {
                title: 'आपका निवेश सारांश',
                progressChart: 'यह रहा आपका निवेश प्रगति चार्ट',
                targetVsCurrent: 'लक्ष्य बनाम वर्तमान'
            }
        },
        reports: {
            title: 'रिपोर्ट',
            monthly: 'मासिक सारांश',
            yearly: 'वार्षिक सारांश',
            exportCSV: 'CSV निर्यात करें',
            exportPDF: 'PDF निर्यात करें (जल्द आ रहा है)'
        },
        settings: {
            title: 'सेटिंग्स',
            darkMode: 'डार्क मोड',
            security: 'सुरक्षा (पिन/बायोमेट्रिक)',
            dataBackup: 'डेटा बैकअप (ड्राइव/लोकल)',
            exportData: 'डेटा निर्यात करें',
            language: 'भाषा',
            notifications: 'सूचनाएं',
            about: 'ऐप के बारे में',
            help: 'सहायता'
        },
        common: {
            save: 'सहेजें',
            cancel: 'रद्द करें',
            close: 'बंद करें',
            delete: 'हटाएं',
            edit: 'संपादित करें',
            total: 'कुल'
        }
    },
    en: {
        appName: 'Family Budget',
        onboarding: {
            welcome: 'Welcome to the Family Budget & Investment App',
            prompt: 'Please enter your name',
            placeholder: 'Your Name',
            button: 'Get Started'
        },
        dashboard: {
            greeting: 'Namaste',
            welcome: 'Welcome',
            income: 'Income',
            expenses: 'Expenses',
            savings: 'Savings',
            investments: 'Investments',
            expenseDistribution: 'Expense Distribution',
            incomeVsExpense: 'Income vs Expense'
        },
        nav: {
            dashboard: 'Dashboard',
            income: 'Income',
            expenses: 'Expenses',
            investments: 'Investments',
            reports: 'Reports',
            settings: 'Settings'
        },
        income: {
            title: 'Income Management',
            add: 'Add New Income',
            source: 'Source',
            date: 'Date',
            amount: 'Amount',
            notes: 'Notes',
            save: 'Save',
            total: 'Total Monthly Income'
        },
        expenses: {
            title: 'Expense Management',
            add: 'Add New Expense',
            category: 'Category',
            date: 'Date',
            amount: 'Amount',
            notes: 'Notes',
            save: 'Save',
            total: 'Total Monthly Expenses'
        },
        investments: {
            title: 'Investment Setup Wizard',
            steps: ['Emergency Fund', 'Debt Priority', 'Investment Plan', 'Insurance Record', 'Summary'],
            next: 'Next',
            back: 'Back',
            finish: 'Finish',
            step1: {
                title: 'Emergency Fund Calculator',
                monthlyExpense: 'Monthly Expense',
                fundDuration: 'Fund Duration (3-6 months)',
                target: 'Target',
                currentSaved: 'Currently Saved',
            },
            step2: {
                title: 'Debt Priority',
                addDebt: 'Add New Debt',
                debtName: 'Debt Name (e.g. Credit Card)',
                totalAmount: 'Total Amount',
                paidAmount: 'Amount Paid',
            },
            step3: {
                title: 'SIP/PPF/NPS/FD/Gold',
                addInvestment: 'Add New Investment',
                type: 'Type',
                monthlyAmount: 'Monthly Amount',
                interestRate: 'Interest Rate (%)',
                tenure: 'Tenure (in years)',
            },
            step4: {
                title: 'Insurance Record',
                addInsurance: 'Add New Insurance',
                type: 'Insurance Type (Term/Health)',
                policyNumber: 'Policy Number',
                premium: 'Premium Amount',
                dueDate: 'Due Date',
            },
            summary: {
                title: 'Your Investment Summary',
                progressChart: 'Here is your investment progress chart',
                targetVsCurrent: 'Target vs Current'
            }
        },
        reports: {
            title: 'Reports',
            monthly: 'Monthly Summary',
            yearly: 'Yearly Summary',
            exportCSV: 'Export CSV',
            exportPDF: 'Export PDF (Coming soon)'
        },
        settings: {
            title: 'Settings',
            darkMode: 'Dark Mode',
            security: 'Security (PIN/Biometric)',
            dataBackup: 'Data Backup (Drive/Local)',
            exportData: 'Export Data',
            language: 'Language',
            notifications: 'Notifications',
            about: 'About App',
            help: 'Help'
        },
        common: {
            save: 'Save',
            cancel: 'Cancel',
            close: 'Close',
            delete: 'Delete',
            edit: 'Edit',
            total: 'Total'
        }
    }
};