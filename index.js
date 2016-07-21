'use strict'

const td = require('testdouble');

// Meteor core
// XXX very incomplete - check API and add more
const Meteor = td.object(['call', 'publish']);
Object.assign(Meteor, {
  settings: {},
  isClient: false,
  isServer: false,
});

// Collections

// use newCollection() to stub a Meteor collection that you would have created with
// `new Meteor.Collection('somename')`. You must call it with parens () - this allows
// you to have more than one. The default behavior of find() is that for any
// arguments passed, it will return a stubbed cursor object that you can
// test with td.verify(). If you need more specific behavior, you should create a
// custom stub rather than using this one.

const createCursor = () => td.object(['forEach', 'map', 'fetch', 'count', 'observe', 'observeChanges']);

const newCollection = () => {
  const collection = td.object(['find', 'findOne', 'insert', 'remove', 'upsert', 'allow', 'deny']);
  td.when(collection.find(td.matchers.anything())).thenReturn(createCursor());
  return collection;
};

const Mongo = td.object(['Collection', 'Cursor', 'ObjectID']);

module.exports = {
  Meteor,
  createCursor,
  newCollection,
  Mongo,
};
