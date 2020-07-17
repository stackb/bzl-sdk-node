const grpc = require('grpc');
const pb = require('./build/stack/bzl/v1beta1/application_pb');
const grpc_pb = require('./build/stack/bzl/v1beta1/application_grpc_pb');

module.exports.v1beta = {
    pb: pb,
    grpc_pb: grpc_pb,
    newApplicationClient: function(addr, creds) {
        if (!creds) {
            creds = grpc.credentials.createInsecure();
        }
        return new grpc_pb.ApplicationClient(addr, creds);
    }
};