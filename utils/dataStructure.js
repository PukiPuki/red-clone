class DataStructure {
  constructor() {
    // counter for last element
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

  insert({topic}) {
    if (topic.length>255) {
      return false;
    } else {
      const position = this.last;
      const thread = {topic, date: Date.now(),
                      votes:0, position: this.last};
      // increment last element position
      this.last += 1;
      
      this.map.set(thread.topic+thread.date, thread);
      
      // We append more items to the back
      let firstLast = this.firstLastIndex.get(0);
      if(firstLast == undefined) {
        firstLast = this.firstLastIndex.set(0, {first: position, last: position});
      }
      firstLast.last += 1;

      // Append to the end
      this.rank.push(thread);

      if(position <20) {
        this.updateTop20();
      }

      return this.top20;
    }
  }

  update({id, vote}) {
    // retrieve thread object
    const thread = this.map.get(id);

    // prevent negative voting
    if (thread.votes == 0 && !vote) {
      return this.top20;
    }

    const oldPos = thread.position;
    const nextPos = vote ? this.voteUpFirstLastIndex(thread)
          : this.voteDownFirstLastIndex(thread);

    // swap positions
    this.updateRank(oldPos, nextPos, vote);

    // for debugging
    // console.log(this.rank);
    // console.log(this.firstLastIndex);
    return this.top20;
  }

  updateOp(thread, vote) {
    // special case if position = 0;
    const nextPos = this.voteUpFirstLastIndex(thread);
  }

  voteUpFirstLastIndex(thread) {
    const id = thread.topic + thread.date;
    const oldPos = thread.position;
    const oldVotes = thread.votes;
    const nextVotes = oldVotes+1;

    var oldFirstLast = this.firstLastIndex.get(oldVotes);
    var nextFirstLast = this.firstLastIndex.get(nextVotes);

    const nextPos = oldFirstLast.first;

    if(nextFirstLast==undefined) {
      // special case, no one in this slot of votes yet
      const nextFirst = nextPos;
      const nextLast = nextPos + 1;

      this.firstLastIndex
        .set(nextVotes,
             {
               first: nextFirst,
               last: nextLast
             })
    } else {
      // if it already exists
      // just append to the end of it
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

  voteDownFirstLastIndex(thread) {
    const id = thread.topic + thread.date;
    const oldPos = thread.position;
    const oldVotes = thread.votes;
    const nextVotes = oldVotes-1;
    
    const oldFirstLast = this.firstLastIndex.get(oldVotes);
    const nextFirstLast = this.firstLastIndex.get(nextVotes);
    
    const nextPos = oldFirstLast.last;
    
    if(nextFirstLast==undefined) {
      // special case, no one in this slot of votes yet
      // create the slot
      const nextFirst = nextPos - 1;
      const nextLast = nextPos;
      
      this.firstLastIndex
        .set(nextVotes,
             {
               first: nextFirst,
               last: nextLast
             })
    } else {
      // if it already exists
      // just append to the head of it
      nextFirstLast.first -= 1;
    }
    
    // remove from previous vote index
    // minus 1 because one of the items moved to lower vote
    oldFirstLast.last -= 1;
    if(oldFirstLast.first == oldFirstLast.last) {
      // if there is nothing in this place remove it from map
      this.firstLastIndex.delete(oldVotes);
    }
    
    return nextPos-1;
  }

  // to swap position
  updateRank(oldPos, nextPos, vote) {
    const old = this.rank[oldPos];
    const next = this.rank[nextPos];

    // update internal position
    old.position = nextPos;
    next.position = oldPos;

    // update external rank position
    this.rank[oldPos] = next;
    this.rank[nextPos] = old;

    // update internal vote
    if(vote) {
      old.votes += 1;
    } else {
      old.votes -= 1;
    }

    // only update top20 if there is a swap
    if(nextPos < 20 || oldPos < 20) {
      this.updateTop20();
    }

  }

  /* only update when required
     to reduce useless computation
     */
  updateTop20() {
    this.top20 = this.rank.slice(0,20);
  }

}

module.exports = DataStructure;
