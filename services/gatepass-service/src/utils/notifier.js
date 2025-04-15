import axios from 'axios';

export const triggerNotification = async ({ recipientId, message, type, meta }) => {
  try {
    await axios.post('http://notification-service:5003/api/notifications/send', {
      recipientId,
      message,
      type,
      meta
    });
  } catch (error) {
    console.error('Notification Error:', error.message);
  }
};
