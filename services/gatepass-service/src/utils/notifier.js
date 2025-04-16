import axios from 'axios';
import logger from '../utils/logger.js';  

export const triggerNotification = async ({ recipientId, message, type, email, channel, meta }) => {
  try {
    await axios.post('http://localhost:5004/api/notifications/send', {
      recipientId,
      message,
      type,
      email,
      channel,
      meta,
    });
    logger.info(`✅ Notification sent successfully to recipient ID: ${recipientId}, type: ${type}, channel: ${channel}`); // Log success
  } catch (error) {
    logger.error(`❌ Notification Error for recipient ID: ${recipientId}, type: ${type}, channel: ${channel}:`, error.message); // Log error
  }
};
