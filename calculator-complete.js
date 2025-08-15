// Complete Calculator System - All-in-One File
// This file contains all calculator functionality in a single JavaScript file

// Mathematical utility functions
const MathUtils = {
  // Basic calculations
  calculatePercentage: (value, percentage) => (value * percentage) / 100,
  
  calculatePercentageChange: (oldValue, newValue) => ((newValue - oldValue) / oldValue) * 100,
  
  // Financial calculations
  calculateMortgage: (principal, rate, years) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }
    
    return principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  },
  
  calculateLoan: (principal, rate, years) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }
    
    return principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  },
  
  calculateCompoundInterest: (principal, rate, time, frequency = 12) => {
    return principal * Math.pow(1 + (rate / 100) / frequency, frequency * time);
  },
  
  calculateSimpleInterest: (principal, rate, time) => {
    return principal * (1 + (rate / 100) * time);
  },
  
  // Health calculations
  calculateBMI: (weight, height, unit = 'metric') => {
    let weightKg = weight;
    let heightM = height;
    
    if (unit === 'imperial') {
      weightKg = weight * 0.453592; // lbs to kg
      heightM = (height * 2.54) / 100; // inches to meters
    } else {
      heightM = height / 100; // cm to meters
    }
    
    return weightKg / (heightM * heightM);
  },
  
  getBMICategory: (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  },
  
  calculateBMR: (weight, height, age, gender, unit = 'metric') => {
    let weightKg = weight;
    let heightCm = height;
    
    if (unit === 'imperial') {
      weightKg = weight * 0.453592; // lbs to kg
      heightCm = height * 2.54; // inches to cm
    }
    
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  },
  
  calculateCalories: (bmr, activityLevel) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    return bmr * (multipliers[activityLevel] || 1.2);
  },
  
  // Math calculations
  calculateFraction: (num1, den1, num2, den2, operation) => {
    let resultNum, resultDen;
    
    switch (operation) {
      case 'add':
        resultNum = num1 * den2 + num2 * den1;
        resultDen = den1 * den2;
        break;
      case 'subtract':
        resultNum = num1 * den2 - num2 * den1;
        resultDen = den1 * den2;
        break;
      case 'multiply':
        resultNum = num1 * num2;
        resultDen = den1 * den2;
        break;
      case 'divide':
        resultNum = num1 * den2;
        resultDen = den1 * num2;
        break;
      default:
        resultNum = 0;
        resultDen = 1;
    }
    
    // Simplify fraction
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(Math.abs(resultNum), Math.abs(resultDen));
    
    return {
      numerator: resultNum / commonDivisor,
      denominator: resultDen / commonDivisor
    };
  },
  
  calculateStatistics: (numbers) => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    
    // Median
    const median = numbers.length % 2 === 0
      ? (sorted[numbers.length / 2 - 1] + sorted[numbers.length / 2]) / 2
      : sorted[Math.floor(numbers.length / 2)];
    
    // Mode
    const frequency = {};
    numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
      .filter(key => frequency[Number(key)] === maxFreq)
      .map(Number);
    
    // Variance and Standard Deviation
    const variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
    const standardDeviation = Math.sqrt(variance);
    
    return { mean, median, mode, standardDeviation, variance };
  },
  
  // Date calculations
  calculateAge: (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += lastDayOfPreviousMonth;
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return { years, months, days };
  },
  
  calculateDateDifference: (date1, date2) => {
    const startDate = new Date(Math.min(date1.getTime(), date2.getTime()));
    const endDate = new Date(Math.max(date1.getTime(), date2.getTime()));
    
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
    
    if (days < 0) {
      months--;
      const lastDayOfPreviousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
      days += lastDayOfPreviousMonth;
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return { years, months, days, totalDays };
  },
  
  // GPA calculation
  calculateGPA: (grades) => {
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    grades.forEach(({ grade, credits }) => {
      totalPoints += (gradePoints[grade] || 0) * credits;
      totalCredits += credits;
    });
    
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }
};

// Scientific Calculator Class
class ScientificCalculator {
  constructor() {
    this.display = '0';
    this.previousValue = null;
    this.operator = null;
    this.memory = 0;
    this.history = [];
  }
  
  // Basic operations
  clear() {
    this.display = '0';
    this.previousValue = null;
    this.operator = null;
  }
  
  inputNumber(num) {
    if (this.display === '0') {
      this.display = num.toString();
    } else {
      this.display += num.toString();
    }
  }
  
  inputOperator(nextOperator) {
    const inputValue = parseFloat(this.display);
    
    if (this.previousValue === null) {
      this.previousValue = inputValue;
    } else if (this.operator) {
      const currentValue = this.previousValue || 0;
      const newValue = this.calculate(currentValue, inputValue, this.operator);
      
      this.display = String(newValue);
      this.previousValue = newValue;
    }
    
    this.operator = nextOperator;
  }
  
  calculate(firstValue, secondValue, operator) {
    switch (operator) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      case '^': return Math.pow(firstValue, secondValue);
      case 'mod': return firstValue % secondValue;
      default: return secondValue;
    }
  }
  
  // Scientific functions
  sin() { this.display = Math.sin(parseFloat(this.display)).toString(); }
  cos() { this.display = Math.cos(parseFloat(this.display)).toString(); }
  tan() { this.display = Math.tan(parseFloat(this.display)).toString(); }
  log() { this.display = Math.log10(parseFloat(this.display)).toString(); }
  ln() { this.display = Math.log(parseFloat(this.display)).toString(); }
  sqrt() { this.display = Math.sqrt(parseFloat(this.display)).toString(); }
  square() { this.display = Math.pow(parseFloat(this.display), 2).toString(); }
  factorial() {
    const n = parseInt(this.display);
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    this.display = result.toString();
  }
  
  // Memory functions
  memoryClear() { this.memory = 0; }
  memoryRecall() { this.display = this.memory.toString(); }
  memoryAdd() { this.memory += parseFloat(this.display); }
  memorySubtract() { this.memory -= parseFloat(this.display); }
}

// Financial Calculator Class
class FinancialCalculator {
  static calculateMortgageDetails(principal, rate, years) {
    const monthlyPayment = MathUtils.calculateMortgage(principal, rate, years);
    const totalPayments = monthlyPayment * years * 12;
    const totalInterest = totalPayments - principal;
    
    return {
      monthlyPayment,
      totalPayments,
      totalInterest,
      principal
    };
  }
  
  static calculateLoanDetails(principal, rate, years) {
    const monthlyPayment = MathUtils.calculateLoan(principal, rate, years);
    const totalPayments = monthlyPayment * years * 12;
    const totalInterest = totalPayments - principal;
    
    return {
      monthlyPayment,
      totalPayments,
      totalInterest,
      principal
    };
  }
  
  static calculateInvestmentGrowth(principal, rate, years, monthlyContribution = 0) {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    
    // Future value of initial investment
    const futureValueInitial = principal * Math.pow(1 + monthlyRate, totalMonths);
    
    // Future value of monthly contributions
    const futureValueContributions = monthlyContribution * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    const totalValue = futureValueInitial + futureValueContributions;
    const totalContributions = principal + (monthlyContribution * totalMonths);
    const totalGains = totalValue - totalContributions;
    
    return {
      totalValue,
      totalContributions,
      totalGains,
      principal,
      monthlyContribution
    };
  }
}

// Health Calculator Class
class HealthCalculator {
  static calculateBMIWithDetails(weight, height, unit = 'metric') {
    const bmi = MathUtils.calculateBMI(weight, height, unit);
    const category = MathUtils.getBMICategory(bmi);
    
    return {
      bmi,
      category,
      weight,
      height,
      unit
    };
  }
  
  static calculateDailyCalories(weight, height, age, gender, activityLevel, unit = 'metric') {
    const bmr = MathUtils.calculateBMR(weight, height, age, gender, unit);
    const dailyCalories = MathUtils.calculateCalories(bmr, activityLevel);
    
    return {
      bmr,
      dailyCalories,
      maintenanceCalories: dailyCalories,
      weightLossCalories: dailyCalories - 500,
      weightGainCalories: dailyCalories + 500
    };
  }
  
  static calculateBodyFat(gender, age, bmi) {
    if (gender === 'male') {
      return 1.20 * bmi + 0.23 * age - 16.2;
    } else {
      return 1.20 * bmi + 0.23 * age - 5.4;
    }
  }
}

// Utility Calculator Class
class UtilityCalculator {
  static calculateAgeDetails(birthDate) {
    const age = MathUtils.calculateAge(birthDate);
    const birth = new Date(birthDate);
    const today = new Date();
    
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = age.years * 12 + age.months;
    
    return {
      ...age,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: this.calculateNextBirthday(birth)
    };
  }
  
  static calculateNextBirthday(birthDate) {
    const today = new Date();
    const thisYear = today.getFullYear();
    let nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(thisYear);
    
    if (nextBirthday < today) {
      nextBirthday.setFullYear(thisYear + 1);
    }
    
    const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      date: nextBirthday,
      daysUntil
    };
  }
  
  static calculateGPAWithDetails(courses) {
    const gpa = MathUtils.calculateGPA(courses);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const qualityPoints = gpa * totalCredits;
    
    const gradeDistribution = {};
    courses.forEach(course => {
      gradeDistribution[course.grade] = (gradeDistribution[course.grade] || 0) + 1;
    });
    
    return {
      gpa,
      totalCredits,
      qualityPoints,
      courseCount: courses.length,
      gradeDistribution
    };
  }
}

// HTML Interface Generator
class CalculatorInterface {
  static generateScientificCalculator() {
    return `
    <div class="calculator scientific-calculator">
      <div class="display">
        <input type="text" id="display" readonly value="0">
      </div>
      <div class="buttons">
        <button onclick="calc.clear()">C</button>
        <button onclick="calc.memoryClear()">MC</button>
        <button onclick="calc.memoryRecall()">MR</button>
        <button onclick="calc.memoryAdd()">M+</button>
        <button onclick="calc.memorySubtract()">M-</button>
        
        <button onclick="calc.sin()">sin</button>
        <button onclick="calc.cos()">cos</button>
        <button onclick="calc.tan()">tan</button>
        <button onclick="calc.log()">log</button>
        <button onclick="calc.ln()">ln</button>
        
        <button onclick="calc.inputNumber(7)">7</button>
        <button onclick="calc.inputNumber(8)">8</button>
        <button onclick="calc.inputNumber(9)">9</button>
        <button onclick="calc.inputOperator('/')">/</button>
        <button onclick="calc.sqrt()">√</button>
        
        <button onclick="calc.inputNumber(4)">4</button>
        <button onclick="calc.inputNumber(5)">5</button>
        <button onclick="calc.inputNumber(6)">6</button>
        <button onclick="calc.inputOperator('*')">×</button>
        <button onclick="calc.square()">x²</button>
        
        <button onclick="calc.inputNumber(1)">1</button>
        <button onclick="calc.inputNumber(2)">2</button>
        <button onclick="calc.inputNumber(3)">3</button>
        <button onclick="calc.inputOperator('-')">-</button>
        <button onclick="calc.factorial()">n!</button>
        
        <button onclick="calc.inputNumber(0)">0</button>
        <button onclick="calc.inputNumber('.')">.</button>
        <button onclick="calc.inputOperator('=')">=</button>
        <button onclick="calc.inputOperator('+')">+</button>
        <button onclick="calc.inputOperator('^')">x^y</button>
      </div>
    </div>`;
  }
  
  static generateMortgageCalculator() {
    return `
    <div class="calculator mortgage-calculator">
      <h2>Mortgage Calculator</h2>
      <form id="mortgageForm">
        <label>Loan Amount ($): <input type="number" id="principal" step="1000"></label>
        <label>Interest Rate (%): <input type="number" id="rate" step="0.01"></label>
        <label>Loan Term (years): <input type="number" id="years"></label>
        <button type="submit">Calculate</button>
      </form>
      <div id="mortgageResults"></div>
    </div>`;
  }
  
  static generateBMICalculator() {
    return `
    <div class="calculator bmi-calculator">
      <h2>BMI Calculator</h2>
      <form id="bmiForm">
        <label>Weight: <input type="number" id="weight" step="0.1"></label>
        <label>Height: <input type="number" id="height" step="0.1"></label>
        <label>Unit: 
          <select id="unit">
            <option value="metric">Metric (kg/cm)</option>
            <option value="imperial">Imperial (lbs/in)</option>
          </select>
        </label>
        <button type="submit">Calculate BMI</button>
      </form>
      <div id="bmiResults"></div>
    </div>`;
  }
}

// Main Calculator Application
class CalculatorApp {
  constructor() {
    this.scientificCalc = new ScientificCalculator();
    this.currentCalculator = 'scientific';
    this.init();
  }
  
  init() {
    // Initialize the application
    this.setupEventListeners();
    this.loadCalculator('scientific');
  }
  
  setupEventListeners() {
    // Add event listeners for calculator switching
    document.addEventListener('DOMContentLoaded', () => {
      // Setup navigation if exists
      const navButtons = document.querySelectorAll('.nav-button');
      navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          this.loadCalculator(e.target.dataset.calculator);
        });
      });
    });
  }
  
  loadCalculator(type) {
    this.currentCalculator = type;
    const container = document.getElementById('calculatorContainer');
    
    switch (type) {
      case 'scientific':
        container.innerHTML = CalculatorInterface.generateScientificCalculator();
        this.setupScientificCalculator();
        break;
      case 'mortgage':
        container.innerHTML = CalculatorInterface.generateMortgageCalculator();
        this.setupMortgageCalculator();
        break;
      case 'bmi':
        container.innerHTML = CalculatorInterface.generateBMICalculator();
        this.setupBMICalculator();
        break;
    }
  }
  
  setupScientificCalculator() {
    window.calc = this.scientificCalc;
    
    // Update display function
    const updateDisplay = () => {
      document.getElementById('display').value = this.scientificCalc.display;
    };
    
    // Override methods to update display
    const originalMethods = ['clear', 'inputNumber', 'inputOperator', 'sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'square', 'factorial'];
    originalMethods.forEach(method => {
      const original = this.scientificCalc[method].bind(this.scientificCalc);
      this.scientificCalc[method] = function(...args) {
        original(...args);
        updateDisplay();
      };
    });
  }
  
  setupMortgageCalculator() {
    document.getElementById('mortgageForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const principal = parseFloat(document.getElementById('principal').value);
      const rate = parseFloat(document.getElementById('rate').value);
      const years = parseFloat(document.getElementById('years').value);
      
      const results = FinancialCalculator.calculateMortgageDetails(principal, rate, years);
      
      document.getElementById('mortgageResults').innerHTML = `
        <h3>Results:</h3>
        <p>Monthly Payment: $${results.monthlyPayment.toFixed(2)}</p>
        <p>Total Payments: $${results.totalPayments.toFixed(2)}</p>
        <p>Total Interest: $${results.totalInterest.toFixed(2)}</p>
      `;
    });
  }
  
  setupBMICalculator() {
    document.getElementById('bmiForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      const unit = document.getElementById('unit').value;
      
      const results = HealthCalculator.calculateBMIWithDetails(weight, height, unit);
      
      document.getElementById('bmiResults').innerHTML = `
        <h3>Results:</h3>
        <p>BMI: ${results.bmi.toFixed(1)}</p>
        <p>Category: ${results.category}</p>
      `;
    });
  }
}

// CSS Styles
const styles = `
<style>
.calculator {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
}

.display {
  margin-bottom: 20px;
}

.display input {
  width: 100%;
  height: 60px;
  font-size: 24px;
  text-align: right;
  padding: 10px;
  border: 2px solid #333;
  border-radius: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.buttons button {
  height: 50px;
  font-size: 16px;
  border: 1px solid #666;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
}

.buttons button:hover {
  background: #f0f0f0;
}

.buttons button:active {
  background: #ddd;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

form label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

form input, form select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

form button {
  padding: 12px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background: #0056b3;
}

#mortgageResults, #bmiResults {
  margin-top: 20px;
  padding: 15px;
  background: #e7f3ff;
  border-radius: 5px;
  border-left: 4px solid #007bff;
}

.nav-button {
  margin: 5px;
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.nav-button:hover {
  background: #218838;
}
</style>
`;

// HTML Template
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Calculator System</title>
    ${styles}
</head>
<body>
    <h1 style="text-align: center;">Complete Calculator System</h1>
    
    <div style="text-align: center; margin: 20px;">
        <button class="nav-button" data-calculator="scientific">Scientific Calculator</button>
        <button class="nav-button" data-calculator="mortgage">Mortgage Calculator</button>
        <button class="nav-button" data-calculator="bmi">BMI Calculator</button>
    </div>
    
    <div id="calculatorContainer">
        <!-- Calculator will be loaded here -->
    </div>
    
    <script>
        // Include all the JavaScript code here
        ${MathUtils.toString()}
        ${ScientificCalculator.toString()}
        ${FinancialCalculator.toString()}
        ${HealthCalculator.toString()}
        ${UtilityCalculator.toString()}
        ${CalculatorInterface.toString()}
        ${CalculatorApp.toString()}
        
        // Initialize the application
        const app = new CalculatorApp();
    </script>
</body>
</html>
`;

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MathUtils,
    ScientificCalculator,
    FinancialCalculator,
    HealthCalculator,
    UtilityCalculator,
    CalculatorInterface,
    CalculatorApp,
    htmlTemplate
  };
}

// Usage Examples:
/*
// Scientific Calculator
const calc = new ScientificCalculator();
calc.inputNumber(5);
calc.inputOperator('+');
calc.inputNumber(3);
calc.inputOperator('=');
console.log(calc.display); // "8"

// Financial Calculations
const mortgage = FinancialCalculator.calculateMortgageDetails(300000, 3.5, 30);
console.log(mortgage.monthlyPayment); // Monthly payment amount

// Health Calculations
const bmi = HealthCalculator.calculateBMIWithDetails(70, 175, 'metric');
console.log(bmi.bmi, bmi.category); // BMI value and category

// Utility Calculations
const age = UtilityCalculator.calculateAgeDetails('1990-01-01');
console.log(age.years, age.months, age.days); // Age breakdown
*/

console.log("Complete Calculator System loaded successfully!");