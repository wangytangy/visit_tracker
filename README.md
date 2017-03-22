# Website Visit Tracker

This Javascript API tracks the number of visits to an app in a given time frame
and returns the number of visits in constant O(1) time.

## Initialize a Tracker
To initialize a tracker, call the constructor function passing in an integer that represents how many minutes ago you want to track:

```js
let tracker = Tracker.new(1;)
// tracker will track number of visits 1 minute ago

let trackerFiveMinAgo = Tracker.new(3);
// tracker will track number of visits 3 minutes ago

let trackerFiveMinAgo = Tracker.new();
// Default: will track number of visits 5 minutes ago
```
By default, a tracker will track number of visits 5 minutes ago.

### logHit()

The function `logHit()` increments a count of total visits every time a user visits the app.
`logHit()` must be invoked automatically when a hit on our app is detected.

### getHits()
The function `getHits()` returns the total number of visits
from a given number of minutes ago.

```js
let tracker = Tracker.new(1);

let numberOfVisits = tracker.getHits();
```
