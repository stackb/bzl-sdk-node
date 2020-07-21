const grpc = require('@grpc/grpc-js');
const pb = require('./build/stack/bzl/v1beta1/application_pb');
const grpc_pb = require('./build/stack/bzl/v1beta1/application_grpc_pb');

module.exports = {
    v1beta1: Object.assign(pb, grpc_pb),
};