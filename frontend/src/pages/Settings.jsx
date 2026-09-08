import React, { useState, useEffect } from "react";
import { PageHeader, Button, Input, Select } from "../components/UIComponents";
import { getSystemSettings, updateSystemSettings } from "../services/api";

const Settings = () => {
  const [settings, setSettings] = useState({
    defaultTimeLimit: 15,
    passingPercentage: 60,
    marksPerQuestion: 2,
    negativeMarking: false,
    autoSaveInterval: 30,
    emailNotifications: true
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSystemSettings().then((data) => {
      if (data) setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await updateSystemSettings(settings);
    setSaving(false);
    if (res.success) {
      setMessage("✅ Settings updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <p style={{ padding: "24px" }}>Loading Settings...</p>;

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader title="System Settings & Rules" eyebrow="STUDENT 1 - DAY 14 TASK" />

      {message && (
        <div style={{ padding: "12px 16px", background: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: "8px", color: "#15803D", fontWeight: "600" }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* QUIZ DEFAULT RULES */}
        <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
          <h3 style={{ margin: "0 0 16px 0", color: "#1E1B4B" }}>📋 Default Quiz Rules</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            <Input
              label="Default Time Limit (mins)"
              type="number"
              value={settings.defaultTimeLimit}
              onChange={(e) => handleChange("defaultTimeLimit", Number(e.target.value))}
            />
            <Input
              label="Passing Percentage (%)"
              type="number"
              value={settings.passingPercentage}
              onChange={(e) => handleChange("passingPercentage", Number(e.target.value))}
            />
            <Input
              label="Marks Per Question"
              type="number"
              value={settings.marksPerQuestion}
              onChange={(e) => handleChange("marksPerQuestion", Number(e.target.value))}
            />
          </div>
        </div>

        {/* CONTROL PREFERENCES */}
        <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
          <h3 style={{ margin: "0 0 16px 0", color: "#1E1B4B" }}>⚙️ Control & System Preferences</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            <Select
              label="Negative Marking"
              options={["Disabled", "Enabled"]}
              value={settings.negativeMarking ? "Enabled" : "Disabled"}
              onChange={(e) => handleChange("negativeMarking", e.target.value === "Enabled")}
            />
            <Input
              label="Auto-Save Interval (seconds)"
              type="number"
              value={settings.autoSaveInterval}
              onChange={(e) => handleChange("autoSaveInterval", Number(e.target.value))}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "💾 Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;