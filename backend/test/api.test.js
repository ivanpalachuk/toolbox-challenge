/* eslint-env mocha */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

const expect = chai.expect
chai.use(chaiHttp)

describe('API Tests', () => {
  describe('GET /files/data', () => {
    it('should return an array of files with formatted data', (done) => {
      chai.request(app)
        .get('/files/data')
        .end((_err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')

          if (res.body.length > 0) {
            const file = res.body[0]
            expect(file).to.have.property('file')
            expect(file).to.have.property('lines')
            expect(file.lines).to.be.an('array')

            if (file.lines.length > 0) {
              const line = file.lines[0]
              expect(line).to.have.property('text')
              expect(line).to.have.property('number')
              expect(line).to.have.property('hex')
              expect(line.number).to.be.a('number')
              expect(line.hex).to.be.a('string')
              expect(line.hex).to.have.lengthOf(32)
            }
          }

          done()
        })
    }).timeout(10000)

    it('should filter by fileName when query param is provided', (done) => {
      chai.request(app)
        .get('/files/data?fileName=test2.csv')
        .end((_err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')

          res.body.forEach(file => {
            expect(file.file).to.equal('test2.csv')
          })

          done()
        })
    }).timeout(10000)
  })

  describe('GET /files/list', () => {
    it('should return a list of available files', (done) => {
      chai.request(app)
        .get('/files/list')
        .end((_err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('files')
          expect(res.body.files).to.be.an('array')
          done()
        })
    }).timeout(10000)
  })
})
