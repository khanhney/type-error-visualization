# Type I & II Error Playground 🎯

An interactive visualization tool for understanding Type I (False Positive) and Type II (False Negative) errors in machine learning classification models. Master the trade-off between precision and recall through real-world scenarios.

## 🎯 What is this?

This interactive playground helps you understand the critical trade-offs in machine learning classification by visualizing how different decision thresholds affect Type I and Type II errors across three real-world scenarios:

- **🩺 Medical Diagnosis**: Balancing patient safety vs. unnecessary testing
- **💳 Credit Card Fraud**: Weighing security vs. customer experience  
- **🎯 Ad Targeting**: Optimizing marketing spend vs. missed opportunities

## ✨ Features

### Interactive Learning
- **Real-time threshold adjustment** with immediate visual feedback
- **Cost analysis** showing the financial impact of different error types
- **Confusion matrix visualization** with color-coded results
- **Interactive quizzes** to test your understanding

### Three Realistic Scenarios
- **Medical Diagnosis**: When missing a disease is catastrophic
- **Fraud Detection**: When blocking legitimate transactions annoys customers
- **Marketing Campaigns**: When ad spend efficiency matters most

### Advanced Analytics
- **Dynamic cost modeling** with editable parameters
- **Statistical simulation** with 1000+ data points
- **Precision-Recall curves** for threshold optimization
- **Comprehensive metrics** (TP, FP, FN, TN, Precision, Recall, FPR, FNR)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd type1-2-errors-visualization
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🎮 How to Use

### 1. Choose a Scenario
Select from three real-world scenarios using the scenario buttons at the top:
- **Medical Diagnosis** 🩺
- **Credit Card Fraud** 💳  
- **Ad Targeting** 🎯

### 2. Adjust the Decision Threshold
- Use the slider to change the classification threshold (0.0 to 1.0)
- Watch how this affects the confusion matrix in real-time
- Observe the trade-off between Type I and Type II errors

### 3. Analyze Costs
- Modify the cost parameters for False Positives and False Negatives
- See how different cost structures affect optimal threshold selection
- Understand the business impact of classification decisions

### 4. Test Your Knowledge
- Answer scenario-specific quiz questions
- Get immediate feedback with detailed explanations
- Learn the practical implications of different strategies

## 🧠 Learning Objectives

After using this tool, you'll understand:

- **Type I vs Type II Errors**: When each type of error is more costly
- **Threshold Optimization**: How to balance precision and recall
- **Cost-Benefit Analysis**: Making data-driven decisions about model thresholds
- **Real-world Applications**: How these concepts apply across different industries
- **Confusion Matrix Interpretation**: Reading and understanding classification results

## 🛠️ Technical Details

### Built With
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization

### Architecture
- **Component-based design** with reusable UI components
- **Custom hooks** for simulation logic and state management
- **Type-safe interfaces** for all data structures
- **Responsive design** that works on desktop and mobile

### Key Components
- `App.tsx` - Main application with scenario selection
- `Playground.tsx` - Interactive simulation interface
- `ConfusionMatrix.tsx` - Visual representation of classification results
- `useSimulation.ts` - Custom hook for statistical simulation
- `constants.ts` - Scenario definitions and parameters

## 📊 Statistical Simulation

The application uses a sophisticated simulation approach:

- **1000 data points** per simulation for statistical significance
- **Normal distribution sampling** for realistic probability distributions
- **Box-Muller transform** for generating normally distributed random numbers
- **Dynamic threshold analysis** across the full probability range

## 🎯 Educational Value

This tool is perfect for:
- **Data Science students** learning classification metrics
- **Machine Learning practitioners** optimizing model thresholds
- **Business stakeholders** understanding the cost of ML decisions
- **Educators** teaching statistical concepts with interactive examples

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional real-world scenarios
- More sophisticated cost modeling
- Advanced visualization features
- Mobile responsiveness enhancements
- Accessibility improvements

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built to make statistical concepts intuitive and memorable. Special thanks to the machine learning community for inspiring this educational tool.

---

**Made with ❤️ for the data science community**