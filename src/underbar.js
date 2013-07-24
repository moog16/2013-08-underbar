
/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n == null) {
      return array[0];
    };
    var newArr = [];
    for(var i=0; i<n; i++) {
      if (array[i] != null) {
        newArr.push(array[i]);
      };
    };
    return newArr;
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var end = array.length;
    if (n === undefined) {
      return array[end-1];
    }
    else if (n === 0){
      return [];
    }
    else if (n > end) {
      return array;
    }
    else {
      var newArr = [];
      for(var i=(n-1); i<end; i++) {
        newArr.push(array[i]);
      };
      return newArr;
    };
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for(var i=0; i<collection.length; i++) {  
        iterator(collection[i], i, collection);
      }
    }
    else {
      var keys = Object.keys(collection);
      for(var key in keys) {
        iterator(collection[keys[key]], keys[key], collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var flag = -1, set = false;
    _.each(array, function(value, index, collection) { 
      if(value === target && set === false) {
        flag = index;
        set = true;
      }
    });
    return flag;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var results = [];
    for(var i=0; i<collection.length; i++) {
      if(iterator(collection[i])) {
        results.push(collection[i]);
      };
    };
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    //return _.filter(collection, !iterator)
    var results = [];
    for(var i=0; i<collection.length; i++) {
      if(!iterator(collection[i])) {
        results.push(collection[i]);
      };
    };
    return results;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = [];
    for(var i=0; i<array.length; i++) {
      if(results.indexOf(array[i]) <= -1) {
        results.push(array[i]);
      };
    };
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    for(var i=0; i<array.length; i++) {
      results.push(iterator(array[i]));
    };
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var results = [];
    for(var i=0; i<list.length; i++) {
      var newList = list[i].sort();
      results.push(newList);
    };
    return results;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to the first element in the input array.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //

  _.reduce = function(collection, iterator, initialValue) {
    var result, startVal;

    if(initialValue != null) {
      result = initialValue; 
      startVal = 0;
    }
    else {
      result = collection[0];  
      startVal = 1;
    };

    //contains wants us to use reduce --> contains tests for objects
    if (!Array.isArray(collection)) {
      var keys = Object.keys(collection);
      var len = keys.length;
      while(startVal < len) {
        result = iterator(result, collection[keys[startVal]]);
        startVal++;
      };
    }
    else {
      while(startVal < collection.length) {
        result = iterator(result, collection[startVal]);
        startVal++;
      };
    };
    return result;
  };

  //expect(_.contains({moe:1, larry:3, curly:9}, 3)).to.equal(true);
  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator == null) {
      iterator = function(i) { return i; }; 
    };
    var truthTest = _.reduce(collection, function(result, item) {
      return (result && iterator(item));
    }, true);
    if (truthTest == 1) {
      return true;
    }
    else if(truthTest == 0 || truthTest == null) {
      return false;
    }
    else {
      return truthTest;
    };

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(iterator == null) {
      iterator = function(i) { return i; };
    }
    var flag = false;

    for(var element in collection) {
      if(iterator(collection[element]) === true) {
        flag = true;
      }
    }

    for(var element in collection) {
      collection[element] = !collection[element];
    }

    return flag || !_.every(collection, iterator);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for(var i=0; i<arguments.length; i++) {
      var keys = Object.keys(arguments[i]);
      for(var j=0; j<keys.length; j++) {
        obj[keys[j]] = arguments[i][keys[j]];
      };
    };

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i=1; i<arguments.length; i++) {
      var keys = Object.keys(arguments[i]);
      for(var j=0; j<keys.length; j++) {
        if(!(keys[j] in obj)){
          obj[keys[j]] = arguments[i][keys[j]];
        };
      };      
    };
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};

    var args = JSON.stringify(arguments);

    var memo = function(fun) {
      if(results[args]) {
        return results[args];
      }
      else {
        var answer = fun.apply(null, arguments);
        results[args] = answer;
        return answer;
      }
    };

    return memo(func);
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    setTimeout(func,wait,arguments[2],arguments[3],arguments[4]);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var allShuffled=false, newNum;
    var shuffled = [];
    while(!allShuffled) {
      newNum = Math.floor(Math.random()*array.length);
      //console.log(array.indexOf(newNum)/* + ", " newNum + "in array"*/);
      //console.log(shuffled.indexOf(newNum)/* + ", " newNum + "in shuffled"*/);

      if(array.indexOf(newNum) > -1 && shuffled.indexOf(newNum) == -1) {
        shuffled.push(newNum);
      };
      if(shuffled.length == array.length){
        allShuffled = true;
      };
    };
    return shuffled;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var results = [],
    sortedResults = [],
    newColl = [];
    var len = collection.length;

    //leave collection untouched, Spec doesn't like that
    for(var index in collection) {
      if(iterator === 'length') {
        results.push(collection[index].length);   
      }
      else {
        results.push(iterator(collection[index]));
      }
      newColl.push(collection[index]);
    }
    results.sort();

    for(var i=0; i<len; i++) {
      var count = 0;
      while(count < len) {
        if(iterator === 'length') {
          if(results[i] === newColl[count].length) {
            sortedResults.push(newColl[count]);
            newColl.splice(count, 1);
            break;
          }
        }
        else if(results[i] === iterator(newColl[count])) {
          sortedResults.push(newColl[count]);
          newColl.splice(count, 1);
          break;
        }
        count++;
      }
    }
    return sortedResults;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var results = [], maxLen=0;
    var len = arguments.length;
    for(var i=0; i<len; i++){
      if(arguments[i].length > maxLen) {
        maxLen = arguments[i].length;
      };
    };
    for(var i=0; i<maxLen; i++) {
      var singleResult = [];
      for(var j=0; j<len; j++) {
        singleResult.push(arguments[j][i]);
      };
      results.push(singleResult);
    };
    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = ""+nestedArray;
    result = result.split(",");
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var currentArray = arguments[0];
    var results = [];

    for(var i=1; i<arguments.length; i++) {
      for(var j=0; j<currentArray.length; j++) {
        for(var k=0; k<arguments[i].length; k++) {
          if(currentArray[j] === arguments[i][k]) {
            results.push(currentArray[j]);
          };
        };
      };
    };
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var results = arguments[0];
    
    for(var i=1; i<arguments.length; i++) {
      for(var j=0; j<results.length; j++) {
        if(!arguments[i].indexOf(results[j])) {
          results.splice(j, 1);
        };
      };
    };

    return results;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
