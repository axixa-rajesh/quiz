import {Auditlog} from "../models/index.js";

export const createAuditlog=async(action,entity,entityId,userId,details)=>{
    await Auditlog.create({
        action,entity,entity_id,user_id,details
    });
};