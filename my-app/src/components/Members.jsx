import React, { useEffect, useState } from "react";
import "../styles/members.css";
import Footer from "../components/Footer";
import * as XLSX from "xlsx";

const Members = () => {
  const [data, setData] = useState([]);

  // Hardcoded email mapping for head table and tribune
  const emailMapping = {
    "Consul": "ucmconsul@gmail.com",
    "Pro Consul": "ucmproconsul@gmail.com",
    "Annotator": "ucmannotator@gmail.com",
    "Tribune": "ucmtribune@gmail.com"
  };

  // Define the head table roles in desired order
  const headRolesOrder = ["Pro Consul", "Consul", "Annotator"];

  // Utility: normalize a committee string into an array of uppercase codes
  const normalizeCommittees = (committeeString) => {
    if (!committeeString) return [];
    return committeeString.split(",").map((c) => c.trim().toUpperCase());
  };

  // Utility: check if a member is in a given committee (code)
  const inCommittee = (member, code) => {
    const committees = normalizeCommittees(member.committee);
    return committees.includes(code.toUpperCase());
  };

  // Fetch and parse the Excel file from public/data on mount
  useEffect(() => {
    fetch("/data/brother-info.xlsx")
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const processed = jsonData.map((item) => ({
          name: item.Name,
          grad: item.Class,
          // Expecting positions stored as a comma-separated string
          positions: item["Position(s)"]
            ? item["Position(s)"].split(",").map((pos) => pos.trim())
            : [],
          gradDate: item["Grad Date"] || "TBD",
          // New "Committee" field
          committee: item["Committee"] ? item["Committee"].trim() : ""
        }));
        setData(processed);
      })
      .catch((error) => console.error("Error loading Excel file:", error));
  }, []);

  // Group members based on the "Committee" field

  // Head Table: members with "HT" in their committee
  const headTable = data.filter((member) => inCommittee(member, "HT"));

  // Sort head table members based on the desired role order
  const sortedHeadTable = headTable.sort((a, b) => {
    const aRole = headRolesOrder.find((role) => a.positions.includes(role));
    const bRole = headRolesOrder.find((role) => b.positions.includes(role));
    return headRolesOrder.indexOf(aRole) - headRolesOrder.indexOf(bRole);
  });

  // Executive Committee: members with "EC" (and not in head table)
  const executiveCommittee = data.filter(
    (member) => inCommittee(member, "EC") && !inCommittee(member, "HT")
  );

  // Outreach Committee: members with "OC" (and not in head table)
  const outreachCommittee = data.filter(
    (member) => inCommittee(member, "OC") && !inCommittee(member, "HT")
  );

  // Actives: members not in any officer committee (HT, EC, or OC)
  const actives = data.filter((member) => {
    const committees = normalizeCommittees(member.committee);
    return !committees.includes("HT") && !committees.includes("EC") && !committees.includes("OC");
  });

  return (
    <>
      <div className="members-page">
        {/* Head Table Section */}
        <section className="head-table">
          <h1>Head Table</h1>
          <div className="members-grid">
            {sortedHeadTable.map((member, index) => {
              // Only display the head table role in the defined order
              const headPosition = headRolesOrder.find((role) =>
                member.positions.includes(role)
              );
              // Use the hardcoded email from the mapping for head table roles
              const email = headPosition ? emailMapping[headPosition] : "";
              return (
                <div key={index} className="member-card head-table-card">
                  <div className="headshot-placeholder">Headshot</div>
                  <div className="member-info">
                    <p className="member-name">
                      {member.name} ({member.grad})
                    </p>
                    <p className="member-position">{headPosition}</p>
                    {email && (
                      <p className="member-email">
                        <a href={`mailto:${email}`}>{email}</a>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Executive Committee Section */}
        <section className="executive-committee">
          <h1>Executive Committee</h1>
          <div className="members-grid">
            {executiveCommittee.map((member, index) => (
              <div key={index} className="member-card">
                <div className="headshot-placeholder">Headshot</div>
                <div className="member-info">
                  <p className="member-name">
                    {member.name} ({member.grad})
                  </p>
                  <p className="member-position">
                    {member.positions.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outreach Committee Section */}
        <section className="outreach-committee">
          <h1>Outreach Committee</h1>
          <div className="members-grid">
            {outreachCommittee.map((member, index) => {
              // Check if the member holds the Tribune role
              const isTribune = member.positions.includes("Tribune");
              // If so, set the email using the mapping; otherwise, leave it empty.
              const email = isTribune ? emailMapping["Tribune"] : "";
              return (
                <div key={index} className="member-card">
                  <div className="headshot-placeholder">Headshot</div>
                  <div className="member-info">
                    <p className="member-name">
                      {member.name} ({member.grad})
                    </p>
                    <p className="member-position">
                      {member.positions.join(", ")}
                    </p>
                    {isTribune && (
                      <p className="member-email">
                        <a href={`mailto:${email}`}>{email}</a>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Actives Section */}
        <section className="actives">
          <h1>Actives</h1>
          <div className="actives-list">
            <p>
              {actives
                .map((member) => `${member.name} (${member.grad})`)
                .join(", ")}
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Members;
