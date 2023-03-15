![jig](jig.png)



jig
===
by Sebastian Schlapkohl

> A "foundationish" grid solution for SCSS and Stylus with native CSS grid and sane defaults and helpers for
> responsive websites.

![NPM - no peer dependencies](https://img.shields.io/badge/NPM-no%20peer%20dependencies-blue)
![Dart Sass - SCSS Mixins](https://img.shields.io/badge/Dart%20Sass-SCSS%20Mixins-blue)
![Node Sass - Legacy SCSS Mixins](https://img.shields.io/badge/Node%20Sass-Legacy%20SCSS%20Mixins-blue)
![Stylus - Mixins](https://img.shields.io/badge/Stylus-Mixins-blue)
![Examples - Interactive Demonstration](https://img.shields.io/badge/Examples-Interactive%20Demonstration-brightgreen)
![GitHub Pages - Online Examples](https://img.shields.io/badge/GitHub%20Pages-Online%20Examples-yellow)
![Docker - Docker Compose Dev Setup With Gulp](https://img.shields.io/badge/Docker-Docker%20Compose%20Dev%20Setup%20With%20Gulp-yellow)



A Word of Caution
-----------------
This package has reached beta status. Everything included is tested with browser examples. And the contents include
everything I aimed for in the first version. Although everything is finished from a technical perspective, this package
is not yet battle-proven.

The beta should be fine to use (cautiously), but I will delay the bump to version 1.0.0 stable until after I've used
this in a real-world project.



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
`/docs/examples/index.html` locally after checking out the repo.



How Do I Install This?
----------------------
Besides just downloading the zip file and dropping the package in your project (which I would not recommend doing), you
may easily use NPM or Yarn.

Currently, I'm publishing to Github packages and not the central NPM registry. If you want to directly install the
package, not using the repository URL, , you'll have to tell NPM/Yarn, that `@oktarintentakel` can be found at GitHub
packages and not at the central NPM registry and add an access token to use for installing. To do this, add or edit a
`.npmrc` file (either globally in your home folder or next to the `package.json` to your project) and add
`@oktarintentakel:registry=https://npm.pkg.github.com` to the file (following GitHub's
[documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package)
). After this, the defined namespace is installed from there automatically. Additionally, we also need a personal access
token by adding the line `//npm.pkg.github.com/:_authToken=TOKEN` (following GitHub's
[documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)
).

**Hint:** I am aware, that this is rather cumbersome currently, and therefore I currently suggest using the repository
URL, but I implemented the workflow anyway, awaiting an easier workflow in the future. 


### NPM

```bash
npm install @oktarintentakel/jig
```
or with a version
```bash
npm install @oktarintentakel/jig@X.X.X
```
or via GitHub repository
```bash
npm install oktarintentakel/jig
```
or via GitHub repository using a tag
```bash
npm install oktarintentakel/jig#vX.X.X
```


### Yarn

```bash
yarn add @oktarintentakel/jig
```
or with a version
```bash
yarn add @oktarintentakel/jig@X.X.X
```
or via GitHub repository
```bash
yarn add oktarintentakel/jig
```
or via GitHub repository using a tag
```bash
yarn add oktarintentakel/jig#vX.X.X
```


### Using an Alias Location

In many cases (especially when installing directly from Github repository) it makes sense to define an install alias,
to manually define a folder inside `node_modules` to install to.

Using NPM
```bash
npm install my-alias-location@:npm@oktarintentakel/jig@X.X.X
```
or using NPM with GitHub repository
```bash
npm install my-alias-location@oktarintentakel/jig#vX.X.X
```
or using Yarn
```bash
yarn add my-alias-location@:npm@oktarintentakel/jig@X.X.X
```
or using Yarn with GitHub repository
```bash
yarn add my-alias-location@oktarintentakel/jig#vX.X.X
```
or in `package.json`
```json
{
  "dependencies": {
      "my-alias-location" : "npm:@oktarintentakel/jig@X.X.X"
  }
}
```
or with Github repository
````json
{
  "dependencies": {
      "my-alias-location" : "oktarintentakel/jig#vX.X.X"
  }
}
````


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

So, I propose to generally use an alias location for client packages, such as this
(see previous point, for all/other options):

```json
{
  "dependencies": {
      "@client/jig" : "oktarintentakel/jig#vX.X.X"
  }
}
```


How Do I Include and Use This?
------------------------------
After installation, the first thing you should do, is to add the package to the includes of either Sass or Stylus, by
adding `/source/scss`, `/source/scss-legacy` or `/source/stylus`, to be able to import jig like this:

### SCSS (Dart Sass)

```scss
@use 'jig' with ($JIG_CONFIG : $JIG_CONFIG);
```

or (if you want to have more control about what to include)

```scss
@use 'jig/globals' with ($JIG_CONFIG : $JIG_CONFIG);
// optional from here on
@use 'jig/util';
@use 'jig/breakpoints';
@use 'jig/grid';
@use 'jig/spacing';
```

### Legacy SCSS (LibSass)

```scss
@import 'jig';
```

or (if are below libsass 3.6, which does not allow index imports)

```scss
@import 'jig/_index';
```

or (if you want to have more control about what to include)

```scss
@import 'jig/globals';
@import 'jig/util';
// optional from here on
@import 'jig/breakpoints';
// optional, but depending on breakpoints
@import 'jig/grid';
@import 'jig/spacing';
```

### Stylus

```stylus
@require 'jig'
```

or (if you want to have more control about what to include)

```stylus
@require 'jig/globals'
@require 'jig/util'
// optional from here on
@require 'jig/breakpoints'
// optional, but depending on breakpoints
@require 'jig/grid'
@require 'jig/spacing'
```

But this is just the absolute minimum. Of course you'll want to customize the grid and the layout, by providing
detailed information about the structure you are trying to build. Also, we are still missing stuff like CSS
normalization here, which we'd probably like to add.

To see a complete setup, please have a look at the `docs/examples` folder and select the folder fitting for your
preprocessor there. Inside, you should find a `main` file, outlining a complete setup as well as a `defines` file
containing the example configuration for the provided examples, which you can find in the `examples` file in the same
folder.

The `defines` should include the above-mentioned `$JIG_CONFIG`, which contains the complete setup for jig, overwriting
the default globals per base key. So, to configure jig, after installing it, you (most likely) will want to define
a map/hash/object providing details about your setup.

The default config looks like this (here as an SCSS map, translate to a hash for Stylus).

```scss
$JIG_CONFIG: (
  'breakpoints' : (
    'small' : 0,
    'medium' : 768px,
    'large' : 1280px
  ),
  'print-breakpoint' : 'large',
  'grid' : (
    'columns' : 12,
    'gutters' : (
      'horizontal' : (
        'small' : 20px,
        'medium' : 30px,
        'large' : 40px
      ),
      'vertical' : 20px
    )
  ),
  'spacing' : (
    'sm' : (
      'small' : 1rem,
      'medium' : 2rem,
      'large' : 3rem
    ),
    'md' : (
      'small' : 2rem,
      'medium' : 3rem,
      'large' : 5rem
    ),
    'l' : (
      'small' : 3rem,
      'medium' : 5rem,
      'large' : 8rem
    )
  ),
  'content' : (
    'padding' : (
      'small' : 20px,
      'medium' : 40px,
      'large' : 80px
    ),
    'max-width' : 1600px,
    'base-font-size' : 16px
  )
);
```

To provide a custom configuration, a constant such as this (with each top-level key bein optional), has to be provided
to `globals`, or, in case of Stylus and legacy SCSS, defined before including `globals`.

By the way: you may also use the constant name `$jig---config` or, for Stylus, leave out the leading `$` in both cases.



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
