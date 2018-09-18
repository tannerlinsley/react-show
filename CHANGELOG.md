# 3.0.3

#### Breaking Changes

- `styleShow` and `styleHide` are now deprecated in favor of the new lifecycle props `start`, `enter`, `update`, and `leave`
- `unmountOnHide` has now been deprecated in favor of the `stayMounted` prop. Its functionality is the boolean inverse of `unmountOnHide`
- `preMount` is a new prop that allows the component to be mounted on first render regardless of `show === false`

# 2.0.0

#### Features

- You can now use the `styleShow` and `styleHide` props to define more than just height styles for the show/hide state of your content.
- When using the new `styleShow` and `styleHide` props, `width` and `height` can be animated to their dynamic sizes by simply using `auto` as you would normally in css.

#### Breaking Changes

- The `minHeight` prop was deprecated in favor of `styleShow` and `styleHide`.
- The `height` prop was deprecated in favor of `styleShow` and `styleHide`.

#### Fixes & Optimizations

- You can now pass any valid react node as children to `ReactShow`, including raw text.

# 1.1.2

#### Fixes & Optimizations

- Fixed an issue where the module was not being built before being publish

# 1.1.0

#### Fixes & Optimizations

- When not animating, ReactShow is now sized to `auto` to more easily support nested ReactShow's and also behave more predictably. While this removes the built-in functionality of animating size changes as non ReactShow children enter and exit, this seems to be the majority use case. Enjoy!
