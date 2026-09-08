import * as reportService from '../services/reportService.js';

export const getDashboardSummary = async (req, res) => {
    try {
        const data = await reportService.getDashboardSummary();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getQuizReportData = async (req, res) => {
    try {
        const data = await reportService.getQuizReportData();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSubjectTopicReportData = async (req, res) => {
    try {
        const data = await reportService.getSubjectTopicReportData();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStudentAccuracyReport = async (req, res) => {
    try {
        const { userId } = req.params;
        const data = await reportService.getStudentAccuracyReport(userId);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};