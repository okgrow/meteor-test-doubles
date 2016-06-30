# Meteor Test Doubles

Meteor core API test doubles using [testdouble.js](https://github.com/testdouble/testdouble.js)

## Run fast unit tests with Meteor

Unit tests should load only the code under test, but Meteor apps depend on Meteor core modules that are large and can't be independently loaded under Meteor 1.3 and 1.4. Meteor Test Doubles provides [testdouble.js](https://github.com/testdouble/testdouble.js) replacements for the core Meteor API, allowing you to easily construct lightning-fast unit tests. 

## Set up your unit tests

You can set up your testing by following the instructions in [Meteor Unit Testing with Testdouble.js](http://www.east5th.co/blog/2016/05/02/meteor-unit-testing-with-testdoublejs/).

For maximum compatibility, make your `.babelrc` look like this:

```js
{
  "presets": ["meteor", "react"],
  "plugins": ["transform-es2015-modules-commonjs"]
}
```

Note that there will still be some limitations to you will have to apply to your app to make it compatible:

* You will only be able to use `import` at the top scope of the module (same as Meteor 1.3.2)
* You must import using relative paths, (not paths starting with '/import/...')
* The vanilla babel-plugin-transform-es2015-modules-commonjs will force your modules to declare themselves "use strict", which may be a problem if your Meteor code assigns to global variables.

These limitations may be lifted with [some additional effort](https://forums.meteor.com/t/announcing-meteor-1-3-4-1-and-1-4-beta-1/25460/8?u=rdickert).

## Usage

Use the test doubles to replace core API calls. This will allow you to get your test code running without errors. You can then create custom test doubles and assertions for the specific tests you need to make. e.g.,

```js
import td from 'testdouble';
import { expect } from 'chai';
import { Meteor, Mongo, newCollection } from 'meteor-test-doubles';

describe('testing test doubles', function () {
  beforeEach(function () {
    td.replace('meteor/meteor', { Meteor });
    td.replace('meteor/mongo', { Mongo });
  });

  afterEach(function () {
    td.reset();
  });

  it('should load with test doubles', function () {
    td.replace('/imports/api/myCollection', newCollection());
    td.replace('meteor/react-meteor-data', { createContainer: td.function('createContainer') });
    const Home = require('../../imports/ui/pages/Home');
    expect(0).to.equal(0);
  });
});
```
