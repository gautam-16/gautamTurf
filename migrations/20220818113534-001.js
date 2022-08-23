module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, {$set: {isAdmin: true}});
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    //const users=db.users.find().toArray()
   // return db.users.find().toArray().updateMany({ $set: { isadmin:false } })
    // TODO write the statements to rollback your migration (if possible)
    // Example:
     await db.collection('users').updateMany({}, {$set: {isAdmin: false}});
  }
};
