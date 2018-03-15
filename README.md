# Red-Clone
Reddit/Digg clone for Carousell's coding challenge.

Heroku demo: https://red-clone.herokuapp.com

# Code Ownership
The skeleton of the repository was generated with [express-generator](https://github.com/expressjs/generator) and [create-react-app](https://github.com/facebook/create-react-app). I wrote the rest.

# Installation
Clone and cd into repository:
```sh
git clone https://github.com/PukiPuki/red-clone.git
cd red-clone
```
Install dependencies on both backend and frontend:
```sh
npm install 
cd client
npm install 
cd ..
```
From the root directory(not inside client) build the frontend files that will be served by express:
```sh
npm heroku-postbuild
```
Start the server:
```sh
npm start
```
Run tests:
```sh
npm test
```

## Assumptions about the problem
Reddit is a big app, they have many users. Creating, retrieval and voting has to be as efficient as possible. The amount of retrieval and voting will be far greater than creating of topic so I focused on creating something to help speed up these portions.

## Data Structure and Sorting Algorithm
Here is a summary of the data structure used by `dataStructure` to store and manage the threads.
- The threads are objects.
- An array, `rank` maintaining the sorted invariant have indexes pointing to the object.
- To retrieve the threads, a Map aptly named `map` is used.
- Another map, `firstLastIndex` of votes to their first and last indexes is used to allow O(1) upvote and downvote. 

### O(1) Upvote/Downvote
This method was inspired by quicksort's partition method of moving things. This is based on the assumption that there are many many number of threads with same number of votes. Think thousands of threads with 0 votes, most blank reddit posts just dies out. Out of this, some middle thread's vote increases from 0 to 1. How can we move it up to the next partition? We could use a bubble sort method to float it up. Simple and elegant but slow. Similar to how binary heaps and bst work, they have some sort of structure to their data to maintain some information that helps in the retrieval. To quickly move the thread up to the 1 vote partition, we simply have to swap the thread with the one at the front of the 0 vote partition, similar to quicksort. The `firstLastIndex` is a map of vote to first and last index of a partition indicating where a partition starts and end. When upvoting or down voting happens just swap it with the first or last index and the rest is book keeping.

### O(1) Retrieval
Map is used, trivially O(1).
