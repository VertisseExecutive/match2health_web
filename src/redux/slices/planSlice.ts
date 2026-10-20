import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlanData {
  id: string;
  range: string;
  employeesLabel: string;
  price: string;
  billingCycle: string;
  trialText: string;
  buttonText: string;
  isMostPopular?: boolean;
}

interface PlanState {
  selectedPlan: PlanData | null;
  plans: PlanData[];
}

const initialPlans: PlanData[] = [
  {
    id: "plan-1",
    range: "1–49",
    employeesLabel: "Employees",
    price: "$49",
    billingCycle: "/month",
    trialText: "14-Day Free Trial",
    buttonText: "Choose Plan",
  },
  {
    id: "plan-2",
    range: "50–299",
    employeesLabel: "Employees",
    price: "$99",
    billingCycle: "/month",
    trialText: "14-Day Free Trial",
    buttonText: "Choose Plan",
  },
  {
    id: "plan-3",
    range: "300–999",
    employeesLabel: "Employees",
    price: "$199",
    billingCycle: "/month",
    trialText: "14-Day Free Trial",
    buttonText: "Choose Plan",
  },
  {
    id: "plan-4",
    range: "999+",
    employeesLabel: "Employees",
    price: "$299",
    billingCycle: "/month",
    trialText: "14-Day Free Trial",
    buttonText: "Choose Plan",
    isMostPopular: true,
  },
];

const initialState: PlanState = {
  selectedPlan: initialPlans[0],
  plans: initialPlans,
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setSelectedPlan: (state, action: PayloadAction<PlanData>) => {
      state.selectedPlan = action.payload;
    },
    clearSelectedPlan: (state) => {
      state.selectedPlan = null;
    },
  },
});

export const { setSelectedPlan, clearSelectedPlan } = planSlice.actions;
export default planSlice.reducer;
