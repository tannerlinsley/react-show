<div style="text-align:center;">
  <a href="https://github.com/react-tools/react-show" target="\_parent"><img src="https://github.com/react-tools/media/raw/master/logo-react-show.png" alt="React Show Logo" style="width:450px;"/></a>
</div>

<!-- <a href="https://travis-ci.org/react-tools/react-show" target="\_parent">
<img alt="" src="https://travis-ci.org/react-tools/react-show.svg?branch=master" />
</a> -->

<a href="https://spectrum.chat/react-show">
  <img alt="Join the community on Spectrum" src="https://withspectrum.github.io/badge/badge.svg" />
</a>
<a href="https://npmjs.com/package/react-show" target="\_parent">
<img alt="" src="https://img.shields.io/npm/dm/react-show.svg" />
</a>
<a href="https://github.com/react-tools/react-show" target="\_parent">
<img alt="" src="https://img.shields.io/github/stars/react-tools/react-show.svg?style=social&label=Star" />
</a>
<a href="https://twitter.com/tannerlinsley" target="\_parent">
<img alt="" src="https://img.shields.io/twitter/follow/tannerlinsley.svg?style=social&label=Follow" />
</a>
<!-- <a href="https://www.producthunt.com/posts/react-show" target="\_parent">
<img alt="" src="https://img.shields.io/badge/product-hunt-orange.svg" />
</a> -->

<br />
<br />

# React Show

A graphics accelerated dependency-free animation component for React.

## Why?

* You need to animate, reveal, or collapse any and all react components. Everyone does!
* You want it smoothly animated, even on mobile. Like butter on a glide-cam!
* You don't want to bloat your app with custom physics-based animation frameworks, request-animation-frame-happy animation loops or even jQuery (heaven forbid).

## Features

* 3.6kb gzipped. Wow!
* Animates `height: auto;` and `width: auto;` for you!
* Powered by native CSS animations & transitions. Put that on the GPU baby!
* Extremely easy to control. It's all in the props!
* React Fiber/Async Ready!

## Demos

* [Codesandbox.io](https://codesandbox.io/s/2v66j7pm8y)

## Chat with us on Spectrum!

Need Help? [Click here to sign up for the React-Tools Spectrum community](https://spectrum.chat/react-show). We are constantly discussing implementation details and answering questions. :)

## Installation

```bash
$ yarn add react-show
# or
$ npm install --save react-show
```

## Usage

#### Simple Usage

By default, `<ReactShow>` vertically expands its content:

```javascript
import ReactShow from "react-show";

const SimpleExample = () => (
  <ReactShow
    show={true || false} // Toggle true or false to show or hide the content!
  >
    Hello world!
  </ReactShow>
);
```

#### Changing Duration and Easing

* Duration and easing can be changed with the `duration` and `easing` props. ReactShow comes with a wide variety of easings built-in, too! Keep reading for a full list.

```javascript
import ReactShow from "react-show";

const DurationAndEasingExample = () => (
  <ReactShow
    show={true || false} // Toggle true or false to show or hide the content!
    duration={500} // // The duration of the transition in milliseconds
    easing={ReactShow.easings.easeOutQuad} // Comes with all the easings you could want!
  >
    Hello world!
  </ReactShow>
);
```

#### Custom Show/Hide Styles

Want to animate width, opacity, or transforms? You can use your own custom show/hide styles by setting the `styleShow` and `styleHide` props with regular react `style` objects:

```javascript
import ReactShow from "react-show";

const CustomExample = () => (
  <ReactShow
    show={true || false} // Toggle true or false to show or hide the content!
    styleHide={{
      // This style will be used when hidden
      height: "0px",
      width: "0",
      opacity: 0
    }}
    styleShow={{
      // This style will be used when shown
      height: "auto",
      width: "100%",
      opacity: 1
    }}
  >
    Hello world!
  </ReactShow>
);
```

## API

#### `<ReactShow>`

The default export and main component for React-Show.

###### Props

| Prop                 | Required | Default Value            | Description                                                           |
| :------------------- | :------- | :----------------------- | :-------------------------------------------------------------------- |
| `show`               | `true`   | `false`                  | Determines whether to "show" the content or not.                      |
| `duration`           |          | `300`                    | The `transition-duration` of the transition used to show the content  |
| `easing`             |          | `easeOutQuint`           | The `transition-timing-function` used to show the content             |
| `transitionProperty` |          | `all`                    | The `transition-property` used to show the content                    |
| `unmountOnHide`      |          | `true`                   | Determines whether the children will be unmounted when not visible.   |
| `transitionOnMount`  |          | `false`                  | Determines whether to animate from a hidden to a shown state on mount |
| `styleHide`          |          | `{ height: '0px' }`      | The standard react style object used to show the element              |
| `styleShow`          |          | `{ height: 'auto' }`     | The standard react style object used to hide the element              |
| `style`              |          | `{ overflow: 'hidden' }` | The standard react style object                                       |

#### `ReactShow.easings`

React-Show comes packaged with some awesome easings that are accessible via `ReactShow.easings`. They are extremely simple to use too:

```javascript
import ReactShow from "react-show";

const SimpleExample = () => (
  <ReactShow show={true} easing={ReactShow.easings.easeOutQuart}>
    Hello world!
  </ReactShow>
);
```

Below is a full list of the available easings located at `ReactShow.easings`

```javascript
ReactShow.easings = {
  // Cubic
  easeInCubic: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
  easeOutCubic: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
  easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",

  // Circ
  easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
  easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
  easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.150, 0.860)",

  // Expo
  easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
  easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
  easeInOutExpo: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",

  // Quad
  easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
  easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
  easeInOutQuad: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",

  // Quart
  easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
  easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
  easeInOutQuart: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",

  // Quint
  easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
  easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
  easeInOutQuint: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",

  // Sine
  easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
  easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
  easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",

  // Back
  easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
  easeOutBack: "cubic-bezier(0.175,  0.885, 0.320, 1.275)",
  easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
};
```

## Contributing

We are always looking for people to help us grow `react-show`'s capabilities and examples. If you have an issue, feature request, or pull request, let us know!

## License

React Show uses the MIT license. For more information on this license, [click here](https://github.com/react-tools/react-show/blob/master/LICENSE).
