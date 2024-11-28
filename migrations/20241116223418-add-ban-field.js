// migrations/<timestamp>-add-ban-field.js
module.exports = {
  async up(db, client) {
    // Add the 'ban' field to all existing users
    await db.collection('users').updateMany(
      { ban: { $exists: false } },
      { $set: { ban: false } }
    );
  },

  async down(db, client) {
    // Remove the 'ban' field if rolled back
    await db.collection('users').updateMany({}, { $unset: { ban: "" } });
  },
};
