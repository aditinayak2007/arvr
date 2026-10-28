import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Calendar, 
  ShieldAlert, 
  Sparkles, 
  HelpCircle,
  PiggyBank,
  CheckCircle2
} from 'lucide-react';

export default function EMICalculator({ initialPrice = 6000000, carName = "Selected Vehicle" }) {
  const [carPrice, setCarPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20% down payment
  const [loanTenureYears, setLoanTenureYears] = useState(5); // 5 years = 60 months
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% annual interest

  // Calculated values
  const calculations = useMemo(() => {
    const downPayment = (carPrice * downPaymentPercent) / 100;
    const principal = carPrice - downPayment;
    const months = loanTenureYears * 12;
    const monthlyRate = interestRate / 12 / 100;

    // EMI formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
    let emi = 0;
    if (principal > 0 && monthlyRate > 0) {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    } else if (principal > 0) {
      emi = principal / months;
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    const principalPercent = totalPayment > 0 ? (principal / totalPayment) * 100 : 100;
    const interestPercent = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

    return {
      downPayment,
      principal,
      months,
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercent: Math.round(principalPercent),
      interestPercent: Math.round(interestPercent),
    };
  }, [carPrice, downPaymentPercent, loanTenureYears, interestRate]);

  const formatCurrency = (val) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-['Orbitron',sans-serif] text-lg sm:text-xl font-bold text-white">
              Estimate Your Monthly Payment
            </h3>
            <p className="text-xs text-slate-400">
              Interactive Financing & EMI Simulator for {carName}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono">
            ESTIMATED MONTHLY PAYMENT
          </span>
          <span className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-black text-cyan-400">
            {formatCurrency(calculations.emi)}
            <span className="text-xs text-slate-400 font-sans font-normal"> /month</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Visual Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Vehicle Price Input & Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">Vehicle Base Price</label>
              <span className="font-mono font-bold text-white text-sm">
                {formatCurrency(carPrice)}
              </span>
            </div>
            <input
              type="range"
              min="1500000"
              max="20000000"
              step="100000"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* 2. Down Payment Percentage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="font-mono font-bold text-cyan-300 text-sm">
                {formatCurrency(calculations.downPayment)}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* 3. Loan Tenure & Interest Rate Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tenure in Years */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Loan Duration: <span className="text-cyan-400">{loanTenureYears} Years</span> ({calculations.months} Months)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[3, 4, 5, 7].map((yrs) => (
                  <button
                    key={yrs}
                    type="button"
                    onClick={() => setLoanTenureYears(yrs)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      loanTenureYears === yrs
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {yrs} Yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-300">Interest Rate</label>
                <span className="font-mono font-bold text-white">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="6.5"
                max="14.0"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Right Output & Breakdown (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-black/40 border border-white/10 space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-['Orbitron',sans-serif]">
              Financing Breakdown
            </h4>

            {/* Visual Bar Breakdown */}
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-800">
                <div
                  className="bg-cyan-400 transition-all duration-300"
                  style={{ width: `${calculations.principalPercent}%` }}
                  title={`Principal: ${calculations.principalPercent}%`}
                />
                <div
                  className="bg-indigo-500 transition-all duration-300"
                  style={{ width: `${calculations.interestPercent}%` }}
                  title={`Interest: ${calculations.interestPercent}%`}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-cyan-400">● Principal ({calculations.principalPercent}%)</span>
                <span className="text-indigo-400">● Total Interest ({calculations.interestPercent}%)</span>
              </div>
            </div>

            {/* Financial Summary Cards */}
            <div className="space-y-2.5 pt-2 text-xs divide-y divide-white/[0.06]">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Net Loan Principal:</span>
                <span className="font-mono font-semibold text-white">
                  {formatCurrency(calculations.principal)}
                </span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Estimated Total Interest:</span>
                <span className="font-mono font-semibold text-indigo-300">
                  {formatCurrency(calculations.totalInterest)}
                </span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Total Payable Amount:</span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatCurrency(calculations.totalPayment)}
                </span>
              </div>
            </div>
          </div>

          {/* Financing Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-[11px] text-slate-400 leading-relaxed">
            <p className="font-semibold text-cyan-300/90 mb-0.5">Indicative Financing Estimate</p>
            Actual financing terms, processing fees, insurance and taxes may vary based on credit profile, lender approval, and local vehicle registration policies.
          </div>
        </div>
      </div>
    </div>
  );
}
