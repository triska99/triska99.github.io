const webPush = require('web-push');

const vapidKeys = {
  "publicKey": "BBmJJGdXcqnqqrO_Hn45qRbqWvhMMIQHhC2nl5XxujVcL1sSA9SuKaVWHLGfvqbNfpJqlpgEDhorRnA1fpP8-e8",
  "privateKey": "G-Nx2FJgO85OROHGDFEivN2zlYDmExFvLEjrwnfeAZo"
};


webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
const pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/cMDjs8Fo3mo:APA91bGwZ4TgcaqDa6c8DyrQ89DjvWYCA_fCOVS3NX_l4BIcUOKnnoe7OucXdAUH833vtLN-UTGDIW7IkJYUOO6JiVuMW44QcS2N1RHsqhSZsLg_FDPDAdjtEQWbAZTW_3DwQm05ILv3",
  "keys": {
    "p256dh": "BFBl/kyHfl3gavANnKOtw+ILet8dityDurEH3vJDihKXK2vGRY0LhlrsIKJxoMQ9TkUbyC28TleVHw0BEBImlMk=",
    "auth": "ICazZ77jrh7NRQ8ZnVMAIg=="
  }
};
const payload = 'Congrats! You can receive notifications!';

const options = {
  gcmAPIKey: '89513200582',
  TTL: 60
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options
);