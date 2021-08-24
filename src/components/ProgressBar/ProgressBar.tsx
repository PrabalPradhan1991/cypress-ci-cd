import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import "./ProgressBar.scss";

const ProgressBar: React.FC = () => {
  const selectedIndex =
    useSelector(
      (state: any) => state?.createProjectOnboarding?.selectedIndex
    ) || 0;

  const items: string[] = [
    "Projekt anlegen",
    "E-Mail bestätigen",
    "Iteration festlegen",
    "Fertig",
  ];

  const renderMenuItems = () => {
    return items?.map?.((item: string, index: number) => {
      const currentClass = selectedIndex === index ? "current" : "";
      const completedClass =
        selectedIndex > index || selectedIndex === 3 ? "completed" : "";
      return (
        <li
          className={`progress-bar__item ${currentClass} ${completedClass}`}
          key={index}
        >
          <span>{item}</span>
        </li>
      );
    });
  };

  return (
    <Fragment>
      <ol className="progress-bar progress-bar--icon">{renderMenuItems()}</ol>
    </Fragment>
  );
};

export default ProgressBar;
