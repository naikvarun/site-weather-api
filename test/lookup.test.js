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
        expect(result.data.length).to.equal(7);
    });

    it('return lat and long weather information for 3 days from today', async () => {
        const {result} = await server.inject({
            method: 'get',
            url: '/lookup/41.911515,-87.659827?days=3'
        });
        expect(result).to.not.null();
        expect(result.data.length).to.equal(3);
    });
    it('should return 400 for invalid date', async () => {
        const {result} = await server.inject({
            method: 'get',
            url: '/lookup/90,90/12345'
        });

        expect(result.statusCode).to.equal(400);
    });
    it('should return 400 for invalid days', async () => {
        const {result} = await server.inject({
            method: 'get',
            url: '/lookup/90,90?days=x'
        });
        expect(result.statusCode).to.equal(400);
    });

    it('should return 400 for max days exceeded', async () => {
        const {result} = await server.inject({
            method: 'get',
            url: '/lookup/90,90?days=16'
        });
        expect(result.statusCode).to.equal(400);
    });
});
