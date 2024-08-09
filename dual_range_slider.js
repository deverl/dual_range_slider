// Adapted from https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816

$.widget('sigmasense.dualrangeslider', {
    options: {
        name: 'slider',
        fromValue: 0,
        toValue: 100,
        initial: 50,
    },
    _create: function (name, fromValue, toValue) {
        const controlFromInput = (fromSlider, fromInput, toInput, controlSlider) => {
            const [from, to] = getParsed(fromInput, toInput);
            fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
            if (from > to) {
                fromSlider.value = to;
                fromInput.value = to;
            } else {
                fromSlider.value = from;
            }
        };

        const controlToInput = (toSlider, fromInput, toInput, controlSlider) => {
            const [from, to] = getParsed(fromInput, toInput);
            fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
            setToggleAccessible(toInput);
            if (from <= to) {
                toSlider.value = to;
                toInput.value = to;
            } else {
                toInput.value = from;
            }
        };

        const controlFromSlider = (fromSlider, toSlider, fromInput) => {
            const [from, to] = getParsed(fromSlider, toSlider);
            fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
            if (from > to) {
                fromSlider.value = to;
                fromInput.value = to;
            } else {
                fromInput.value = from;
            }
        };

        const controlToSlider = (fromSlider, toSlider, toInput) => {
            const [from, to] = getParsed(fromSlider, toSlider);
            fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
            setToggleAccessible(toSlider);
            if (from <= to) {
                toSlider.value = to;
                toInput.value = to;
            } else {
                toInput.value = from;
                toSlider.value = from;
            }
        };

        const getParsed = (currentFrom, currentTo) => {
            const from = parseInt(currentFrom.value, 10);
            const to = parseInt(currentTo.value, 10);
            return [from, to];
        };

        const fillSlider = (from, to, sliderColor, rangeColor, controlSlider) => {
            const rangeDistance = to.max - to.min;
            const fromPosition = from.value - to.min;
            const toPosition = to.value - to.min;
            controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} 100%)`;
        };

        const setToggleAccessible = (currentTarget) => {
            // const toSlider = document.querySelector(`#${this.options.name}_toSlider`);
            if (Number(currentTarget.value) <= 0) {
                toSlider.style.zIndex = 2;
            } else {
                toSlider.style.zIndex = 0;
            }
        };

        console.log(`dualrangeslider _create. options = ${JSON.stringify(this.options)}`);

        this.constructMarkup();

        const fromSlider = document.querySelector(`#${this.options.name}_fromSlider`);
        const toSlider = document.querySelector(`#${this.options.name}_toSlider`);
        const fromInput = document.querySelector(`#${this.options.name}_fromInput`);
        const toInput = document.querySelector(`#${this.options.name}_toInput`);

        fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        setToggleAccessible(toSlider);

        fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
        toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
        fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
        toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
    },

    constructMarkup: function () {
        const $top = $('<div class="range_container"></div>');

        // const midPoint = (this.options.toValue - this.options.fromValue) / 2 + this.options.fromValue / 2;
        const midPoint = this.options.toValue - this.options.fromValue;

        console.log(`midPoint = ${midPoint}`);

        const $slidersControl = $(`<div class="sliders_control"></div>`);
        const $lowSlider = $(
            `<input class="fromSlider" id="${this.options.name}_fromSlider" type="range" value="${this.options.fromValue}" min="${this.options.fromValue}" max="${midPoint}" />`
        );
        $lowSlider.appendTo($slidersControl);

        const $upperSlider = $(
            `<input class="fromSlider" id="${this.options.name}_toSlider" type="range" value="${this.options.toValue}" min="${this.options.fromValue}" max="${midPoint}" />`
        );
        $upperSlider.appendTo($slidersControl);

        $slidersControl.appendTo($top);

        const $formControl = $(`<div class="form_control">`);

        const $formControlContainer = $(`<div class="form_control_container">`);

        const $formControlContainerLowerTime = $(`<div class="form_control_container__time">From</div>`);

        const $lowerInput = $(`<input
                 class="form_control_container__time__input"
                 type="number"
                 id="${this.options.name}_fromInput"
                 value="0"
                 min="${this.options.fromValue}"
                 max="${midPoint}"
             />`);

        $lowerInput.appendTo($formControlContainerLowerTime);

        $formControlContainerLowerTime.appendTo($formControlContainer);

        const $formControlContainerUpperTime = $(`<div class="form_control_container__time">To</div>`);

        const $upperInput = $(`<input
                 class="form_control_container__time__input"
                 type="number"
                 id="${this.options.name}_toInput"
                 value="${this.options.toValue}"
                 min="${midPoint}"
                 max="${this.options.toValue}"
             />`);

        $upperInput.appendTo($formControlContainerUpperTime);

        $formControlContainerUpperTime.appendTo($formControlContainer);

        $formControlContainer.appendTo($formControl);

        $formControlContainer.appendTo($top);

        $top.appendTo(this.element);
    },
});
