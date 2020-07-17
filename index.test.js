const v1beta1 = require('./index').v1beta;

test('require() dependencies are satisfied', () => {
    const client = v1beta1.newApplicationClient('localhost:1080');
    expect(client).toBeDefined();
});

// this test is skipped as it currently requires a bzl instance to be running
test.skip('connects', done => {
    try {
        const client = v1beta1.newApplicationClient('localhost:1080');
        client.waitForReady(4000, () => {
            client.getApplicationMetadata(
                new v1beta1.pb.GetApplicationMetadataRequest(),
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

