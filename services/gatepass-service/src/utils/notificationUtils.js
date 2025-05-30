import { triggerNotification } from "./notifier.js";

export const sendGatePassIssuedNotification = async (userId, gatePass) => {
    await triggerNotification({
      recipientId: userId,
      type: 'gatepass_created',
      message: `Your gate pass has been created. It is valid until ${new Date(gatePass.validUntil).toLocaleString()}.`,
      meta: {
        gatePassId: gatePass.id,
        leaveId: gatePass.leaveId,
        validUntil: gatePass.validUntil
      }
    });
  };
  
  export const sendGatePassUsedNotification = async (userId, gatePassId) => {
    await triggerNotification({
      recipientId: userId,
      type: 'gatepass_used',
      message: `Your gate pass (${gatePassId}) has been marked as used at ${new Date().toLocaleString()}.`,
      meta: { gatePassId }
    });
  };
  
  export const sendGatePassExpiredNotification = async (userId, gatePassId) => {
    await triggerNotification({
      recipientId: userId,
      type: 'gatepass_expired',
      message: `Your gate pass (${gatePassId}) has expired. Please contact hostel or department.`,
      meta: { gatePassId }
    });
  };
  


// import axios from 'axios';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// // Notification Service URL (You can replace this with your Notification Service endpoint)
// const notificationServiceUrl = 'http://notification-service:5003/api/notifications';

// // Function to send gatepass creation notification
// export const sendGatePassNotification = async (userId, gatePass) => {
//   try {
//     const user = await getUserDetails(userId); // Fetch user details like email, name

//     const payload = {
//       userId: user.id,
//       type: 'gatepass_created', // Define a notification type
//       message: `Dear ${user.name},\n\nYour gate pass has been created for your approved leave request. The gate pass is valid until ${gatePass.validUntil}.\n\nGate Pass Details:\nLeave ID: ${gatePass.leaveId}\nIssued At: ${gatePass.issuedAt}`,
//     };

//     // Send notification to the Notification Service
//     await axios.post(notificationServiceUrl, payload);
//     console.log('Gate pass notification sent to user:', user.email);
//   } catch (error) {
//     console.error('Error sending gate pass notification:', error);
//   }
// };

// // Function to send gate pass used notification (when the user exits)
// export const sendGatePassUsedNotification = async (userId) => {
//   try {
//     const user = await getUserDetails(userId); // Fetch user details like email, name

//     const payload = {
//       userId: user.id,
//       type: 'gatepass_used', // Define a notification type
//       message: `Dear ${user.name},\n\nYour gate pass has been marked as used as you have exited the campus.\n\nGate Pass Details:\nGate Pass ID: ${user.gatePass.id}\nUsed At: ${new Date().toISOString()}`,
//     };

//     // Send notification to the Notification Service
//     await axios.post(notificationServiceUrl, payload);
//     console.log('Gate pass used notification sent to user:', user.email);
//   } catch (error) {
//     console.error('Error sending gate pass used notification:', error);
//   }
// };

// // Function to send gate pass expiration notification
// export const sendGatePassExpirationNotification = async (userId, gatePassId) => {
//   try {
//     const user = await getUserDetails(userId); // Fetch user details like email, name

//     const payload = {
//       userId: user.id,
//       type: 'gatepass_expired', // Define a notification type
//       message: `Dear ${user.name},\n\nYour gate pass has expired. Please contact the respective department if you require an extension or new gate pass.\n\nGate Pass Details:\nGate Pass ID: ${gatePassId}`,
//     };

//     // Send notification to the Notification Service
//     await axios.post(notificationServiceUrl, payload);
//     console.log('Gate pass expiration notification sent to user:', user.email);
//   } catch (error) {
//     console.error('Error sending gate pass expiration notification:', error);
//   }
// };

// // Helper function to get user details by userId (You may implement this based on your user model)
// const getUserDetails = async (userId) => {
//   // Fetch user details from the database, for example
//   const user = await prisma.user.findUnique({ where: { id: userId } });
//   return user;
// };
