# Dual Range Slider

This project embodies a jQuery widget that creates a dual range slider control.

Note: This work is based on (and plagiarized from) work demonstrated [here](https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816).

You can see that page for more information on how the dual range slider operates.

## Usage

To use the widget, you will need to add jquery and jquery-ui  to your page.

```
<link rel="stylesheet" href="dual_range_slider.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.3/themes/smoothness/jquery-ui.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.3/jquery-ui.min.js"></script>
```

Add an element to your HTML (the id doesn't matter):

```
<div id="myslider"></div>
```

Then attach the `dualrangeslider` to it using something like this:

```
<script>
    $('#myslider').appendTo('body').dualrangeslider({ name: 'heatmapslider', fromValue: 100, toValue: 250 });
</script>
```

