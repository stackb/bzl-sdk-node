# bzl-sdk-node

[![NPM version](https://img.shields.io/npm/v/@stackb/bzl-sdk-node.svg)](https://www.npmjs.com/package/@stackb/bzl-sdk-node)

This repository contains the generated protobuf/grpc-js definitions for the
[Bzl](https://build.bzl.io) gRPC API as well as a more developer-friendly
index.js entrypoint.

Canonical API definitions are at https://github.com/stackb/apis/tree/master/build/stack/bzl/v1beta

## Usage

```
npm install @stackb/bzl-sdk-node
```

Given a running process (e.g. `bzl serve`), connect to the server and retrieve metadata:

```js
const grpc = require('@grpc/grpc-js');
const v1beta1 = require('@stackb/bzl-sdk-node').v1beta;

const client = new v1beta1.ApplicationClient(
        'localhost:1080', 
        grpc.credentials.createInsecure());

client.waitForReady(4000, () => printMetadata);

function printMetadata() {
    const request = new v1beta1.GetApplicationMetadataRequest();
    client.getApplicationMetadata(request, (err, metadata) => {
        if (err) {
            console.warn('could not get metadata', err);
        } else {
            console.log(`Connected to Bzl ${metadata.getVersion()}`);
        }
    });
}
```
