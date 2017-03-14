/*

LOG HIT COUNT (in constant O(1) time)

Premise
We have a web app that users are visiting. We need a function logHit()
that increments a count of total visits every time a user visits the app.

Assume logHit() is automatically when a hit on our app is detected.

Now we need a function getHits() that returns the total number of visits
a given number of minutes ago.

*/

//**********************************************************************

class HitsTracker {
  // new HitsTracker obj can take an integer for calculating visits X min ago
  // (assigned 5 mins by default)
  // for example, to track website visits 2 min ago => `let tracker = new HitsTracker(2)`;
  constructor(minAgo = 5) {
    // startPointer will keep track of the time of the least recent hits
    this.startPointer = null;

    // hitsCount will keep track of total number of count
    // as well as a list of number of hits at a given time
    this.hitsCount = {"totalCount": 0};

    this.minsAgo = minAgo;
    this.minsAgoInMilli = this.minsAgo * 60 * 1000;

    let ctx = this;
    this.cleanHitsInterval = setInterval(function() { if (ctx.cleanHits) { ctx.cleanHits()}}, 1)
  }

  logHit() {
    let now = Date.now();
    if (this.startPointer === null || this.hitsCount["totalCount"] === 0) {
      this.startPointer = now;
    }

    // log_hit will keep track of number of visits at the time a visit is logged
    if (this.hitsCount[now]) {
      this.hitsCount[now] += 1;
    } else {
      this.hitsCount[now] = 1;
    }

    // every visit will be added to "totalCount"
    this.hitsCount["totalCount"] += 1;
  }

  /**
    Cleanhits will be called every millisecond to constantly update our
    hitsCount["totalCount"]. It will delete website hits older than 5 min ago.

    Startpoint gets set only ONCE by log_hit, at our first hit.

    Every time cleanHits() is invoked, it will check if our Startpointer
    is at a longer time than 5 minutes ago.

    If yes, it means we have old logged hit entries that we don't want
    to include in our total hits count.

    StartPointer will be incremented every millisecond up until it
    reaches the 5 minutes ago mark.

    1) cleanHits will delete those logged hits from hitsCount.
    2) It will also subtract those out of date logged hits from total hits.

  **/
  cleanHits() {
    let now = Date.now();
    let xMilliSecondsAgo = now - this.minsAgoInMilli;

    console.log("Time now: ", this._toHHMMSS(now));
    console.log(`Time ${this.minsAgo} minute ago: `, this._toHHMMSS(xMilliSecondsAgo));

    console.log("total hits: ", this.hitsCount["totalCount"]);


    for (; this.startPointer < xMilliSecondsAgo; this.startPointer++) {
      if (this.hitsCount[this.startPointer]) {
        // we need to delete the oldest visit entries from the total count

        // for example, if we logged 10 visits 5 min and 1 milliseconds ago
        // 1) we need to delete that key-value pair from the hash AND
        // 2) we need to subtract 10 visits from "totalCount"
        this.hitsCount["totalCount"] -= this.hitsCount[this.startPointer];
        delete this.hitsCount[this.startPointer];
      }
    }

  }

  getHits() {
    this.cleanHits();
    return hitsCount["totalCount"];
  }

  //formats milliseconds into HH:MM:SS:MS format for readability
  _toHHMMSS(ms) {
    return new Date(ms).toISOString().slice(11, -1);
    // console.log( time(1234567890) );  // "06:56:07.890"
  }

  simulateHits() {
    // use setInterval (every second?) to logHit() a random number of times
      // generate a random number
      // invoke logHit() that number of times
    // invoke in constructor
  }

}

let tracker = new HitsTracker(1);
tracker.logHit();
setTimeout(function () {
  //log more hits 10 seconds later
  tracker.logHit();
  tracker.logHit();
  tracker.logHit();
  tracker.logHit();

}, 1000 * 10);
