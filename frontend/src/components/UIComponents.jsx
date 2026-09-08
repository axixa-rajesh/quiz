import React from 'react';

export const Button=({children,variant="primary",onClick,disabled,className="",...props})=>{
    const baseStyle={
        padding:"10px 17px",
        borderRadius:"13px",
        fontWeight:"400",
        fontSize:"12px",
        cursor:disabled ? "not-allowed" : "pointer",
        opacity:disabled ? 0.6 : 1,
        transition:"all 0.2s ease",
        border:"none",
        display:"inline-flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"7px",
    };

   const variants={
    primary:{background:"var(--accent-purple, #8B5CF6)",color:"#fff", boxshadow:"0 4px 12px rgba(132,92,245,0.1)"},
    secondary:{background:"#fff",color:"var(--accent-purple,#8B5cf6)",border:"1px solid var(--border-color,#e9d5ff)"},
    danger:{background:"#EF4444",color:"#FFF"}
   };

   return(
    <button style={{...baseStyle,...variants[variant]}} onClick={onClick} disabled={disabled}>
        {children}
    </button>
   );
}
   export const Input=({label,error,...props})=>(
        <div style={{display:"flex",flexDirection:"column",gap:"5px",width:"100%"}}>
            {label && <label style={{fontSize:"12px", color:"var(--text-muted,#64748b)",
            fontWeight:"500"}}>{label}</label>}
           <input 
                style={{
                    padding:"10px 14px",
                    borderRadius: "10px",
                    border: error ? "1px solid #EF4444" : "1px solid var(--border-color, #E9D5FF)",
                    background: "var(--bg-main, #F4F0FA)",
                    color: "var(--text-dark, #1E1B4B)",
                    outline: "none",
                    fontSize: "14px",
                }}
                {...props}
           /> 
           {error && <span style={{color:"ef4444",fontSize:"12px"}}>{error}</span>}
        </div>
   );

   export const Select=({label,options=[],...props})=>(
    <div style={{display:"flex",flexDirection:"column",gap:"5px",width:"100%"}}>
        {label && <label style={{fontSize:"12px",color:"var(--text-muted,#64748b)",fontWeight:"400"}}>{label}</label>}
        <select style={{
            padding:"10px 14px",
            borderRadius:"10px",
            border: "1px solid var(--border-color, #E9D5FF)",
            background: "var(--bg-main, #F4F0FA)",
            color: "var(--text-dark, #1E1B4B)",
            outline: "none",
            fontSize: "14px",
        }}
            {...props}
        >
            {options.map((opt,idx)=>(
                <option key={idx} value={opt.value || opt}>
                    {opt.label || opt}
                </option>
                ))}
        </select>
    </div>
   );

   export const StatusBadge = ({ status }) => {
  const statusStyles = {
    Passed: { bg: "#D1FAE5", text: "#059669" },
    Failed: { bg: "#FEE2E2", text: "#DC2626" },
    Average: { bg: "#FEF3C7", text: "#D97706" },
    Active: { bg: "#DDD6FE", text: "#7C3AED" },
  };

  const current = statusStyles[status] || { bg: "#F1F5F9", text: "#64748B" };

  return (
    <span
      style={{
        background: current.bg,
        color: current.text,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
};

export const PageHeader = ({ eyebrow, title, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
    <div>
      {eyebrow && <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--accent-purple, #8B5CF6)", letterSpacing: "1px" }}>{eyebrow}</span>}
      <h2 style={{ color: "var(--text-dark, #1E1B4B)", margin: "2px 0 0 0", fontSize: "22px", fontWeight: "700" }}>{title}</h2>
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const TimerDisplay = ({ seconds }) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeString = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  const isWarning = seconds < 300;

  return (
    <div style={{ textAlign: "right" }}>
      <small style={{ color: "var(--text-muted, #64748B)", fontWeight: "500" }}>Time Remaining</small>
      <h2 style={{ color: isWarning ? "#EF4444" : "var(--accent-purple, #8B5CF6)", margin: "0", fontSize: "20px" }}>
        ⏱ {timeString}
      </h2>
    </div>
  );
};

export const Table = ({ headers = [], children }) => (
  <div style={{ width: "100%", overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid var(--border-color, #E9D5FF)" }}>
          {headers.map((h, i) => (
            <th key={i} style={{ padding: "12px 14px", color: "var(--text-muted, #64748B)", fontSize: "11px", fontWeight: "600", textTransform: "uppercase" }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(15, 23, 42, 0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          padding: "28px",
          borderRadius: "20px",
          width: "420px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          border: "1px solid var(--border-color, #E9D5FF)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, color: "var(--text-dark, #1E1B4B)" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#94A3B8" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};
    

