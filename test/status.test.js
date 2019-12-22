const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../server');


describe('status', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('returns ok message', async () => {
        const {result} = await server.inject({
            method: 'get',
            url: '/status'
        });
        expect(result.message).to.be.equal('ok');
    });
});
