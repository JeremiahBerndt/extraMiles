# Overview

This is a small vehicle selection app for an AutoZone application

## Use

A user is first required to select a year, then make, then model, and finally an engine type. The "engine" select element does not have API data so there are just filler values for now. The data is ultimately contained in a "VehicleState" object possibly for future use as reference for all other auto-part matching.

## Accessibility

Given that my current team doesn't put much effort into accessibility I decided to do a little extra research, and with the help of the Chrome extension "Ax DevTools": https://www.deque.com/axe/ I was able to figure out which items could be more accessible and made a few adjustments to up my accessibility score.

## Other Take Aways

One major fork in the road was deliberating whether to make each selector its own component, to handle its own state, and separate concerns. The problem with that approach was that I wanted each stage of selection to be based on data from previous selections, so some amount of "shared state" seemed necessary. I also figured each selector had enough shared functionality that it should be reusable. One of the trade-offs is that the main container component uses mulitple useEffects to monitor state, and pass it to it's children. Which doesn't end up looking as "clean" as I would like.
