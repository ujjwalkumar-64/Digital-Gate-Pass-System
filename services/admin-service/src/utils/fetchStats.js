import axios from 'axios';

export const getServiceStats = async () => {
  try {
     const leave = await axios.get('http://leave-service:5001/api/leaves/stats');
  const gatepass = await axios.get('http://gatepass-service:5002/api/gatepasses/stats');
  const notifications = await axios.get('http://notification-service:5003/api/notifications/stats');

  return {
    leaves: leave.data.count,
    gatepasses: gatepass.data.count,
    notifications: notifications.data.count
  };
  } catch (error) {
    throw new Error('Unable to fetch service stats');
  }
 
};
