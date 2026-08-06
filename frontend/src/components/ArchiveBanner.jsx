import React from 'react';
import '../styles/archiveBanner.css';

const ArchiveBanner = () => (
  <aside className="archive-banner" aria-label="Archived website notice">
    <strong>Archived website</strong>
    <span aria-hidden="true">—</span>
    <span>
      This is a preserved May 2026 snapshot of the Lambda Delta Chapter website.
      It is not the chapter&apos;s current official site; information may be
      outdated.
    </span>
  </aside>
);

export default ArchiveBanner;
