import { Button } from "primereact/button";
import React from "react";

const PrimeSingleButton = ({label, onClick = () => {}, icon, className, hidden, disabled}:any) => {
  return (
    <div className={`template${className ? ` ${className}` : ""}`}>
      <Button className="single p-0" aria-label="Twitter" onClick={onClick} hidden={hidden} disabled={disabled}>
        {icon}
        <span className="px-3">{label}</span>
      </Button>
    </div>
  );
};

export default PrimeSingleButton;
