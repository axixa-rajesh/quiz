import React from 'react';
import { 
  User, 
  GraduationCap, 
  PlayCircle, 
  Folder, 
  Award, 
  Calendar, 
  MessageSquare, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Mon profil', icon: User, active: true },
    { name: 'Mes formations', icon: GraduationCap, badge: 4 },
    { name: 'Sessions suivies', icon: PlayCircle, badge: 1 },
    { name: 'Projets', icon: Folder, badge: 3 },
    { name: 'Certifications', icon: Award, badge: 2 },
    { name: 'Calendrier', icon: Calendar },
    { name: 'Messages', icon: MessageSquare, badge: 0 },
    { name: 'Paramètres', icon: Settings },
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#52459d',
      minHeight: '100vh',
      padding: '20px 15px',
      color: '#ffffff',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ marginBottom: '30px', paddingLeft: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>UX/UI Dashboard</h3>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={index} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: item.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: item.active ? '#ffffff' : '#d1cbe5',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <IconComponent size={20} color={item.active ? '#ffffff' : '#d1cbe5'} />
                <span style={{ fontSize: '14px', fontWeight: item.active ? '600' : '400' }}>
                  {item.name}
                </span>
              </div>

              {item.badge !== undefined && (
                <span style={{
                  fontSize: '11px',
                  opacity: 0.8,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '10px'
                }}>
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;