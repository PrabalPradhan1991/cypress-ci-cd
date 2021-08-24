import React from "react";
import "./userInfo.scss";
import Badge from "@atlaskit/badge";
import Avatar from "./avatar/Avatar";
import * as UserService from "services/user.service";
import {useSelector} from "react-redux";
import {User} from "models/ProjectModel";
export interface userInfoProps {
  user: User;
  projectLink: string;
  role: string;
}

//FIXME:
//Change size to 200 px

const UserInfo: React.FC<userInfoProps> = (props) => {
  const {user, projectLink, role} = props;

  const userInfo = {
    userId: user.id,
    username: user.username,
    role,
  };
  const locale = useSelector((state: any) => state?.locale);

  const handleDelete = async () => {
    let args: UserService.deleteUserArgs = {
      userId: user.id,
      projectLink: projectLink,
    };
    await UserService.deleteUser(args);
  };

  return (
    <div className="userInfo">
      <div className="userInfo__avatar">
        <Avatar
          handleDelete={handleDelete}
          userInfo={userInfo}
          isUserDeleted={Boolean(user.deletedDate)}
        ></Avatar>
        <div className="userInfo__avatar-badge">
          {Boolean(user.deletedDate) && <Badge>Inactive</Badge>}
        </div>
      </div>
      <div className="userInfo-username">
        <p>{user.username}</p>
      </div>
      <div className="userInfo-role">
        <p>{role}</p>
      </div>
      <div className="userInfo-container">
        <div className="userInfo-container__time">
          {locale?.strings?.morning}
        </div>
        <div className="userInfo-container__time">
          {locale?.strings?.evening}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
