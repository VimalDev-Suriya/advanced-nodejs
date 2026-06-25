# Node Package Manager:

## Clean install:

- `npm ci` is the **clean install** command, which helps to install the exact version of the dependencies present in the package-lock.json
- Ideally used in CICD pipelines and Production builds

```
npm ci
```

## Dependencies vs Dev-Dependencies:

1. Dependencies are the packages used to implement the core logic of the application - Like express, React, axios etc
2. Dev-Dependencies are used for the developer support packages, like Typescript, types, EsLint, Jest, Module Bundlers etc.

Main use cases of these 2 set of dependencies are just to keep the production bundle as small as possible. So in production all the dev-dependencies packages will never be installed, which keeps our build bundle clean.

- The Modules bundlers will omit these dev-dependecies while creating the build.

## Global, **dirname, **filename:

1. Global is the `window` object equivalent of Node JS. Any methods or property that was attached to global can be reused accross the application
   - But adding methods/proprties to global object is often considered as not teh best practice, as there is teh chance that the global method can be poluted.
2. `__dirname` - is the global object property, provides the absolute path of the current executing folder
3. `__filename` - is the global object property, pprovide the absolute path of the current executing file

- The `__filename` and `__dirname` will be executed only in Common JS module. If we use them in ES6 modules or `.mjs` file extension, this will trhow the reference error.

### How to get the `__filename` and `__dirname` in ES6 Modules

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileUrlToPath(import.meta.url);
```
