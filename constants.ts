import type { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'medical',
    title: 'Medical Diagnosis',
    icon: '🩺',
    description: 'A model predicts if a patient has a rare, serious disease. The goal is to catch as many true cases as possible, even if it means some healthy patients get a false alarm.',
    positiveLabel: 'Has Disease',
    negativeLabel: 'Healthy',
    costFP: 100, // Cost of a false alarm (more tests, patient anxiety)
    costFN: 5000, // Cost of missing a case (disease progresses, severe health risk)
    fp_description: "A healthy patient is told they might have the disease. This causes stress and requires further, costly testing.",
    fn_description: "A sick patient is told they are healthy. The disease is missed, leading to severe health consequences.",
    quiz: {
      question: "As a doctor developing this diagnostic tool, which error is more dangerous to make?",
      options: [
        { text: "Type I (False Positive)", explanation: "While not ideal, a false alarm leads to more testing which can confirm the patient is healthy. The alternative is worse.", correct: false },
        { text: "Type II (False Negative)", explanation: "Correct. Missing a real case is catastrophic. It's better to have some false alarms than to miss someone who needs treatment.", correct: true },
      ],
    },
  },
  {
    id: 'fraud',
    title: 'Credit Card Fraud',
    icon: '💳',
    description: 'A model flags credit card transactions as potentially fraudulent. The bank wants to block fraud, but not inconvenience legitimate customers too often.',
    positiveLabel: 'Fraudulent',
    negativeLabel: 'Legitimate',
    costFP: 50, // Cost of blocking a valid transaction (customer annoyance, support call)
    costFN: 800, // Cost of letting fraud happen (financial loss)
    fp_description: "A valid transaction is blocked. The customer is inconvenienced and may need to call the bank.",
    fn_description: "A fraudulent transaction is approved. The bank or customer loses money.",
    quiz: {
      question: "As a fraud detection manager, how should you set the threshold to balance security and customer experience?",
      options: [
        { text: "Set a low threshold to catch more potential fraud", explanation: "Correct. This increases False Positives (annoyed customers) but minimizes False Negatives (financial loss), which is often the primary goal.", correct: true },
        { text: "Set a high threshold to avoid bothering customers", explanation: "This would reduce customer friction but could lead to significant financial losses from missed fraud.", correct: false },
      ],
    },
  },
  {
    id: 'marketing',
    title: 'Ad Targeting',
    icon: '🎯',
    description: 'A model predicts which users will click a "buy" button if shown an ad. The company has a limited budget and wants to show ads only to the most likely buyers.',
    positiveLabel: 'Will Buy',
    negativeLabel: 'Will Not Buy',
    costFP: 5,   // Cost of showing an ad to someone who won't buy (wasted ad spend)
    costFN: 20,  // Cost of not showing an ad to a potential buyer (missed sale opportunity)
    fp_description: "An ad is shown to a user who is not interested. This wastes a small amount of the ad budget.",
    fn_description: "A likely buyer is not shown an ad. This results in a lost potential sale, which is a higher opportunity cost.",
    quiz: {
      question: "For a high-cost luxury product ad campaign, what's the better strategy?",
      options: [
        { text: "Prioritize Precision (low False Positives)", explanation: "Correct. With a high ad cost, you want to be very sure the people you target are likely to buy. It's better to miss some potential customers than to waste money on uninterested ones.", correct: true },
        { text: "Prioritize Recall (low False Negatives)", explanation: "This would mean showing the ad to a very wide audience to ensure no potential buyer is missed, but it would be very expensive and inefficient.", correct: false },
      ],
    },
  },
];
