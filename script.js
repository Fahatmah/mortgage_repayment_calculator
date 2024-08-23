const form = document.getElementById('mortgageForm')
const mortgageAmount = document.getElementById('mortgage-amount')
const mortgageTerm = document.getElementById('mortgage-term')
const interestRate = document.getElementById('interest-rate')
const repaymentButton = document.getElementById('repayment')
const interestOnlyButton = document.getElementById('interest-only')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let mortgageAmountVal = mortgageAmount.value
  let mortgageTermVal = mortgageTerm.value
  let interestRateVal = interestRate.value

  if (repaymentButton.checked) {
    console.log('repayment')
    calculateMortgageRepayment(
      mortgageAmountVal,
      mortgageTermVal,
      interestRateVal
    )
  }
  if (interestOnlyButton.checked) {
    console.log('interest only')
    calculateMortgageInterestOnly(
      mortgageAmountVal,
      interestRateVal,
      mortgageTermVal
    )
  }
})

// let mortgageAmount = 300000,
//   mortgageTerm = 25,
//   interestRate = 5.25
// CALCULATE MORTGAGE REPAYMENT
function calculateMortgageRepayment(
  principal,
  numberOfPayments,
  monthlyInterestRate
) {
  let r = monthlyInterestRate / 100 / 12
  let n = numberOfPayments * 12
  let m = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalRepayment = m * n
  return [m.toFixed(2), totalRepayment.toFixed(2)].map(Number)
  // console.log([m.toFixed(2), totalRepayment.toFixed(2)].map(Number))
}
// console.log(
//   calculateMortgageRepayment(mortgageAmount, mortgageTerm, interestRate)
// )
// monthly repayments => 1,797.74
// total repayment over the term => 539,322.94

// CALCULATE MORTGAGE (INTEREST ONLY)
function calculateMortgageInterestOnly(
  mortgageAmount,
  annualInterestRate,
  interestOnlyYears
) {
  let annualRateDecimal = annualInterestRate / 100
  let interestOnlyMonthlyPayment = (mortgageAmount * annualRateDecimal) / 12
  let totalInterestOnlyPayment =
    interestOnlyMonthlyPayment * (interestOnlyYears * 12)
  return [interestOnlyMonthlyPayment, totalInterestOnlyPayment]
  // console.log([interestOnlyMonthlyPayment, totalInterestOnlyPayment])
}
// console.log(calculateMortgageInterestOnly(400000, 3.75, 5))
// monthly payment (interest only) => 1250.00
// total repayment (interest only) => 75000

// TODO
// FORM VALIDATION
// CLEAR FORM BUTTON
// DISPLAY RESULTS
// DESIGN RESPONSIVENESS
