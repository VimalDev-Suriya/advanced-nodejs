# Cross Orgin Resource Sharing:

A CORS is the _security mechanism built in Web browsers_ as this enforces the `same-origin policy`. As the browser will block all the cross-domain server request. Example if we request a data from site-a.com to site-b.com, then site-a will experince teh CORS error. To fix this site-b.com should allow the request from site-a.com<br>

Mostly the CORS error fix will be handled in **server end**.

## How to fix CORS:

### Handling the Headers in Server end:

There are 3 main headers which determin the CORS

1. Access Control Allow Origin - ALlowing the specific Origins
2. Access Control Allow Methods - Allowing specific methods
3. Access Control Allow Headers - Allowing specific Headers

- **DO NOT USE "\*" WILD CARD PATHS**
- (Temporary Work Around for Local Clinet apps) From the Front End, we have bypass this, by having the proxy in it - server.proxy object in vite.config.js file

### Flow of the CORS

Browser will automatically send a preliminary test request called a **preflight request** before the actual request, but only under specific conditions. Only `methods` and `headers` validation will be done.

1. Simple Requests (No Preflight Sent)
   - Legacy way of submitting the form with HTML `action` attributes
   - Only for **GET**
   - **POST** (Only when content type is **application/x-www-form-urlencoded**) methods
2. Preflighted Requests (Preflight Required)
   - All modern application and approches will send the preflight request
   - LIKE PUT, PATCH, DELETE and POST
   - All content types like xml, JSON etc

```
[ Browser ]                                       [ Server ]

     |                                                 |
     | ----- 1. OPTIONS (Preflight Request) ---------> |
     |        - Access-Control-Request-Method          |
     |        - Access-Control-Request-Headers         |
     |                                                 |
     | <---- 2. Response (CORS Permissions) ---------- |
     |        - Access-Control-Allow-Origin            |
     |        - Access-Control-Allow-Methods           |
     |        - Access-Control-Allow-Headers           |
     |                                                 |
     |               [ Browser Validates ]             |
     |                                                 |
     | ----- 3. Actual Request (e.g., POST JSON) ----> |
```

### Temporrary workwornds in Clinet apps (React)

- Using Create react app - Create the `setupProxy.js` file at src/

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Intercept any request starting with /api
    createProxyMiddleware({
      target: 'https://yourbackend.com', // Your target API
      changeOrigin: true, // Changes the origin header to match target URL
      pathRewrite: {
        '^/api': '', // Strips out /api from the final request path
      },
    }),
  );
};
```

- In Vite ,we acn simple add the properties in vite.config.js

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Intercept any request starting with /api
      '/api': {
        target: 'https://yourbackend.com', // Your external API domain
        changeOrigin: true, // Changes the origin header to match the target URL
        secure: false, // Set to false if using self-signed SSL certificates
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes the /api prefix before forwarding
      },
    },
  },
});
```
