import axios from 'axios';
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

// Notification Service URL (You can replace this with your Notification Service endpoint)
const notificationServiceUrl = 'http://localhost:5004/api/notifications/send';



export const sendRejectionNotification = async(data,message)=>{
  try {
    await axios.post('http://localhost:5004/api/notifications/send', {
      type: 'leave-rejection',
      channel: 'email',
      recipientId: data.id,
      email:data.email,
      message,
    });

    await axios.post('http://localhost:5004/api/notifications/send', {
      type: 'leave-rejection',
      channel: 'socket',
      recipientId: data.id,
      message,
    });
  } catch (error) {
    console.error('Error sending leave request rejection notification:', error);
  }
}



export const sendLeaveRequestNotification = async (admin, payload) => {
 try {
   await axios.post('http://localhost:5004/api/notifications/send', {
     type: 'leave-request',
     channel: 'email',
     recipientId: admin.id,
     email:admin.email,
     message: `New leave request from ${payload.name} (${payload.department})`,
   });
 
   await axios.post('http://localhost:5004/api/notifications/send', {
     type: 'leave-request',
     channel: 'socket',
     recipientId: admin.id,
     email:admin.email,
     message: `Leave request submitted by ${payload.name}`,
   });
  } catch (error) {
    console.error('Error sending leave request notification:', error);
  }
};

export const sendLeaveApprovalNotification = async (student, payload) => {
  try {
    await axios.post('http://localhost:5004/api/notifications/send', {
      type: 'leave-approval',
      channel: 'email',
      recipientId: student.id,
      message: `Your leave has been ${payload.status} by ${payload.approvedBy}`,
    });
  
    await axios.post('http://localhost:5004/api/notifications/send', {
      type: 'leave-approval',
      channel: 'socket',
      recipientId: student.id,
      message: `Leave ${payload.status} at ${payload.currentStage} stage.`,
    });
  } catch (error) {
    console.error('Error sending leave request approval notification:', error);
  }
};
