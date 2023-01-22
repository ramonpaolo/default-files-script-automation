import request from 'supertest';

// Server
import app from '../../index'

describe('GET /', () => {
    it('response status has to be equal 200', async () => {
        const response = await request(app).get('/healthcheck')

        expect(response.status).toBe(200)
    })
})

afterAll(() => {
    app.close()
})
