const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('respond with 200 ok', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /api/threads', () => {
  it('respond with a blank list of threads', (done) => {
    request(app)
      .get('/api/threads')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /api/threads/create', () => {
  it('should create a thread with right values of votes and position', async () => {
    const res = await request(app)
          .post('/api/threads/create')
          .send({ topic: '1' })
          .set('Accept', /application\/json/);
    expect(res.body.length).toBe(1);
    const { topic, votes, position } = res.body[0];
    expect(topic).toBe('1');
    expect(votes).toBe(0);
    expect(position).toBe(0);
  });

  it('should create a second thread with right values of votes and position', async () => {
    const res = await request(app)
          .post('/api/threads/create')
          .send({ topic: '2' })
          .set('Accept', /application\/json/);
    expect(res.body.length).toBe(2);
    const { topic, votes, position } = res.body[1];
    expect(topic).toBe('2');
    expect(votes).toBe(0);
    expect(position).toBe(1);
  });
});

describe('POST /api/threads/create', () => {
  it('should fail when > 255 characters', async () => {
    const res = await request(app)
      .post('/api/threads/create')
      .send({ threads: 'a'.repeat(999) })
      .set('Accept', /application\/json/)
      .expect(500);
  });
});

describe('PUT /api/threads/${id}/vote', () => {
  let id1;
  let id2;
  it('retrieve the list of threads', async () => {
    const res = await request(app)
          .get('/api/threads')
          .set('Accept', /application\/json/);
    expect(res.body.length).toBe(2);
    const threads = res.body;
    id1 = threads[0].topic + threads[0].date;
    id2 = threads[1].topic + threads[1].date;
  });

  it('up vote test id1 vote should be 1 position should be 0', async () => {
    const res = await request(app)
          .put(`/api/threads/${id1}/vote`)
          .send({ vote: true })
          .set('Accept', /application\/json/);
    expect(res.body.length).toBe(2);
    const { topic, date, votes, position } = res.body[0];
    expect(topic).toBe('1');
    expect(votes).toBe(1);
    expect(position).toBe(0);
  });

  it('down vote id1 vote should be 0 position should be 0', async () => {
    const res = await request(app)
          .put(`/api/threads/${id1}/vote`)
          .send({ vote: false })
          .set('Accept', /application\/json/);
    expect(res.body.length).toBe(2);
    const { topic, date, votes, position } = res.body[0];
    expect(topic).toBe('1');
    expect(votes).toBe(0);
    expect(position).toBe(0);
  });

  it('down vote id1 should not allow -ve values', async () => {
    const res = await request(app)
          .put(`/api/threads/${id1}/vote`)
          .send({ vote: false })
          .set('Accept', /application\/json/);
    expect(res.body.length).toBe(2);
    const { topic, date, votes, position } = res.body[0];
    expect(topic).toBe('1');
    expect(votes).toBe(0);
    expect(position).toBe(0);
  });

  it('up vote id1 vote should be 1 position should be 1', async () => {
    const res = await request(app)
          .put(`/api/threads/${id1}/vote`)
          .send({ vote: true })
          .set('Accept', /application\/json/);
    expect(res.body.length).toBe(2);
    const { topic, date, votes, position } = res.body[0];
    expect(topic).toBe('1');
    expect(votes).toBe(1);
    expect(position).toBe(0);
  });
});
