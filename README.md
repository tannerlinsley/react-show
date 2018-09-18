<div style="text-align:center;">
  <a href="https://github.com/react-tools/react-show" target="\_parent"><img src="https://github.com/react-tools/media/raw/master/logo-react-show.png" alt="React Show Logo" style="width:450px;"/></a>
</div>

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

<br />
<br />

# React Show

A css-based (graphics accelerated) dependency-free animation component for React.

## Why?

- You need to animate, reveal, collapse your react components. Everyone does!
- You want it smoothly animated, even on mobile. Like butter on a glide-cam!
- You don't want to bloat your app with custom physics-based animation frameworks, request-animation-frame-happy animation loops or even jQuery...heaven forbid.

## Features

- 3.7 kb gzipped. Wow!
- Powered by native CSS animations & transitions. Put that on the GPU baby!
- Animates `height: auto;` and `width: auto;` for you!

## Demo

- [Codesandbox.io](https://codesandbox.io/s/2v66j7pm8y)

## Chat with us on Spectrum!

Need Help? [Click here to sign up for the React-Tools Spectrum community](https://spectrum.chat/react-show). We are constantly discussing implementation details and answering questions. :)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Simple Usage](#simple-usage)
  - [Advanced Usage](#advanced-usage)
- [Duration, Easing, Transition Properties](#duration-easing-transition-properties)
- [Lifecycle](#lifecycle)
- [Easing Options](#easing-options)
- [API](#api)

## Installation

```bash
$ yarn add react-show
# or
$ npm install --save react-show
```

## Usage

#### Simple Usage

You can create a simple expander component with the `Animate` component!

```javascript
import { Animate } from "react-show";

const SimpleExample = () => (
  <ReactShow
    show={true || false} // Toggle true or false to show or hide the content!
    duration={500}
    style={{
      height: "auto"
    }}
    start={{
      height: 0 // The starting style for the component.
      // If the 'leave' prop isn't defined, 'start' is reused!
    }}
  >
    Hello world!
  </ReactShow>
);
```

#### Advanced Usage

You can create a simple expander component with the `Animate` component!

```javascript
import { Animate } from "react-show";

const SimpleExample = () => (
  <ReactShow
    show={true || false} // Toggle true or false to show or hide the content!
    transitionOnMount // Will trigger the transition when the component is mounted and show === true
    preMount // Mounts the component's children on first render even if show === false
    stayMounted // Forces the component's children to remain mounted when show === false
    component="span" // Use a <span> (or custom) component as the wrapper instead of a <div>
    style={{
      // The permanent styles for the component
      height: `${Math.random() * 100}px`,
      background: "white"
    }}
    start={{
      // The starting styles for the hidden component.
      opacity: 0,
      height: 0
    }}
    enter={{
      // These styles will be applied when the component enters
      opacity: 1,
      height: 'auto'
      background: "green"
    }}
    leave={{
      // these styles will be applied when the component leaves
      opacity: 0,
      height: 0,
      background: "red"
    }}
  >
    Hello world!
  </ReactShow>
);
```

## Duration, Easing, Transition Properties

You can configure `duration`, `easing`, and `transition` by:

- Setting a component-wide default with the `duration`, `easing`, and `transitionProperty` props.
- Optionally using a lifecycle specific style property like `transitionDuration`, `transitionTimingFunction`, `transitionProperty` or even `transitionDelay`.

ReactShow comes with a wide variety of easings built-in! See [Easing Options](#easing-options) for a full list.

```javascript
import ReactShow from "react-show";

const DurationAndEasingExample = () => (
  <ReactShow
    show={true || false} // Toggle true or false to show or hide the content!
    duration={500} // // The duration of the transition in milliseconds
    easing={ReactShow.easings.easeOutQuad} // Comes with all the easings you could want!
    enter={{
      // Only use this duration/delay during the `enter` stage
      transitionDuration: ".3s",
      transitionDelay: "1s"
    }}
  >
    Hello world!
  </ReactShow>
);
```

## Lifecycle

React-Show uses the following lifecycle to determine which styles to show:

**When `show === true`**

- If component is not mounted
  - If `transitionOnMount === true`
    - The `start` styles are set as the initial style
  - If `transitionOnMount === false`
    - The `enter` styles are set as the initial style
  - The component is mounted
- If component is already mounted
  - The `enter` styles are set as the initial style
- If a `width` or `height` style is/was set to `auto`
  - The `display: block` and `overflow: hidden` styles are temporarily applied
  - The component scrollWidth/scrollHeight is measured
  - The `display: block` and `overflow: hidden` styles are removed
- The `enter` styles are applied and component waits until all transitions complete
- All lifecycle styles are removed and component waits until all transitions complete
- The `onFinish` prop function is fired

**When `show === false`**

- If a `width` or `height` style is/was set to `auto`
  - The `display: block` and `overflow: hidden` styles are temporarily applied
  - The component scrollWidth/scrollHeight is measured
  - The `display: block` and `overflow: hidden` styles are removed
- The `leave` or `start` styles are applied and component waits until all transitions complete
- If `stayMounted === false`
  - The component is unmounted

## Easing Options

React-Show comes packaged with some awesome easings that are accessible via `ReactShow.easings`. They are extremely simple to use too:

```javascript
import ReactShow from "react-show";

const SimpleExample = () => (
  <ReactShow show={true} easing={ReactShow.easings.easeOutQuart}>
    Hello world!
  </ReactShow>
);
```

Below is a full list of the available easings exported at `ReactShow.easings`

```javascript
import { easings } from "react-show";

easings ===
  {
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

## API

#### `<Animate>`

###### Props

| Prop                 | Required | Default Value  | Description                                                          |
| :------------------- | :------- | :------------- | :------------------------------------------------------------------- |
| `show`               | `true`   | `false`        | Determines whether to "show" the content or not.                     |
| `duration`           |          | `300`          | The `transition-duration` of the transition used to show the content |
| `easing`             |          | `easeOutQuint` | The `transition-timing-function` used to show the content            |
| `transitionProperty` |          | `all`          | The `transition-property` used to show the content                   |
| `preMount`           |          | `false`        | If `true`, element will mount on first render if `show === false`    |
| `stayMounted`        |          | `false`        | If `true`, element will stay mounted when `show === false`           |
| `transitionOnMount`  |          | `false`        | If `true`, element will animate from the `start` style on mount      |
| `style`              |          | `undefined`    | React style object (See [lifecycle](#lifecycle) for more details)    |
| `start`              |          | `undefined`    | React style object (See [lifecycle](#lifecycle) for more details)    |
| `enter`              |          | `undefined`    | React style object (See [lifecycle](#lifecycle) for more details)    |
| `leave`              |          | `undefined`    | React style object (See [lifecycle](#lifecycle) for more details)    |

## Contributing

We are always looking for people to help us grow `react-show`'s capabilities and examples. If you have an issue, feature request, or pull request, let us know!

## License

React Show uses the MIT license. For more information on this license, [click here](https://github.com/react-tools/react-show/blob/master/LICENSE).
