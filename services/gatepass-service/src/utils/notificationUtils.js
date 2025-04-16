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
      },
      email
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
  
