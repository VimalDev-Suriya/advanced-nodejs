# Node Package Manager:

## Clean install:

- `npm ci` is the **clean install** command, which helps to install the exact version of the dependencies that are `present in the package-lock.json file`.
- It will compare the version present in package.json and package-lock.json file,
  - if both are matched then it will install the deps.
  - If there are mismatches, then it will throw the error.
- `packahe-lock.json` is must to run this command, if there is no package-lock then, it will throw error.
- If `node_modules` directory exist, then it will delete the folder and create a new one from scratch.
- Ideally used in CICD pipelines and Production builds
- It is `faster` than `npm i`, as it does not want to check lastest version

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

## The symbols ^ (caret) and ~ (tilde) are version modifiers used in your package.json:

The Version of the NPM packages are like `MAJOR.MINOR.PATCH`, so these semantic versioning helps to upgrade the minor and patch version of the packages.

- `^`, will update the `MINOR` and `PATCH` version of the packages if any.
- `~`, will only update the `PATCH` version.
