const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

// describe('admin order routes', () => {
//     beforeEach(() => {
//       return db.sync({force: true});
//     });

//     describe('/admin/orders/', () => {
//       const adminOk = true;

//       beforeEach(() => {
//         return Order.create({
//         });
//       });

//       it('GET /admin/orders', async () => {
//         const res = await request(app)
//           .get('/admin/orders')
//           .expect(200);

//         expect(res.body).to.be.an('array');
//         expect(res.body[0].time).to.be.equal('2017-03-16T00:00:00.000Z');
//       });
//     });
//   });
