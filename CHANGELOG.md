# 1.1.2
#### Fixes & Optimizations
- Fixed an issue where the module was not being built before being publish


# 1.1.0
#### Fixes & Optimizations
- When not animating, ReactShow is now sized to `auto` to more easily support nested ReactShow's and also behave more predictably. While this removes the built-in functionality of animating size changes as non ReactShow children enter and exit, this seems to be the majority use case. Enjoy!
