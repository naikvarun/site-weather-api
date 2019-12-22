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

    it('return lat and long weather information', async () => {
        const {result} = await server.inject({
            method: 'get',
            url: '/lookup/41.911515,-87.659827'
        });
        expect(result).to.not.null();
    });
});
