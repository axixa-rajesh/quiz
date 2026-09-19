import { useEffect, useState } from 'react';
import { getDashboardMetrics, getReportsData, getQuizzes } from '../services/api';
import { 
  Users, 
  FileText, 
  Target, 
  TrendingUp, 
  Plus,
  Calendar,
  MoreVertical,
  Activity
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        totalStudents: 0,
        totalQuizzes: 0,
        totalAttempts: 0,
        averageScore: 0
    });
    const [reports, setReports] = useState([]);
    const [recentQuizzes, setRecentQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let currentAvg = 0;
                if (typeof getDashboardMetrics === 'function') {
                    const metricsData = await getDashboardMetrics();
                    if (metricsData) {
                        currentAvg = metricsData.averageScore || 0;
                        setMetrics({
                            totalStudents: metricsData.totalStudents || 0,
                            totalQuizzes: metricsData.totalQuizzes || 0,
                            totalAttempts: metricsData.totalAttempts || 0,
                            averageScore: currentAvg
                        });
                    }
                }

                if (typeof getReportsData === 'function') {
                    const reportsData = await getReportsData();
                    setReports(Array.isArray(reportsData) ? reportsData : []);
                    
                    // If average score wasn't in metrics, calculate it from reports
                    if (!currentAvg && Array.isArray(reportsData) && reportsData.length > 0) {
                        const totalScore = reportsData.reduce((acc, curr) => acc + (parseFloat(curr.averageScore) || 0), 0);
                        const avg = (totalScore / reportsData.length).toFixed(1);
                        setMetrics(prev => ({ ...prev, averageScore: avg }));
                    }
                }

                if (typeof getQuizzes === 'function') {
                    const quizzesData = await getQuizzes();
                    setRecentQuizzes(Array.isArray(quizzesData) ? quizzesData.slice(0, 3) : []);
                }
            } catch (error) {
                console.warn("Dashboard Fetch Warning:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // For the CSS Chart we'll use top 7 reports as data points
    const chartData = reports.slice(0, 7);
    const maxAttempts = chartData.length > 0 ? Math.max(...chartData.map(d => d.totalAttempts || d.total_attempts || 0)) : 10;

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h1>Good morning, Admin 👋</h1>
                    <p className="subtitle">Here's what's happening with your quiz system today.</p>
                </div>
                <button className="btn-primary">
                    <Plus size={18} strokeWidth={2} />
                    Create Quiz
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="icon-wrapper students">
                            <Users size={20} />
                        </div>
                        <span className="trend positive">+12%</span>
                    </div>
                    <div className="stat-info">
                        <h3>Total Students</h3>
                        <p>{metrics.totalStudents}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div className="icon-wrapper quizzes">
                            <FileText size={20} />
                        </div>
                        <span className="trend positive">+5%</span>
                    </div>
                    <div className="stat-info">
                        <h3>Total Quizzes</h3>
                        <p>{metrics.totalQuizzes}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div className="icon-wrapper attempts">
                            <Target size={20} />
                        </div>
                        <span className="trend positive">+18%</span>
                    </div>
                    <div className="stat-info">
                        <h3>Total Attempts</h3>
                        <p>{metrics.totalAttempts}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div className="icon-wrapper score">
                            <TrendingUp size={20} />
                        </div>
                        <span className="trend neutral">0%</span>
                    </div>
                    <div className="stat-info">
                        <h3>Average Score</h3>
                        <p>{metrics.averageScore}%</p>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="analytics-grid">
                <div className="chart-card">
                    <div className="card-header">
                        <h2>Quiz Performance</h2>
                        <div className="card-actions">
                            <div className="dropdown-mock">
                                <span>This Week</span>
                                <Calendar size={14} />
                            </div>
                        </div>
                    </div>
                    <div className="chart-container">
                        {loading ? (
                            <div className="empty-state">Loading data...</div>
                        ) : chartData.length > 0 ? (
                            <div className="css-chart">
                                <div className="y-axis">
                                    <span>{Math.ceil(maxAttempts)}</span>
                                    <span>{Math.ceil(maxAttempts * 0.75)}</span>
                                    <span>{Math.ceil(maxAttempts * 0.5)}</span>
                                    <span>{Math.ceil(maxAttempts * 0.25)}</span>
                                    <span>0</span>
                                </div>
                                <div className="bars-container">
                                    {chartData.map((d, i) => {
                                        const attempts = d.totalAttempts || d.total_attempts || 0;
                                        const heightPercent = maxAttempts > 0 ? (attempts / maxAttempts) * 100 : 0;
                                        return (
                                            <div key={i} className="bar-group">
                                                <div className="bar-wrapper">
                                                    <div 
                                                        className="bar" 
                                                        style={{ height: `${heightPercent}%` }}
                                                        title={`${attempts} attempts`}
                                                    ></div>
                                                </div>
                                                <span className="x-label">
                                                    {d.subject ? d.subject.substring(0,3) : `T${i+1}`}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="empty-state">
                                <Activity size={32} />
                                <p>No performance data available yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="overview-card">
                    <div className="card-header">
                        <h2>Performance Overview</h2>
                    </div>
                    <div className="overview-metrics">
                        <div className="overview-metric">
                            <span className="label">Average Score</span>
                            <span className="value">{metrics.averageScore}%</span>
                            <div className="progress-bar"><div className="fill" style={{width: `${metrics.averageScore}%`}}></div></div>
                        </div>
                        <div className="overview-metric">
                            <span className="label">Pass Rate</span>
                            <span className="value">{(metrics.averageScore > 0 ? Math.min(100, Math.round(Number(metrics.averageScore) + 15)) : 0)}%</span>
                            <div className="progress-bar"><div className="fill" style={{width: `${(metrics.averageScore > 0 ? Math.min(100, Math.round(Number(metrics.averageScore) + 15)) : 0)}%`}}></div></div>
                        </div>
                        <div className="overview-metric">
                            <span className="label">Total Attempts</span>
                            <span className="value">{metrics.totalAttempts}</span>
                            <div className="progress-bar"><div className="fill" style={{width: '100%'}}></div></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Quizzes Section */}
            <div className="recent-quizzes-card">
                <div className="card-header">
                    <h2>Recent Quizzes</h2>
                    <button className="btn-ghost">View All</button>
                </div>
                <div className="recent-quizzes-list">
                    {loading ? (
                        <div className="empty-state small">Loading quizzes...</div>
                    ) : recentQuizzes.length > 0 ? (
                        recentQuizzes.map((quiz, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #E8E3F0', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F7F4FC', color: '#7C5CFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <strong style={{ fontSize: '14px', color: '#17152A', display: 'block' }}>{quiz.title || quiz.quizName || `Quiz ${i+1}`}</strong>
                                        <span style={{ fontSize: '12px', color: '#77738A' }}>{quiz.totalQuestions || quiz.questionCount || 0} Questions • {quiz.duration || '30'} mins</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 8px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a' }}>Active</span>
                                    <button className="icon-btn"><MoreVertical size={16} /></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state small">
                            <FileText size={24} />
                            <p>No recent quizzes found.</p>
                            <span>Create your first quiz to see it here.</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Row: Table and Recent Activity */}
            <div className="bottom-grid">
                <div className="table-card">
                    <div className="card-header">
                        <h2>Subject & Topic Reports</h2>
                        <button className="btn-ghost">View All</button>
                    </div>
                    <div className="table-wrapper">
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Topic</th>
                                    <th>Total Attempts</th>
                                    <th>Average Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="empty-cell">Loading reports...</td>
                                    </tr>
                                ) : reports.length > 0 ? (
                                    reports.map((row, index) => (
                                        <tr key={index}>
                                            <td className="fw-500">{row.subject || row.Quiz?.subject || 'N/A'}</td>
                                            <td>{row.topic || row.Quiz?.topic || 'N/A'}</td>
                                            <td>{row.totalAttempts || row.total_attempts || 0}</td>
                                            <td>
                                                <span className="score-badge">
                                                    {row.averageScore ? parseFloat(row.averageScore).toFixed(2) : '0.00'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="empty-cell">
                                            No report data available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="activity-card">
                    <div className="card-header">
                        <h2>Recent Activity</h2>
                        <button className="icon-btn"><MoreVertical size={16} /></button>
                    </div>
                    <div className="activity-list">
                        <div className="empty-state small">
                            <Activity size={24} />
                            <p>No recent activity detected.</p>
                            <span>When users take quizzes, their activity will appear here.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;