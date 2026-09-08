import React from "react";
import {Button} from "./UIComponents";

export const LoadingState=({message:"Loading live data..."})=>(
<div style={padding:"39px",textAlign:"center",color:"6b21a8"}>
    <div style={{fontSize:"23px",marginBottom:"7px"}}>⏳</div>
    <p style={{fontWeight:"500"}}>{message}</p>
</div>
);

export const ErrorState=({message:"No data found.",actionText,onAction})=>(
    <div style={{padding:"39px",background:"#fef2",border:"1px solid #fca5a5",textAlign:"center",borderRadius:"11px"}}>
        <p style={{color:"#dc2626",fontWeight:"600",marginBottom: "12px"}}>⚠️ Error: {message}</p>
            {onRetry && <Button variant="secondary" onClick={onRetry}>🔄 Retry Request</Button>}
    </div>
);

export const EmptyState = ({ message = "No data found.", actionText, onAction }) => (
  <div style={{ padding: "40px", border: "2px dashed #E9D5FF", borderRadius: "12px", textAlign: "center", background: "#FAF5FF" }}>
    <p style={{ color: "#6B7280", marginBottom: "12px" }}>📭 {message}</p>
    {actionText && onAction && <Button variant="primary" onClick={onAction}>{actionText}</Button>}
  </div>
);