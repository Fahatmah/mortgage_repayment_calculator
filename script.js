const form = document.getElementById('mortgageForm')
const mortgageAmount = document.getElementById('mortgage-amount')
const mortgageTerm = document.getElementById('mortgage-term')
const interestRate = document.getElementById('interest-rate')
const repaymentButton = document.getElementById('repayment')
const interestOnlyButton = document.getElementById('interest-only')
const clearAllButton = document.getElementById('clearAll')

clearAllButton.addEventListener('click', clearFormFields)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let mortgageAmountVal = mortgageAmount.value
  let mortgageTermVal = mortgageTerm.value
  let interestRateVal = interestRate.value

  validateForm()

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

function clearFormFields() {
  // form input fields
  Array.from(form.getElementsByClassName('input-container')).forEach(
    (field) => (field.querySelector('input').value = '')
  )

  // form radio fields
  Array.from(form.getElementsByClassName('radio-container')).forEach(
    (radio) => (radio.querySelector('input').checked = false)
  )
}

function validateForm() {
  // form input fields
  validateInputFields()
  validateRadioFields()
}

function validateInputFields() {
  let inputFields = form.querySelectorAll('.field')
  inputFields.forEach((field) => {
    let input = field.querySelector('.input-container input')
    let errorMessageEl = field.querySelector('.error-message')
    errorMessageEl = createErrorMessageEl(errorMessageEl)

    if (input.value === '') {
      if (!field.querySelector('.error-message'))
        field.insertBefore(errorMessageEl, field.firstChild)
      field.classList.add('error')
    } else {
      field.classList.remove('error')
      if (field.contains(errorMessageEl)) field.removeChild(errorMessageEl)
    }
  })
}

function validateRadioFields() {
  // form radio fields
  let radioField = form.querySelector('#mortgageRadio')
  let radios = radioField.querySelectorAll('.radio-container input')

  let errorMessageEl = radioField.querySelector('.error-message')
  errorMessageEl = createErrorMessageEl(errorMessageEl)

  let isAnyRadioChecked = Array.from(radios).some((radio) => radio.checked)
  if (!isAnyRadioChecked) {
    if (!radioField.querySelector('.error-message'))
      radioField.append(errorMessageEl)
    radioField.classList.add('radio-error')
  } else {
    radioField.classList.remove('radio-error')
    if (radioField.contains(errorMessageEl))
      radioField.removeChild(errorMessageEl)
  }
}

function createErrorMessageEl(el) {
  if (!el) {
    el = document.createElement('div')
    el.classList.add('error-message')
    el.textContent = 'This field is required'
  }

  return el
}
// TODO:
// DISPLAY RESULTS
// DESIGN RESPONSIVENESS
