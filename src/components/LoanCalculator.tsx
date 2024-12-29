import { useState } from "react";
import InputSlider from "./InputSlider";
import ResultsDisplay from "./ResultsDisplay";
import { Card } from "@/components/ui/card";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(5);
  const [additionalCosts, setAdditionalCosts] = useState(2000);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments + additionalCosts;
    const totalInterest = totalPayment - loanAmount - additionalCosts;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      additionalCosts,
    };
  };

  const results = calculateLoan();

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-6">
        <InputSlider
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          min={10000}
          max={1000000}
          step={1000}
          unit="$"
        />
        <InputSlider
          label="Loan Term"
          value={loanTerm}
          onChange={setLoanTerm}
          min={1}
          max={30}
          step={1}
          unit="years"
        />
        <InputSlider
          label="Interest Rate (APR)"
          value={interestRate}
          onChange={setInterestRate}
          min={0.1}
          max={15}
          step={0.1}
          unit="%"
        />
        <InputSlider
          label="Additional Costs"
          value={additionalCosts}
          onChange={setAdditionalCosts}
          min={0}
          max={10000}
          step={100}
          unit="$"
        />
      </div>
      <ResultsDisplay {...results} />
    </Card>
  );
};

export default LoanCalculator;