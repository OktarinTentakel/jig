![jig](jig.png)



jig
===
by Sebastian Schlapkohl

![NPM - no peer dependencies](https://img.shields.io/badge/NPM-no%20peer%20dependencies-blue)
![Dart Sass - SCSS Mixins](https://img.shields.io/badge/Dart%20Sass-SCSS%20Mixins-blue)
![Node Sass - Legacy SCSS Mixins](https://img.shields.io/badge/Node%20Sass-Legacy%20SCSS%20Mixins-blue)
![Stylus - Mixins](https://img.shields.io/badge/Stylus-Mixins-blue)
![Examples - Interactive Demonstration](https://img.shields.io/badge/Examples-Interactive%20Demonstration-brightgreen)
![GitHub Pages - Online Examples](https://img.shields.io/badge/GitHub%20Pages-Online%20Examples-yellow)
![Docker - Docker Compose Dev Setup With Gulp](https://img.shields.io/badge/Docker-Docker%20Compose%20Dev%20Setup%20With%20Gulp-yellow)



A Word of Caution
-----------------
This package is **still in development** and is missing a lot of implementation, documentation and testing.
Use this with caution or keep your usage to using the source as a reference for your project.



What is This?
-------------
Browsers have long moved on from table and float layouts, moved past flex layouts and finally arrived at native grids.
Native grids finally offer most tools frontend had to hack together using things and principles, that were not built
with that usage in mind, making the definition of the viewport and single components in the ways design has thought
about this topic since the beginning of time, additionally offering flexibility and auto-layouting features on top.

But this development does not mean, that the classic grid is dead. No need to fix it, if it ain't broke.
The classic (12-)column grid, popularized by Bootstrap and Foundation, is still a very helpful and common way of
thinking about layouts and enabling communication between design and development with a common set of rules and syntax
like "columns", "gutters" and "breakpoints". These principles will not go away so soon, since they are just too
practical to ignore on a day-to-day basis. Surely you can define layouts purely component based, with container queries
and can build everything fluidly according to viewport dimensions, but these are concepts, that may be a little too
esoteric for the bread-and-butter, run-off-the-mill website you have to build with your colleagues in the next few
weeks.

jig tries to bring you the best of both worlds. Offering a layout and definition framework with mixins to build a
classic grid, while also using simple native CSS grids to build this grid, offering all the flexibility to change stuff
individually on top, for free.

Doing this, jig strongly aligns with known solutions like Foundation (especially the XY-Grid) in terms of mixin
structure and layout definition. So, the jump from Foundation's (or Bootstrap's) semantic mixins to jig should be a
short one. So, you'll find familiar-sounding mixins like `grid-container`, `grid-item` and `breakpoint`.

Additionally, jig offers helpers and best-practices to better work with responsive layouts, like responsive spacing
values for example.

So, the TL;DR is: jig is a lightweight, mixin-based grid framework for SCSS and Stylus, that uses native CSS grid. 



What's on Offer
---------------
- define basic layout and grid properties via a central configuration constant
- use semantic mixins to define grid containers and grid items and define dimensions and alignments for the latter
- use breakpoint-based mixins to flexibly work with responsive layouts and values
- use spacing-based mixins to work with responsive standard offsets



How Can I Run the Examples?
---------------------------
Either view the examples on [GitHub](https://oktarintentakel.github.io/jig/) or open
`/examples/index.html` locally after checking out the repo.



How Do I Install This?
----------------------
Besides just downloading the zip and dropping the package in your project (which I would not recommend doing), you may
easily use npm or yarn. Since I do not publish to npm yet, you can just reference the Github repo and maybe the version
tag (which I would recommend) and you are done. To get an idea about the latest version and/or changes, have a look at
the tags and releases in Github.

### NPM
```
npm install oktarintentakel/jig
```
or
```
npm install oktarintentakel/jig#vX.X.X
```

### Yarn
```
yarn add oktarintentakel/jig
```
or
```
yarn add oktarintentakel/jig#vX.X.X
```

### @client Package Separation
It may be a good idea, to generally split node and client packages up. Why? Client packages are delivered directly to
the client and are executed and interpreted on the user's machine. So, these packages have a different set of rules
applying to them. For example: it is not really clever to give client packages an approximate version, like a normal
node dependency using `^` oder `~`, because every minor change in a client package may affect all receiving clients
after a reevaluation of npm versions. This is a nightmare, because this means, that, at undetermined points in time, all
cross-browser testing you did may be invalid and since you are not seeing everything while developing all the time, your
app may fall apart on certain devices, without you knowing.

Another problem is sharing of packages between dev/build/hosting and frontend/client. Let's say both use lodash or q
promises: both have to agree on the exact same version, that should not be changed frequently because of the afore
mentioned problems. That is very unpractical for both usages and each should be able to use the version fitting its
purpose, since they are used for different things on very different machines, even if it is the same package under the
hood.

So I generally propse separating all npm packages, that are delivered to the client directly in any way into a specific
`@client` package in `node_modules` using fixed versioning for these (I originally got the idea when I transitioned)
from bower to npm, reading the bower team's [ideas](https://bower.io/blog/2017/how-to-migrate-away-from-bower/) about
this.

So, adding a `@client` dependency may look like this in `package.json`:

```
"dependencies": {
    "@client/jig" : "oktarintentakel/jig#vX.X.X",
    ...
}
```

You can also add the dependency on the command line like this, albeit the command gets a little lengthy then:

```
yarn add @client/jig@oktarintentakel/jig#vX.X.X
```

If the package is on npm you can, of course, pull the package from there as well:

```
"dependencies": {
    "@client/some-npm-package" : "npm:some-npm-package@1.0.0",
    ...
}
```


How Do I Include and Use This?
------------------------------
After installation, the first thing you should do, is to add the package to the includes of either Sass or Stylus, by
adding `/source/scss`, `/source/scss-legacy` or `/source/stylus`, to be able to import jig like this:

### SCSS

```scss
@import 'jig';
```

or (if you use legacy SCSS and are below libsass 3.6)

```scss
@import 'jig/_index';
```

or (if you want to have more control about what to include)

```scss
@import 'jig/globals';
@import 'jig/util';
// below optional
@import 'jig/breakpoints';
@import 'jig/grid';     // needs breakpoints
@import 'jig/spacings'; // needs breakpoints
```

### Stylus

```stylus
@require 'jig'
```

or (if you want to have more control about what to include)

```stylus
@require 'jig/globals'
@require 'jig/util'
// below optional
@require 'jig/breakpoints'
@require 'jig/grid'     // needs breakpoints
@require 'jig/spacings' // needs breakpoints
```

But this is just the absolute minimum. Of course you'll want to customize the grid and the layout, by providing
detailed information about the structure you are trying to build. Also, we are still missing stuff like CSS
normalization here, which we'd probably like to add.

To see a complete setup, please have a look at the `examples` folder and select the folder fitting for your
preprocessor there. Inside, you should find a `main` file, outlining a complete setup as well as a `defines` file
containing the example configuration for the provided examples, which you can find in the `examples` file in the same
folder.



Versioning
----------
I'm using semver, so majors are definitely breaking, minors may be breaking and bugfixes should never break anything.



Is This Any Good, Why Should I Use This?
----------------------------------------
Depends. Do you plan to build a classic grid on a modern browser? Are you used to semantic mixins to do something like
this and do you have notoriously bad memory concerning stuff like grid notation?

Are you additionally using a preprocessor like Sass or Stylus and are able to setup a build process using these?

Yes to all? Then this might by your package indeed.

Anyway, this is a rather compact and streamlined package without much fluff. So, in theory you could even just give it
a spin and, if it does not bring to the table what you need, you can even replace it fairly easy with Foundation again.
