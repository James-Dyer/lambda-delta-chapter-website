import React from "react";
import "../styles/members.css";
import Footer from "../components/Footer"; // Modular Footer

const Members = () => {
  // Define the head table roles
  const headRoles = ["Consul", "Pro Consul", "Annotator"];

  // Head Table
  const headTable = [
    { name: "Corbin Ward", grad: "Upsilon", positions: ["Consul"], email: "cward5@ucmerced.edu" },
    { name: "Raul Nunes", grad: "Chi", positions: ["Pro Consul", "Recruitment"], email: "rnunes@ucmerced.edu" },
    { name: "Malcolm Marshall", grad: "Psi", positions: ["Annotator"], email: "mmarshall5@ucmerced.edu" }
  ];
  
  // Executive Committee
  const executiveCommittee = [
    { name: "Braydon Hart", grad: "Upsilon", positions: ["Standards Chairman"] },
    { name: "Collin O'Neil", grad: "Upsilon", positions: ["Hunstman Chairman", "Magister"] },
    { name: "Yazan Ammari", grad: "Chi", positions: ["Quaestor"] },
    { name: "Sanjay Kumar", grad: "Chi", positions: ["Kustos"] },
    { name: "Nathan Nugen", grad: "Chi", positions: ["RMF"] },
    { name: "Joshua Jessen", grad: "Omega", positions: ["Brotherhood Chairman"] },
    { name: "Dustin Chancey", grad: "Alpha", positions: ["FSC Delegate"] },
    { name: "Yahel Lazarov", grad: "Alpha", positions: ["Scholarship Chairman"] },
    { name: "Shayan Mirfakhraie", grad: "Alpha", positions: ["Social Chairman", "Chapter Editor"] }
  ];

  // Outreach Committee
  const outreachCommittee = [
    { name: "James Dyer", grad: "Chi", positions: ["IT Chair"] },
    { name: "Sam Hubbell", grad: "Omega", positions: ["Apparel Chairman"] },
    { name: "Hector Manriquez", grad: "Omega", positions: ["Fundraiser Chairman"] },
    { name: "Zen Sharma", grad: "Omega", positions: ["Community Service Chairman"] },
    { name: "Tyler Hooks", grad: "Alpha", positions: ["Tribune"], email: "thooks2@ucmerced.edu" },
    { name: "Josh Lee", grad: "Alpha", positions: ["PR Chairman"] }
  ];

  // Actives
  const actives = [
    { name: "Jayden Menchaca", grad: "Chi" },
    { name: "Eduardo Quintero", grad: "Chi" },
    { name: "Aidan Sgarlato", grad: "Chi" },
    { name: "Kshitij Tamang", grad: "Chi" },
    { name: "Robert Hicks", grad: "Psi" },
    { name: "Caleb Lee", grad: "Psi" },
    { name: "Hamza Naeem", grad: "Psi" },
    { name: "Garvin Wu", grad: "Psi" },
    { name: "Connor Lovitt", grad: "Omega" },
    { name: "Tyler Roman", grad: "Omega" },
    { name: "John Stramotas", grad: "Omega" },
    { name: "Matthew Warthon", grad: "Omega" },
    { name: "Jesus Cruz", grad: "Alpha" }
  ];

  return (
    <>
      <div className="members-page">
        {/* Head Table Section */}
        <section className="head-table">
          <h1>Head Table</h1>
          <div className="members-grid">
            {headTable.map((member, index) => (
              <div key={index} className="member-card head-table-card">
                <div className="headshot-placeholder">
                  {/* Placeholder for headshot */}
                  Headshot
                </div>
                <div className="member-info">
                  <p className="member-name">
                    {member.name} ({member.grad})
                  </p>
                  <p className="member-position">
                    {member.positions
                      .filter((pos) =>
                        headRoles.some((role) => pos.includes(role))
                      )
                      .join(", ")}
                  </p>
                  <p className="member-email">
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  </p>
                </div>
              </div>
            ))}
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
            {outreachCommittee.map((member, index) => (
              <div key={index} className="member-card">
                <div className="headshot-placeholder">Headshot</div>
                <div className="member-info">
                  <p className="member-name">
                    {member.name} ({member.grad})
                  </p>
                  <p className="member-position">
                    {member.positions.join(", ")}
                  </p>
                  {member.email && (
                    <p className="member-email">
                      <a href={`mailto:${member.email}`}>{member.email}</a>
                    </p>
                  )}
                </div>
              </div>
            ))}
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