import axios from 'axios';

export const sendRejectionNotification = async(student,message)=>{
  try {
    await axios.post('http://localhost:5004/api/notifications/send', {
      type: 'leave-rejection',
      channel: 'email',
      recipientId: student.id,
      email:student.email,
      message,
      meta:student
    });

    await axios.post('http://localhost:5004/api/notifications/send', {
      type: 'leave-rejection',
      channel: 'socket',
      recipientId: student.id,
      email:student.email,
      message,
      meta:student
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
     meta:payload,
     message: `New leave request from ${payload.name} (${payload.department})`,
   });
 
   await axios.post('http://localhost:5004/api/notifications/send', {
     type: 'leave-request',
     channel: 'socket',
     recipientId: admin.id,
     email:admin.email,
     meta:payload,
     message: `Leave request submitted by ${payload.name}`,
   });
  } catch (error) {
    console.error('Error sending leave request notification:', error);
  }
};

export const sendLeaveApprovalNotification = async (studentId, payload) => {
  try {
    await axios.post('http://localhost:5004/api/notifications/send', {
      type: 'leave-approval',
      channel: 'email',
      recipientId: studentId,
      email:payload.email,
      meta:payload,
      message: `Your leave has been ${payload.status} by ${payload.approvedBy}`,
    });
  
    await axios.post('http://localhost:5004/api/notifications/send', {
      type: 'leave-approval',
      channel: 'socket',
      recipientId: studentId,
      meta:payload,
      email:payload.email,
      message: `Leave ${payload.status} at ${payload.currentStage} stage.`,
    });
  } catch (error) {
    console.error('Error sending leave request approval notification:', error);
  }
};
