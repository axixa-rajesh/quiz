import React, { useEffect, useState } from 'react';
import { getDashboardMetrics, getReportsData } from '../services/api';

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        totalStudents: 0,
        totalQuizzes: 0,
        totalAttempts: 0
    });
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const metricsRes = await getDashboardMetrics();
                const reportsRes = await getReportsData();

                console.log("Metrics API Response:", metricsRes);
                console.log("Reports API Response:", reportsRes);

                // Handle nested vs direct data response
                const metricsData = metricsRes?.data || metricsRes || {};
                setMetrics({
                    totalStudents: metricsData.totalStudents || 0,
                    totalQuizzes: metricsData.totalQuizzes || 0,
                    totalAttempts: metricsData.totalAttempts || 0
                });

                const reportsList = reportsRes?.data || reportsRes || [];
                if (Array.isArray(reportsList)) {
                    setReports(reportsList);
                }
            } catch (error) {
                console.error("Dashboard Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div style={{ padding: '20px' }}>Dashboard loading...</div>;
    }

    return (
        <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Dashboard</h1>

            {/* Metrics Cards Inline Style */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <div style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>Total Students</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6366f1', marginTop: '5px' }}>{metrics.totalStudents}</div>
                </div>

                <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <div style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>Total Quizzes</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6366f1', marginTop: '5px' }}>{metrics.totalQuizzes}</div>
                </div>

                <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <div style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>Total Attempts</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6366f1', marginTop: '5px' }}>{metrics.totalAttempts}</div>
                </div>
            </div>

            {/* Styled Table Section */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Subject & Topic Reports</h2>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #eee', color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>
                            <th style={{ padding: '12px 16px' }}>Subject</th>
                            <th style={{ padding: '12px 16px' }}>Topic</th>
                            <th style={{ padding: '12px 16px' }}>Total Attempts</th>
                            <th style={{ padding: '12px 16px' }}>Average Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? (
                            reports.map((row, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: '500' }}>{row.subject || row.Quiz?.subject || 'N/A'}</td>
                                    <td style={{ padding: '12px 16px' }}>{row.topic || row.Quiz?.topic || 'N/A'}</td>
                                    <td style={{ padding: '12px 16px' }}>{row.totalAttempts || row.total_attempts || 0}</td>
                                    <td style={{ padding: '12px 16px', color: '#6366f1', fontWeight: 'bold' }}>
                                        {row.averageScore ? parseFloat(row.averageScore).toFixed(2) : '0.00'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}>
                                    No report data available. (Database check karein: `quizzes` aur `quiz_attempts` table mein data insertion required hai).
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;