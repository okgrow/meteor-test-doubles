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

const newCollection = () => ({
  find: () => ({ fetch: td.function('fetch') }),
  findOne: () => td.function('findOne'),
  insert: () => td.function('insert'),
  remove: () => td.function('remove'),
});

const Mongo = td.object(['Collection', 'Cursor', 'ObjectID']);

module.exports = {
  Meteor,
  newCollection,
  Mongo,
};
