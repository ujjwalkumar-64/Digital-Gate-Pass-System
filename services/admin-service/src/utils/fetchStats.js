import axios from 'axios';
import logger from '../utils/logger.js';  

export const getServiceStats = async () => {
  try {
    logger.info('Fetching service stats from leave, gatepass, and notification services...');  
    const leave = await axios.get('http://leave-service:5001/api/leaves/stats');
    logger.info('✅ Fetched leave stats successfully');  

    const gatepass = await axios.get('http://gatepass-service:5002/api/gatepasses/stats');
    logger.info('✅ Fetched gatepass stats successfully');  

    const notifications = await axios.get('http://notification-service:5003/api/notifications/stats');
    logger.info('✅ Fetched notification stats successfully');  
    return {
      leaves: leave.data.count,
      gatepasses: gatepass.data.count,
      notifications: notifications.data.count,
    };
  } catch (error) {
    logger.error('❌ Unable to fetch service stats:', error.message);  
    throw new Error('Unable to fetch service stats');
  }
};
