import { createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

export const BudgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

// {id:
// name:
// max:
// }
// {id:
//   budgetId:
//   amount:
//   description:
//   }

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addExpenses = ({ description, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  };

  const addBudget = ({ name, max }) => {
    setBudgets((prev) => {
      if (prev.find((budget) => budget.name === name)) {
        return prev;
      }
      return [...prev, { id: uuidV4(), name, max }];
    });
  };
  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expanse) => {
        if (expanse.budgetId !== id) return expanse;
        return { ...expanse, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  };
  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
