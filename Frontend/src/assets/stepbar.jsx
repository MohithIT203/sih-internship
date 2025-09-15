import React from "react";

const Empty = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12.0001"
        cy="12"
        r="11"
        transform="rotate(90 12.0001 12)"
        stroke="#D9D9D9"
        strokeWidth="2"
      />
    </svg>
  );
};

const Dotted = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        transform="rotate(90 12 12)"
        stroke="#5978FF"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="6"
        transform="rotate(90 12 12)"
        fill="#5978FF"
      />
    </svg>
  );
};

const Connect = () => {
  return (
    <svg
      width="2"
      height="40"
      viewBox="0 0 2 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-[11px]"
    >
      <rect
        x="2"
        width="40"
        height="2"
        transform="rotate(90 2 0)"
        fill="#5978FF"
      />
    </svg>
  );
};

const EmptyConnect = () => {
  return (
    <svg
      width="2"
      height="40"
      viewBox="0 0 2 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-[11px]"
    >
      <rect
        x="2.00012"
        width="40"
        height="2"
        transform="rotate(90 2.00012 0)"
        fill="#D9D9D9"
      />
    </svg>
  );
};

const TickDotted = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        transform="rotate(90 12 12)"
        fill="#008545"
        stroke="#008545"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="6"
        transform="rotate(90 12 12)"
        fill="#008545"
      />
      <path
        d="M6.75 12.75L9.75 15.75L17.25 8.25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const GreenConnect = () => {
  return (
    <svg
      width="2"
      height="40"
      viewBox="0 0 2 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-[11px]"
    >
      <rect
        x="2"
        width="40"
        height="2"
        transform="rotate(90 2 0)"
        fill="#008545"
      />
    </svg>
  );
};

export { Empty, Dotted, Connect, EmptyConnect, TickDotted, GreenConnect };
