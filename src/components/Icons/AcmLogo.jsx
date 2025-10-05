import React from "react";

export const AcmLogo = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="48" fill="none" stroke="#06b6d4" strokeWidth="3" />
    <circle cx="50" cy="50" r="38" fill="#06b6d4" />
    <text x="50" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">
      acm
    </text>
    <path id="circlePath" fill="none" d="M 10,50 A 40,40 0 1 1 90,50 A 40,40 0 1 1 10,50" />
    <text fontFamily="Arial, sans-serif" fontSize="7" fill="#0891b2" letterSpacing="0.5">
      <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
        Association for Computer Machinery • St. Joseph's Student Chapter
      </textPath>
    </text>
  </svg>
);
