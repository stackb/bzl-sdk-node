# bzl-sdk-node

This repository contains the generated protobuf definitions for the Bzl gRPC API
as well as a more developer-friendly index.js entrypoint.

API definitions: https://github.com/stackb/apis/tree/master/build/stack/bzl/v1beta

```js
const v1beta1 = require('@stackb/bzl-sdk-node').v1beta;

// Create a grpc client to the Application service
const appClient = v1beta1.newApplicationClient('localhost:1080');

// Wait for the connection to be ready and perform a call to the unary GetApplicationMetata rpc endpoint. 
appClient.waitForReady(4000, () => {
    appClient.getApplicationMetadata(
        new v1beta1.pb.ApplicationMetadataRequest(),
        (err, metadata) => {
            console.log(`Connected to Bzl ${metadata.getVersion()}`);
        }
    )
});
```
