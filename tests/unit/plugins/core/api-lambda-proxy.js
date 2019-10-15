'use strict';

const assert = require('assert').strict;

const apiLambdaProxy = require('../../.././../lib/plugins/core/api-lambda-proxy');

describe('Core plugins', () => {

	describe('API Lambda Proxy', () => {

		it('Should return an object with the basic API Lambda Proxy configuration', () => {

			const apiLambdaProxyResult = apiLambdaProxy({
				functionName: 'MyFunction',
				handler: 'path/to/handler.export',
				path: '/pets',
				method: 'get'
			});

			assert.deepStrictEqual(apiLambdaProxyResult, {
				MyFunction: {
					handler: 'path/to/handler.export',
					events: [{
						http: {
							integration: 'lambda-proxy',
							path: '/pets',
							method: 'get',
							private: false
						}
					}]
				}
			});
		});

		it('Should return an object with API Lambda Proxy configuration with request parameters', () => {

			const apiLambdaProxyResult = apiLambdaProxy({
				functionName: 'MyFunction',
				description: 'My function description',
				handler: 'path/to/handler.export',
				path: '/pets/{petId}',
				method: 'get',
				queryParameters: {
					page: true,
					pageSize: false
				},
				requestHeaders: {
					'x-foo': true,
					'x-bar': true
				}
			});

			assert.deepStrictEqual(apiLambdaProxyResult, {
				MyFunction: {
					handler: 'path/to/handler.export',
					description: 'My function description',
					events: [{
						http: {
							integration: 'lambda-proxy',
							path: '/pets/{petId}',
							method: 'get',
							private: false,
							request: {
								parameters: {
									paths: {
										petId: true
									},
									querystrings: {
										page: true,
										pageSize: false
									},
									headers: {
										'x-foo': true,
										'x-bar': true
									}
								}
							}
						}
					}]
				}
			});
		});

		it('Should return an object with API Lambda Proxy configuration with CORS as true', () => {

			const apiLambdaProxyResult = apiLambdaProxy({
				functionName: 'MyFunction',
				handler: 'path/to/handler.export',
				path: '/pets',
				method: 'get',
				cors: true
			});

			assert.deepStrictEqual(apiLambdaProxyResult, {
				MyFunction: {
					handler: 'path/to/handler.export',
					events: [{
						http: {
							integration: 'lambda-proxy',
							path: '/pets',
							method: 'get',
							private: false,
							cors: true
						}
					}]
				}
			});
		});

		it('Should return an object with API Lambda Proxy configuration with CORS as an object', () => {

			const apiLambdaProxyResult = apiLambdaProxy({
				functionName: 'MyFunction',
				handler: 'path/to/handler.export',
				path: '/pets',
				method: 'get',
				cors: {
					origin: 'http://www.example.com',
					headers: [
						'x-foo',
						'x-bar'
					],
					allowCredentials: false
				}
			});

			assert.deepStrictEqual(apiLambdaProxyResult, {
				MyFunction: {
					handler: 'path/to/handler.export',
					events: [{
						http: {
							integration: 'lambda-proxy',
							path: '/pets',
							method: 'get',
							private: false,
							cors: {
								origin: 'http://www.example.com',
								headers: [
									'x-foo',
									'x-bar'
								],
								allowCredentials: false
							}
						}
					}]
				}
			});
		});
	});
});
