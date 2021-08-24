import { default as Modal, ModalTransition } from "@atlaskit/modal-dialog";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User2projects } from "models/ProjectModel";
import * as Project from "store/actions/projectActions";
import "./NewUser.scss";
import AddIcon from "@atlaskit/icon/glyph/add";
import TeamMemberModal from "components/Modals/TeamMemberModal";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface NewUserProps {
  projectId: number;
  projectLink: string;
  // setProject: (args: SetProjectActionArgs) => void;
}

export interface FormData {
  username: string;
  role: string;
}

export const NewUser: React.FC<NewUserProps> = (props) => {
  //=====
  const users: User2projects[] = useSelector(
    (state: any) => state.project.project.users
  );
  const locale = useSelector((state: any) => state?.locale);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [maxUsers, setMaxUsers] = useState<boolean>(false);

  const open = () => {
    //FIXME: hardcoded user limitation
    userCount() >= 10 && setMaxUsers(true);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);
  const onFormSubmit = (data: FormData) => {
    let postData: Project.AddUserActionArgs = {
      userData: {
        projectId: props.projectId,
        projectLink: props.projectLink,
        username: data.username,
        role: data.role,
      },
    };
    // FIXME: Cant perfrom async awaits in cc of React --> No Solution yet
    // Workaround -> Action from redux
    // this.props.updateProject(UserService.postUser(postData));
    dispatch(Project.addUser(postData));

    setIsOpen(false);
  };

  const userCount = (): number => {
    let counter: number = 0;
    for (let user of users) {
      if (user.role.type === "user") {
        counter++;
      }
    }
    return counter;
  };

  return (
    <div>
      <div className="container-user">
        <div className="container-user-button" onClick={open}>
          <AddIcon label="" size="small"></AddIcon>
        </div>
      </div>

      <ModalTransition>
        {/* Modal to create a User */}

        {isOpen && !maxUsers ? (
          <TeamMemberModal close={close} onFormSubmit={onFormSubmit} />
        ) : (
          //Modal if the maximum User Limit is reached

          isOpen && (
            <Modal
              actions={[{ text: "schließen", onClick: close }]}
              onClose={close}
              heading="Userlimit erreicht"
              appearance="warning"
            >
              {locale?.strings?.validation_max_users}
            </Modal>
          )
        )}
      </ModalTransition>
    </div>
  );
};
