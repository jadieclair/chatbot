import React from "react";

function EllipsisIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 512 512"
      >
        <circle cx="256" cy="256" r="26" fill="currentColor" />
        <circle cx="346" cy="256" r="26" fill="currentColor" />
        <circle cx="166" cy="256" r="26" fill="currentColor" />
        <path
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        />
      </svg>
    </div>
  );
}

export default EllipsisIcon;
