<div style="text-align:center;">
  <a href="https://github.com/react-tools/react-show" target="\_parent"><img src="https://github.com/react-tools/media/raw/master/logo-react-show.png" alt="React Show Logo" style="width:450px;"/></a>
</div>

<a href="https://travis-ci.org/react-tools/react-show" target="\_parent">
<img alt="" src="https://travis-ci.org/react-tools/react-show.svg?branch=master" />
</a>
<a href="https://npmjs.com/package/react-show" target="\_parent">
<img alt="" src="https://img.shields.io/npm/dm/react-show.svg" />
</a>
<a href="https://react-chat-signup.herokuapp.com/" target="\_parent">
<img alt="" src="https://img.shields.io/badge/slack-react--chat-blue.svg" />
</a>
<a href="https://github.com/react-tools/react-show" target="\_parent">
<img alt="" src="https://img.shields.io/github/stars/react-tools/react-show.svg?style=social&label=Star" />
</a>
<a href="https://twitter.com/react-toolsio" target="\_parent">
<img alt="" src="https://img.shields.io/twitter/follow/react-toolsio.svg?style=social&label=Follow" />
</a>
<a href="https://www.producthunt.com/posts/react-show" target="\_parent">
<img alt="" src="https://img.shields.io/badge/product-hunt-orange.svg" />
</a>

<br />
<br />

# React Show
A dependency-free vertical show/hide component for React.

## Why?
You need to show & hide react components. Everyone does! Of course you want it to be simple and lightweight. But most of all you don't want to bloat up your app with things like custom physics-based animation frameworks or even jQuery (heaven forbid). `react-show` is the answer. Read on!

## Features
- 2kb gzipped. Wow!
- Powered by CSS animations. Put that on the GPU baby!
- Extremely easy to control. It's all in the props!

## Demos
- [Codesandbox.io](https://codesandbox.io/s/2v66j7pm8y)

## Chat with us on Slack!
Need Help? [Click here to sign up for the React-Tools slack Organization](https://react-chat-signup.herokuapp.com), and join us in the **#react-show** channel! We are constantly discussing implementation details and answering questions. :)

## Installation
```bash
$ yarn add react-show
# or
$ npm install --save react-show
```

## Usage
```javascript
import ReactShow from 'react-show'

const SimpleExample = () => (
  <ReactShow
    show={true || false} // Toggle true or false to show or hide the content!
  >
    Hello world!
  </ReactShow>
)

const AdvancedExample = () => (
  <ReactShow
    show={true || false} // Toggle true or false to show or hide the content!
    duration={500} // // The duration of the transition
    easing={ReactShow.easings.easeOutQuad}, // Comes with all the easings you could want!
    transitionProperty='height' // Add as many as you need! eg. 'height width' or 'all'!
    unmountOnHide={false} // Self explanatory. It unmounts the children when hidden
    minHeight={0} // If you need a min-height, go for it! Just don't set unmountOnHide to `true` ;)
    height={400} // If you need a hard-coded height instead of auto height, use this.
    transitionOnMount={false}
    style={{
      // Go ahead and throw in custom styles like you normally would.
      // Keep in mind though, `height` is controlled by `ReactShow` :)
      background: 'blue',
      color:white
    }}
    className='some-class-name or-not' // Works like any other standard component.
    // It even works with styled-components and glamorous!
  >
    Hello world!
  </ReactShow>
)
```

## API

#### `<ReactShow>`
The default export and main component for React-Show.

###### Props
|         Prop         	| Required 	|  Default Value 	| Description                                                                 	|
|:--------------------	|:--------	|:--------------	|:-----------------------------------------------------------------------------	|
| `show`               	|  `true`   | `false`        	| Determines whether to "show" the content or not.                            	|
| `duration`           	|          	| `500`          	| The `transition-duration` of the transition used to show the content        	|
| `easing`             	|          	| `easeOutQuint` 	| The `transition-timing-function` used to show the content                   	|
| `transitionProperty` 	|          	| `height`       	| The `transition-property` used to show the content                          	|
| `unmountOnHide`      	|          	| `false`        	| Determines whether the children will be unmounted when not visible.         	|
| `transitionOnMount`  	|          	| `false`        	| Determines whether to animate from a hidden to a shown state on mount       	|
| `minHeight`          	|          	|                	| The minimum hight of the content. Beware using with `unmountOnHide={true}`! 	|
| `height`             	|          	|                	| The optional fixed height of the children when open                         	|
| `style`              	|          	|                	| The standard react style object                                             	|
| `className`          	|          	|                	| The standard react class string                                             	|

#### `ReactShow.easings`
React-Show comes packaged with some awesome easings that are accessible via `ReactShow.easings`. They are extremely simple to use too:
```javascript
import ReactShow from 'react-show'

const SimpleExample = () => (
  <ReactShow
    show={true}
    easing={ReactShow.easings.easeOutQuart}
  >
    Hello world!
  </ReactShow>
)
```

Below is a full list of the available easings located at `ReactShow.easings`
```javascript
ReactShow.easings = {
  // Cubic
  easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
  easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',

  // Circ
  easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
  easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',

  // Expo
  easeInExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
  easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
  easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',

  // Quad
  easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
  easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',

  // Quart
  easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
  easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',

  // Quint
  easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
  easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',

  // Sine
  easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',

  // Back
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
}
```

## Contributing
We are always looking for people to help us grow `react-show`'s capabilities and examples. If you have an issue, feature request, or pull request, let us know!

## License
React Show uses the MIT license. For more information on this license, [click here](https://github.com/react-tools/react-show/blob/master/LICENSE).
