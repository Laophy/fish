export const generateDailyChallenge = () => ({
  tasks: [
    {
      type: "CATCH_FISH",
      amount: Math.floor(Math.random() * 1000) + 500,
      reward: 1000,
    },
    {
      type: "GOLDEN_FISH",
      amount: Math.floor(Math.random() * 5) + 3,
      reward: 2000,
    },
    {
      type: "MAX_COMBO",
      amount: Math.floor(Math.random() * 20) + 10,
      reward: 1500,
    },
  ],
});
