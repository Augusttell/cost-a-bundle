import { useQuery } from "@tanstack/react-query";

interface LoanData {
  averageInterestRate: number;
  recommendedTerm: number;
  // Add more fields as needed based on your API response
}

const fetchLoanData = async (): Promise<LoanData> => {
  const response = await fetch("https://api.example.com/loan-data");
  if (!response.ok) {
    throw new Error("Failed to fetch loan data");
  }
  return response.json();
};

export const useExternalData = () => {
  return useQuery({
    queryKey: ["loanData"],
    queryFn: fetchLoanData,
  });
};