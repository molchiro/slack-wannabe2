const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

exports.createMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async event => {
    const roomID = event.data().roomID
    const notificationsRef = db.collection('notifications')
    const notificationsSnap = await notificationsRef
      .where('roomID', '==', roomID)
      .get()

    notificationsSnap.forEach(notification => {
      notification.ref.set(
        {
          number: notification.data().number + 1,
          latestMessageID: event.id,
          notified: false,
        },
        { merge: true }
      )
    })
  })
