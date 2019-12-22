const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../server');


describe('lookup', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('return lat and long', async () => {
        const {result} = await server.inject({
            method: 'get',
            url: '/lookup/123,456'
        });
        expect(result.latitude).to.equal(123);
        expect(result.longitude).to.equal(456);
        expect(result.time).to.not.be.null();
        expect(result.requestedTime).to.not.be.null();
    });
});
