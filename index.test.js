const grpc = require('@grpc/grpc-js');
const bzl = require('./index');
// console.log('bzl', bzl);

const v1beta1 = bzl.v1beta1;
// console.log('v1beta1', v1beta1);


function newApplicationClient(address) {
    return new v1beta1.ApplicationClient(address, grpc.credentials.createInsecure());
}

test('require() dependencies are satisfied', () => {
    const client = newApplicationClient('localhost:1080');
    expect(client).toBeDefined();
});

// this test is skipped as it currently requires a bzl instance to be running
test.skip('connects', done => {
    const client = newApplicationClient('localhost:1080');
    client.waitForReady(withTimeoutSeconds(3), (err) => {
        if (err) {
            throw err;
        }
        console.log(`OK, seems ready`);
        try {
    
            const request = new v1beta1.GetApplicationMetadataRequest();
            client.getApplicationMetadata(request, (err, metadata) => {
                expect(err).toBeNull();
                expect(metadata).toBeDefined();
                expect(metadata.getName()).toBe('bzl');
                expect(metadata.getVersion()).toBe('snapshot');
                done();
            });
        } catch (err) {
            done(err);
        } finally {
            // client.close();
        }
    });

});

function withTimeoutSeconds(seconds) {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + seconds);
    return deadline;
}