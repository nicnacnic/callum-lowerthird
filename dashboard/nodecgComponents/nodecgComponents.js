const { get, set } = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

window.addEventListener('load', () => {
    //setTimeout(() => {
        const buttons = document.querySelectorAll('button');
        for (let button of buttons) {
            if (!button.hasAttribute('noRipple')) button.addEventListener('click', createRipple)
        }

        const inputs = document.querySelectorAll('input');
        for (let input of inputs) {
            switch (input.type) {
                case 'range': input.addEventListener('input', updateSlider); input.style.setProperty('--slider-value', `${(input.value - input.min) / (input.max - input.min) * 100}%`); break;
                default: input.addEventListener('blur', toggleInputLabel); defineInputValue(input); break;
            }
        }

        const selects = document.querySelectorAll('select');
        for (let select of selects) {
            select.addEventListener('change', toggleSelectLabel);
            if (select.value.length > 0) {
                select.nextElementSibling.classList.add('selectLabelFocus')
            }
        }
    //}, 1500);
    // your code here
});

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.style.pointerEvents = 'none';
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple)
        ripple.remove();
    button.appendChild(circle);
}

function toggleInputLabel() {
    if (this.value.toString().length > 0) { this.nextElementSibling.classList.add('inputLabelFocus') }
    else this.nextElementSibling.classList.remove('inputLabelFocus');
}

function toggleSelectLabel() {
    if (this.value.length > 0)
        this.nextElementSibling.classList.add('selectLabelFocus')
    else
        this.nextElementSibling.classList.remove('selectLabelFocus')
}

function defineInputValue(input) {
    Object.defineProperty(input, 'value', {
        get() { return get.call(this); },
        set(newVal) {
            if (newVal !== undefined && newVal !== null && newVal.toString().length > 0) input.nextElementSibling.classList.add('inputLabelFocus')
            else input.nextElementSibling.classList.remove('inputLabelFocus')
            return set.call(this, newVal);
        }
    });
    if (input.value.toString().length > 0) input.nextElementSibling.classList.add('inputLabelFocus')
}

function updateSlider() { this.style.setProperty('--slider-value', `${(this.value - this.min) / (this.max - this.min) * 100}%`) }