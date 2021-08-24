import Button from "@atlaskit/button";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {localeUpdate} from "store/actions/localeActions";
import "./Navbar.scss";
import Select from "@atlaskit/select";

const LANGUAGE_OPTIONS = [
  {label: "de", value: "de"},
  {label: "en", value: "en"},
];

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const locale = useSelector((state: any) => state?.locale);

  const changeLanguageHandler = (value: any) => {
    dispatch(localeUpdate(value?.value));
  };

  const newValue = LANGUAGE_OPTIONS?.find?.(
    (el: any) => el?.value === locale?.language
  );

  return (
    <div className="container-navbar">
      <h2 className="container-navbar__logo">capa.team</h2>
      <div className="container-navbar__right">
        <div className="container-navbar__item">
          <Select
            className="single-select"
            onChange={changeLanguageHandler}
            classNamePrefix="react-select"
            options={LANGUAGE_OPTIONS}
            value={newValue}
          />
        </div>
        <div className="container-navbar__item">
          <Button appearance="primary" href="/create-project">
            {locale?.strings?.new_project}
          </Button>
        </div>
      </div>
    </div>
  );
};
