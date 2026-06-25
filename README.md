# Advanced topics in Node JS

## Difference between on vs once

- on - executes everytime, when the corresponding event executes
- once - as name suggest, it will execute once once, then the cb will be deleted autmatically

## What is the difference between require('node:fs'); and require('fs'), and also for ES6 Module type

```js
const fs = require('fs');
const fs = require('node:fs');

import fs from 'fs';
import fs from 'node:fs';
```

All the above syntaxes are actually valid, but the key difference relies underthewood.

1. A simple `fs` import does not specify the actual module existence place, So JS complier will look into the modules that matches the `fs` and then import. So here there is the chance that there may be any module with the same name as fs, so the node will get confused.

### Why `node:` is better:

1. **Security Guard**: If a developer accidentally installs a malicious third-party package named fs, or names a local file fs.js, the standard `require('fs')` might load that untrusted code instead of the core module. The node: prefix acts as a firewall, ensuring only the core runtime binary is used.
2. **Bypassing Cache Tampering**: The require() function caches modules in a plain JavaScript object. If a dependency modifies `require.cache['fs']`, standard calls will load that modified version. The node: prefix explicitly forces a lookup against Node's built-in APIs, ignoring a compromised cache.
3. **Future-Proofing**: Modern tools, test runners, and builders like Vite or Bun lean heavily on explicit protocol tags to distinguish between native environments and user code.
