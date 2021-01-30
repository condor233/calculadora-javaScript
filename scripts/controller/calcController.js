class CalcController {
    constructor() {
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

    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll(){
        this._operation = []
    }

    cancelEntry() {
        this._operation.pop()
    }

    addOperation(value){
        this._operation.push(value);
        console.log(this._operation);
    }

    setError() {
        this.displayCalc = 'Error';
    }

    execBtn(value) {
        if(value === 'ac') this.clearAll();
        if(value === 'ce') this.cancelEntry()
        if(value === 'soma') this.cancelEntry()
        if(value === 'subtracao') this.cancelEntry()
        if(value === 'divisao') this.cancelEntry()
        if(value === 'multiplicacao') this.cancelEntry()
        if(value === 'porcento') this.cancelEntry()
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
        
        this.setError();

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