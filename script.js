class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch(this.operation) {
      case '+': 
        computation = prev + current 
        break
      case '-': 
        computation = prev - current 
        break
      case '*': 
        computation = prev * current 
        break
      case '÷': 
        computation = prev / current 
        break

      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

document.addEventListener('keydown', handleKeyPress)
function handleKeyPress(e) {
  if (e.key === 'Enter' || e.key === '=') {
    console.log('beep', e.key)
    calculator.compute()
    calculator.updateDisplay()
    return
  }
  if (e.key === 'Delete' || e.key === 'Backspace') {
    calculator.delete()
    calculator.updateDisplay()
    return
  }
  if (e.key.match(/[0-9]/ ) || e.key === '.') {
    calculator.appendNumber(e.key)
    calculator.updateDisplay()
    return
  }
  if (e.key.match(/[*+-/]/)) {
    calculator.chooseOperation(e.key)
    calculator.updateDisplay()
    return
  }
}

function updateBackground() {
  const initColor = 'var(--init-background)';
  const secondColor = 'var(--second-background)';

  const toggleBtn = document.querySelector('input[class="toggle-btn"]')
  const currentBackgroundColor = toggleBtn.getAttribute('data');
  if (currentBackgroundColor == 'init-background') {
    document.body.style.background = secondColor;
    toggleBtn.setAttribute('data', 'second-background')
    return
  }
  if (currentBackgroundColor == 'second-background') {
    document.body.style.background = initColor;
    toggleBtn.setAttribute('data', 'init-background')
    return
  } 
}
