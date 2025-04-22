import React, { useEffect, useState } from "react";
import "../styles/members.css";
import * as XLSX from "xlsx";

const Members = () => {
  const [data, setData] = useState([]);

  // Utility to parse committee codes
  const normalizeCommittees = (committeeString) => {
    if (!committeeString) return [];
    return committeeString.split(",").map((c) => c.trim().toUpperCase());
  };

  const inCommittee = (member, code) => {
    const committees = normalizeCommittees(member.committee);
    return committees.includes(code);
  };

  // Load the Excel file
  useEffect(() => {
    fetch("/data/brother-info.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const wb = XLSX.read(buffer, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(ws);
        const processed = raw.map((item) => ({
          name: item.Name,
          grad: item.Class,
          positions: item["Position(s)"]
            ? item["Position(s)"].split(",").map((pos) => pos.trim())
            : [],
          gradDate: item["Grad Year"] || "TBD",
          committee: item["Committee"] ? item["Committee"].trim() : ""
        }));
        setData(processed);
      })
      .catch(console.error);
  }, []);
  

  // Group members by committee
  const headTable = data.filter((m) => inCommittee(m, "HT"));
  const executive = data.filter((m) => inCommittee(m, "EC") && !inCommittee(m, "HT"));
  const outreach = data.filter((m) => inCommittee(m, "OC") && !inCommittee(m, "HT"));
  const actives = data.filter(
    (m) => !inCommittee(m, "HT") && !inCommittee(m, "EC") && !inCommittee(m, "OC")
  );

  const renderList = (members) => (
    <ul className="member-list">
      {members.map((m, i) => (
        <li key={i} className="member-list-item">
          {m.name} ({m.grad}){m.positions.length ? ` — ${m.positions.join(", ")}` : ''}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="members-page">
      <section className="list-section">
        <h2>Head Table</h2>
        {headTable.length ? renderList(headTable) : <p>No members</p>}
      </section>

      <section className="list-section">
        <h2>Executive Committee</h2>
        {executive.length ? renderList(executive) : <p>No members</p>}
      </section>

      <section className="list-section">
        <h2>Outreach Committee</h2>
        {outreach.length ? renderList(outreach) : <p>No members</p>}
      </section>

      <section className="list-section">
        <h2>Actives</h2>
        {actives.length ? renderList(actives) : <p>No members</p>}
      </section>
    </div>
  );
};

export default Members;
