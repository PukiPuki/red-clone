
class DataStructure {
  constructor() {
    this.last = 0;
    this.map = new Map();
    this.firstLastIndex = new Map();
    this.firstLastIndex.set(0, {first: 0, last: 0});
    this.top20 = [];
    this.below20 = [];
  }

  insert({topic}) {
    if (topic.length>255) {
      return false;
    } else {
      var thread = {topic, date:Date.now(), votes:0, position:this.last};
      this.last += 1;
      
      // this map will be used to upvotes or downvotes.
      this.map.set(thread.topic+thread.date, thread);
      
      // We append more items to the back
      var index = this.firstLastIndex.get(thread.votes);
      index.last += 1;

      // Check if thread position less than 20
      if (thread.position < 20) {
        this.top20.push(thread);
      } else {
        this.below20.push(thread);
      }
      console.log(this.top20);
      return this.top20;
    }
  }
}

module.exports = DataStructure;
