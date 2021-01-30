class CalcController {
    constructor() {

        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-br';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();

    }

    initialize() {

       this.setDisplayDateTime()

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000);

        this.setLastOperationToDisplay();

    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        
        this.setLastOperationToDisplay();;
    }

    cancelEntry() {
        this._operation.pop()
        this.setLastOperationToDisplay();
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1]
    }

    isOperator(value) {
       return (['+', '-', '*', '%', '/'].indexOf(value) > -1) 
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value
    }

    pushOperation(value) {
        this._operation.push(value)

        if(this._operation.length > 3) {
            this.calc()
        }
    }

    getResult() {
        return eval(this._operation.join(''));
    }

    calc() {
        let last = ''
        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber]
        }

        if (this._operation.length > 3) {
            last = this._operation.pop();
           this._lastNumber = this.getResult();
        } else if(this._operation.length === 3) {
            
           this._lastNumber = this.getLastItem(false);
        }


        let result = this.getResult();

        if (last == '%') {

            result /= 100;

            this._operation = [result];
        } else {

            this._operation = [result];

            if(last) this._operation.push(last);
        }

       

        this.setLastOperationToDisplay();
    }

    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--){

            
                if(this.isOperator(this._operation[i]) === isOperator) {
                    lastItem = this._operation[i];
                    break;
                

            }
            
        }
        if(!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber
        }
       

        return lastItem;
    }

    setLastOperationToDisplay() {
        let lastNumber =  this.getLastItem(false);

        if (!lastNumber) lastNumber = 0

        this.displayCalc = lastNumber;
    }

    addOperation(value){

        if(isNaN(this.getLastOperation())) {
            if(this.isOperator(value)) {
                this.setLastOperation(value)
            } else {
                this.pushOperation(value)
                this.setLastOperationToDisplay();
            }
        } else {

            if(this.isOperator(value)) {
                this.pushOperation(value)
            } else {
                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseFloat(newValue));

                this.setLastOperationToDisplay();
            }
            
        }

    }

    // setError() {
    //     this.displayCalc = 'Error';
    // }

    addDot(){

        let lastOperation = this.getLastOperation();

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.')
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastOperationToDisplay()

    }

    execBtn(value) {
        if(value === 'ac') this.clearAll();
        if(value === 'ce') this.cancelEntry()
        if(value === 'soma') this.addOperation('+');
        if(value === 'subtracao') this.addOperation('-');
        if(value === 'divisao') this.addOperation('/');
        if(value === 'multiplicacao') this.addOperation('*');
        if(value === 'porcento') this.addOperation('%');
        if(value === 'ponto') this.addDot();
        if(value === 'igual') this.calc();
        if(value === '0') this.addOperation(parseInt(value))
        if(value === '1') this.addOperation(parseInt(value))
        if(value === '2') this.addOperation(parseInt(value))
        if(value === '3') this.addOperation(parseInt(value))
        if(value === '4') this.addOperation(parseInt(value))
        if(value === '5') this.addOperation(parseInt(value))
        if(value === '6') this.addOperation(parseInt(value))
        if(value === '7') this.addOperation(parseInt(value))
        if(value === '8') this.addOperation(parseInt(value))
        if(value === '9') this.addOperation(parseInt(value))
        

    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let value = btn.className.baseVal.replace('btn-', '');
                this.execBtn(value)
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer'
            });
        });
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(value) {
        this._currentDate = value;
    }
}