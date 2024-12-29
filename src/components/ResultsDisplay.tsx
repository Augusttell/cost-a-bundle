import { Card } from "@/components/ui/card";

interface ResultsDisplayProps {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  additionalCosts: number;
}

const ResultsDisplay = ({
  monthlyPayment,
  totalPayment,
  totalInterest,
  additionalCosts,
}: ResultsDisplayProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideUpAndFade">
      <Card className="p-6 space-y-2">
        <h3 className="text-lg font-semibold">Monthly Payment</h3>
        <p className="text-3xl font-bold text-primary">
          {formatCurrency(monthlyPayment)}
        </p>
      </Card>
      <Card className="p-6 space-y-2">
        <h3 className="text-lg font-semibold">Total Payment</h3>
        <p className="text-3xl font-bold text-primary">
          {formatCurrency(totalPayment)}
        </p>
      </Card>
      <Card className="p-6 space-y-2">
        <h3 className="text-lg font-semibold">Total Interest</h3>
        <p className="text-3xl font-bold text-primary">
          {formatCurrency(totalInterest)}
        </p>
      </Card>
      <Card className="p-6 space-y-2">
        <h3 className="text-lg font-semibold">Additional Costs</h3>
        <p className="text-3xl font-bold text-primary">
          {formatCurrency(additionalCosts)}
        </p>
      </Card>
    </div>
  );
};

export default ResultsDisplay;