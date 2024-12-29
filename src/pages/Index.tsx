import LoanCalculator from "@/components/LoanCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Loan Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your monthly payments and total costs
          </p>
        </div>
        <LoanCalculator />
      </div>
    </div>
  );
};

export default Index;