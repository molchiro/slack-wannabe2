const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

exports.createMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async event => {
    const roomID = event.data().roomID
    const notifsRef = db.collection('notifications')
    const notifsSnap = await notifsRef.where('roomID', '==', roomID).get()
    const roomRef = db.doc(`rooms/${roomID}`)
    const roomSnap = await roomRef.get()
    const roomName = roomSnap.data().name
    const auther = event.data().displayName
    const msgContent = event.data().content
    const notifContent = `[${auther}@${roomName}] ${msgContent}`

    notifsSnap.forEach(notification => {
      const number =
        notification.data().userID === event.data().uid
          ? notification.data().number
          : notification.data().number + 1
      notification.ref.set(
        {
          number: number,
          latestMessageID: event.id,
          content: notifContent,
        },
        { merge: true }
      )
    })
  })
