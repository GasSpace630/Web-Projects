const CALC_BTN_CONTNR = document.getElementById('calc-buttons')

const BTN1 = document.getElementById('btn-1')
const BTN2 = document.getElementById('btn-2')
const BTN3 = document.getElementById('btn-3')
const BTN4 = document.getElementById('btn-4')
const BTN5 = document.getElementById('btn-5')
const BTN6 = document.getElementById('btn-6')
const BTN7 = document.getElementById('btn-7')
const BTN8 = document.getElementById('btn-8')
const BTN9 = document.getElementById('btn-9')
const BTN0 = document.getElementById('btn-0')

const BTN_ADD = document.getElementById('add')
const BTN_SUB = document.getElementById('sub')
const BTN_MUL = document.getElementById('mul')
const BTN_DIV = document.getElementById('div')

const BTN_EQL = document.getElementById('eql')
const BTN_CLR = document.getElementById('clr')

const RESULT_FIELD = document.getElementById('result-field')

// Number btns and operation buttons
CALC_BTN_CONTNR.addEventListener('click', function(event) {
    if (event.target.classList.contains('calc-input-btn')) {
        if (event.target.value == '=') {
            try {
                RESULT_FIELD.value = new Function(`return ${RESULT_FIELD.value}`)();
            }catch (error) {
                RESULT_FIELD.value = "ERROR: Invalid Syntax!";
            }
        }else if (event.target.value == 'C') {
            RESULT_FIELD.value = "";
        }else if(event.target.value == 'BS') {
            RESULT_FIELD.value = RESULT_FIELD.value.slice(0, -1);
        }else{
            RESULT_FIELD.value += event.target.value;
        }
    }
})

