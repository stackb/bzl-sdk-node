const grpc = require('@grpc/grpc-js');
const bzl = require('./index');
// console.log('bzl', bzl);

const v1beta1 = bzl.v1beta1;
// console.log('v1beta1', v1beta1);


function newInsecureClient(address) {
    return new grpc.Client(address, grpc.credentials.createInsecure());
}

function newApplicationClient(address) {
    return new v1beta1.ApplicationClient(address, grpc.credentials.createInsecure());
}

test('require() dependencies are satisfied', () => {
    const client = newApplicationClient('localhost:1080');
    expect(client).toBeDefined();
});

// this test is skipped as it currently requires a bzl instance to be running
test.skip('connects', done => {
    try {
        const client = newApplicationClient('localhost:1080');
        client.waitForReady(4000, () => {
            client.getApplicationMetadata(
                new v1beta1.GetApplicationMetadataRequest(),
                (err, metadata) => {
                    expect(err).toBeNull();
                    expect(metadata).toBeDefined();
                    expect(metadata.getName()).toBe('bzl');
                    done();
                }
            )
        });
    } catch (err) {
        done(err);
    }
});

