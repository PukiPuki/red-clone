
class DataStructure {
  constructor() {
    this.last = 0;

    // this will be used to map id to thread object
    // useful for upvotes and down votes
    this.map = new Map();

    // this will be used to achieve O(1) updates
    // this is done by jumping the array
    this.firstLastIndex = new Map();
    // set the first one, its always zero
    this.firstLastIndex.set(0, {first: 0, last: 0});

    // assuming that rank will be frequently retrieved
    // by many reddit users, by putting it into a separate array
    // O(1) retrieval can be achieved.
    this.rank = [];
    this.top20 = [];
  }

  insertFirstLast() {
  }

  insert({topic}) {
    if (topic.length>255) {
      return false;
    } else {
      const position = this.last;
      var thread = {topic, date:Date.now(), votes:0, position:this.last};
      this.last += 1;
      
      this.map.set(thread.topic+thread.date, thread);
      
      // We append more items to the back
      var firstLast = this.firstLastIndex.get(0);
      if(firstLast == undefined) {
        firstLast = this.firstLastIndex.set(0, {first: position, last: position});
      }
      firstLast.last += 1;

      // Append to the end
      this.rank.push(thread);
      console.log(this.rank.slice(0,20));
      this.top20 = this.rank.slice(0,20);

      return this.top20;
    }
  }

  update({id, vote}) {
    // retrieve thread object
    var thread = this.map.get(id);
    var {votes, position} = thread;
    if (vote) {
       // increase
      console.log("beofre");
      this.incOp(thread);
      console.log("after");

      return this.top20;
    } else {
      return this.top20;
    }
  }

  con() {
    console.log("con");
  }

  incOp(thread) {
    // special case if position = 0;
    var oldPos = thread.position;
    var oldVotes = thread.votes;

    console.log("qwer");
    const nextPos = this.voteUpFirstLastIndex(thread);
    console.log("oass");
    this.updateRank(oldPos, nextPos);
    this.updateTop20();
  }

  voteUpFirstLastIndex(thread) {
    var id = thread.topic + thread.date;
    var oldPos = thread.position;
    var oldVotes = thread.votes;

    var oldFirstLast = this.firstLastIndex.get(oldVotes);
    var nextFirstLast = this.firstLastIndex.get(oldVotes+1);

    const nextPos = oldFirstLast.first;

    console.log("here");
    if(nextFirstLast==undefined) {
      // special case, no one in this slot of votes yet
      const nextFirst = oldFirstLast.first;
      const nextLast = nextFirst + 1;

      this.firstLastIndex
        .set(oldVotes+1,
             {
               first: nextFirst,
               last: nextLast
             })
    } else {
      // if it already exists
      nextFirstLast.last += 1;
    }
    // remove from previous vote index
    // add 1 because one of the items moved up to higher vote
    oldFirstLast.first += 1;
    if(oldFirstLast.first == oldFirstLast.last) {
      // if there is nothing in this place remove it from map
      this.firstLastIndex.delete(oldVotes);
    }

    return nextPos;
  }

  updateRank(oldPos, nextPos) {
    console.log("did you");
    var old = this.rank[oldPos];
    var next = this.rank[nextPos];

    // update internal position
    old.position = nextPos;
    next.position = oldPos;

    // update external rank position
    this.rank[oldPos] = next;
    this.rank[nextPos] = old;

    // update internal vote
    old.votes += 1;

    // for debugging
    // console.log(this.rank);
    // console.log(this.firstLastIndex);
  }

  updateTop20() {
      this.top20 = this.rank.slice(0,20);
  }

}

module.exports = DataStructure;
