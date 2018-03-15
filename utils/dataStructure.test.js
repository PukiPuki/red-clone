var customStructure = require('./dataStructure');
var customStore = new customStructure();

describe('Custom Thread Structure', () => {
  let id;

  it('Data structure should initialise properly', () => {
    expect(customStore.last).toBe(0);
    expect(customStore.rank.length).toBe(0);
    expect(customStore.top20.length).toBe(0);
  })

  it('Should should fail at > 255 characters', () => {
    const thread = customStore.insert({ topic: 'a'.repeat(999) });
    expect(thread).toBe(false);
  })

  it('Insert thread, check for topic, date, votes, position', () => {
    const thread = customStore.insert({topic: '1'})[0];
    expect(thread.topic).toBe('1');
    expect(thread.date/100).toBeCloseTo(Date.now()/100, 0);
    expect(thread.votes).toBe(0);
    expect(thread.position).toBe(0);
    id = thread.topic + thread.date;
  })

  it('vote up', () => {
    const thread = customStore.update({ id, vote: true })[0];
    expect(thread.topic).toBe('1');
    expect(thread.votes).toBe(1);
    expect(thread.position).toBe(0);
  })

  it('vote down', () => {
    const thread = customStore.update({ id, vote: false })[0];
    expect(thread.topic).toBe('1');
    expect(thread.votes).toBe(0);
    expect(thread.position).toBe(0);
  })

  it('insert 3 threads', () => {
    customStore.insert({topic: '2'});
    customStore.insert({topic: '3'});
    const thread = customStore.insert({topic: '4'})[3];
    expect(thread.topic).toBe('4');
    expect(thread.votes).toBe(0);
    expect(thread.position).toBe(3);
  });

});
