import api from './api';

export const getFinancialHealthScore = async () => {
  const response = await api.get('decision/health-score/');
  return response.data;
};

export const evaluateAffordability = async (payload) => {
  const response = await api.post('decision/can-i-afford/', payload);
  return response.data;
};

export const getCashFlowPrediction = async (days = 90) => {
  const response = await api.get(`decision/cash-flow-predict/?days=${days}`);
  return response.data;
};

export const getFinancialGoals = async () => {
  const response = await api.get('decision/goals/');
  return response.data;
};

export const simulateGoal = async (payload) => {
  const response = await api.post('decision/goals/simulate/', payload);
  return response.data;
};

export const getAiRecommendations = async () => {
  const response = await api.get('decision/recommendations/');
  return response.data;
};
