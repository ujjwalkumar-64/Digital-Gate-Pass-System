import { triggerNotification } from "./notifier.js";
import logger from '../utils/logger.js'; // Import the logger utility

export const sendGatePassIssuedNotification = async (student, gatePass) => {
  try {
    await triggerNotification({
      recipientId: student.id,
      type: 'gatepass_issued',
      channel: 'email',
      message: `${student.name} your gate pass has been created. It is valid until ${new Date(gatePass.validUntil).toLocaleString()}.`,
      meta: {
        gatePassId: gatePass.id,
        leaveId: gatePass.leaveId,
        validUntil: gatePass.toDate
      },
      email: student.email,
    });
    logger.info(`✅ Gate pass issued notification sent to student ID: ${student.id}, gate pass ID: ${gatePass.id}`); // Log success
  } catch (error) {
    logger.error(`❌ Failed to send gate pass issued notification to student ID: ${student.id}, gate pass ID: ${gatePass.id}`, error); // Log error
  }
};

export const sendGatePassUsedNotification = async (student, gatePassId) => {
  try {
    await triggerNotification({
      recipientId: student.id,
      type: 'gatepass_used',
      channel: 'email',
      message: `${student.name} your gate pass (${gatePassId}) has been marked as used at ${new Date().toLocaleString()}.`,
      meta: { gatePassId },
      email: student.email,
    });
    logger.info(`✅ Gate pass used notification sent to student ID: ${student.id}, gate pass ID: ${gatePassId}`); // Log success
  } catch (error) {
    logger.error(`❌ Failed to send gate pass used notification to student ID: ${student.id}, gate pass ID: ${gatePassId}`, error); // Log error
  }
};

export const sendGatePassExpiredNotification = async (student, gatePassId) => {
  try {
    await triggerNotification({
      recipientId: student.id,
      type: 'gatepass_expired',
      channel: 'email',
      message: `${student.name} your gate pass (${gatePassId}) has expired. Please contact hostel or department.`,
      meta: { gatePassId },
      email: student.email,
    });
    logger.info(`✅ Gate pass expired notification sent to student ID: ${student.id}, gate pass ID: ${gatePassId}`); // Log success
  } catch (error) {
    logger.error(`❌ Failed to send gate pass expired notification to student ID: ${student.id}, gate pass ID: ${gatePassId}`, error); // Log error
  }
};

