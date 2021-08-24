import EditFilledIcon from "@atlaskit/icon/glyph/edit-filled";
import {default as Modal, ModalTransition} from "@atlaskit/modal-dialog";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./Avatar.scss";
import {
  projectIsLoading,
  getProject,
  GetProjectActionArgs,
  editUser,
} from "store/actions/projectActions";
import TeamMemberEditModal from "components/Modals/TeamMemberEditModal";
import {UserInfo} from "services/user.service";

export interface AvatarProps {
  handleDelete: Function;
  userInfo: UserInfo;
  isUserDeleted: boolean; // use this to faint or disable the ui for deleted user
}
const colors: string[] = ["red", "yellow", "green", "blue"];

const Avatar: React.FC<AvatarProps> = (props) => {
  const {userInfo} = props;

  const dispatch = useDispatch();

  const projectLink = useSelector(
    (state: any) => state.project.project.projectLink
  );

  const locale = useSelector((state: any) => state?.locale);

  const projectId = useSelector((state: any) => state.project.project.id);

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const [colorClass, setColorClass] = useState<string>("");

  const nameToInitials = (name: string): string => {
    const splittedName: string[] = name.trim().split(" ");
    let initials: string = splittedName[0][0];
    splittedName.length > 1 &&
      (initials += splittedName[splittedName.length - 1][0]);
    try {
      initials = initials.trim().toUpperCase();
    } catch (err) {}
    return initials;
  };

  const getRandomColorClass = (isDeleted: boolean = false): string => {
    if (isDeleted) {
      return "deleted";
    }
    const randomindex: number = Math.round(Math.random() * (colors.length - 1));
    return colors[randomindex];
  };

  const openDelete = () => {
    if (projectLink.type === "admin") {
      setIsDeleteOpen(true);
    }
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  const openEdit = () => {
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  const editClick = async (data: UserInfo) => {
    const submitData = {...userInfo, ...data};
    try {
      const action = await editUser(submitData);
      dispatch(action);
    } catch (err) {
      return err;
    }
  };

  const handleDelete = async () => {
    // alert("Delete User");
    dispatch(projectIsLoading(true));
    await props.handleDelete();

    closeDelete();
    dispatch(
      getProject({
        projectLink: projectLink.link,
        projectId: projectId,
      } as GetProjectActionArgs)
    );
  };

  const actions = [
    {
      text: locale?.strings?.delete,
      onClick: handleDelete,
    },
    {
      text: locale?.strings?.cancel,
      onClick: closeDelete,
    },
  ];

  //Enables styles for the user deletion functionality
  const getUserTypeClass = (): string => {
    if (projectLink.type === "admin") {
      return "-admin";
    }
    return "-user";
  };

  useEffect(() => {
    setColorClass(getRandomColorClass(props.isUserDeleted));
  }, []);

  return (
    <Fragment>
      <div className={"avatarContainer" + getUserTypeClass()}>
        {projectLink.type === "admin" && !props.isUserDeleted && (
          <div className="editUser" onClick={openEdit}>
            <EditFilledIcon
              label={"EditFilledIcon"}
              size={"small"}
            ></EditFilledIcon>
          </div>
        )}
        <div className={"avatar " + colorClass}>
          <p>{nameToInitials(userInfo?.username)}</p>
        </div>
      </div>

      <ModalTransition>
        {/* Modal to create a User */}

        {isEditOpen && (
          <TeamMemberEditModal
            close={closeEdit}
            edit={true}
            handleDelete={openDelete}
            userInfo={userInfo}
            onFormSubmit={editClick}
          />
        )}
      </ModalTransition>

      <ModalTransition>
        {isDeleteOpen && (
          <Modal
            actions={actions}
            onClose={closeDelete}
            heading={locale?.strings?.delete_user}
            appearance="danger"
          >
            {locale?.strings?.delete_user_warning}
          </Modal>
        )}
      </ModalTransition>
    </Fragment>
  );
};

export default Avatar;
