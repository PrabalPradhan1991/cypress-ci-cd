import {ErrorMessage, HelperMessage} from "@atlaskit/form";
import {default as ModalDialog, ModalFooter} from "@atlaskit/modal-dialog";
import Textfield from "@atlaskit/textfield";
import Toggle from "@atlaskit/toggle";
import DynamicTable from "@atlaskit/dynamic-table";
import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@atlaskit/button";
import {UserInfo} from "services/user.service";
import {initialStoreInterface} from "store";
import * as ProjectActions from "store/actions/projectActions";
import "./TeamMemberEditModal.scss";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface UserState {
  username: string;
  role: string;
}

interface UserStateError {
  username: undefined | string;
  role: undefined | string;
}

interface TeamMemberUpdateModalProps {
  close: () => void;
  onFormSubmit: (values: any) => Promise<void>;
  userInfo: UserInfo;
  edit: boolean;
  handleDelete?: () => void;
}

export const TeamMemberUpdateModal: React.FC<TeamMemberUpdateModalProps> = (
  props
) => {
  const {close, onFormSubmit, userInfo, edit, handleDelete} = props;

  const [userDetails, setUserDetails] = useState<UserState>(() => {
    return {username: userInfo?.username, role: userInfo?.role};
  });
  const [error, setError] = useState<UserStateError>(() => {
    return {username: undefined, role: undefined};
  });

  const locale = useSelector((state: initialStoreInterface) => state?.locale);
  const projectId = useSelector(
    (state: initialStoreInterface) => state?.project?.project?.id
  );

  const projectLink = useSelector(
    (state: initialStoreInterface) => state?.project?.project?.projectLink?.link
  );

  const sprintCapacityPreference = useSelector(
    (state: initialStoreInterface) => state?.project?.project?.users
  ).find((user) => user?.user?.id === userInfo?.userId)?.slot2sprints;

  const dispatch = useDispatch();

  const handleCapacityPreferenceToggle = (sprintId: number, prev: boolean) => {
    dispatch(
      ProjectActions.updateProjectCalculationPreferences({
        projectId,
        projectLink,
        sprintId,
        userId: userInfo?.userId,
        relevant: !prev,
      })
    );
  };

  const validationRule: Record<string, Function> = {
    username: (value: string): string | undefined =>
      value && value.length < 3
        ? locale?.strings?.validation_too_short
        : value && /^\S.*/.test(value) !== true
        ? locale?.strings?.validation_no_space
        : value && value.length > 20
        ? locale?.strings?.validation_max_20
        : undefined,
    role: (value: string): string | undefined =>
      value && value.length < 4
        ? locale?.strings?.validation_too_short
        : value && /^\S.*/.test(value) !== true
        ? locale?.strings?.validation_no_space
        : value && value.length > 20
        ? locale?.strings?.validation_max_20
        : undefined,
  };

  const validate = (name: string, value: string): string | undefined => {
    return validationRule[name](value);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prevState: UserState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });

    setError((prevState: UserStateError) => {
      return {
        ...prevState,
        [e.target.name]: validate(e.target.name, e.target.value),
      };
    });
  };

  const saveUserInformation = async () => {
    if (error?.username || error?.role) return;
    await onFormSubmit(userDetails);
  };

  const tableRows = sprintCapacityPreference?.map((item, index) => {
    const isChecked =
      !item?.capacontribution || item?.capacontribution?.relevant;
    return {
      key: `row${index}-${item.id}`,
      cells: [
        {
          key: `col1-${item?.sprint?.id}`,
          content: `Sprint${index + 1}`,
        },
        {
          key: `col2-${item?.sprint?.id}`,
          content: (
            <Toggle
              id={`toggle-${item?.sprint?.id}`}
              isChecked={isChecked}
              onChange={() =>
                handleCapacityPreferenceToggle(item?.sprint?.id, isChecked)
              }
            />
          ),
        },
      ],
    };
  });

  return (
    <ModalDialog heading={locale?.strings?.edit_team_member} onClose={close}>
      <div className="form">
        <div className="form-field">
          <label>
            {locale?.strings?.username} <span>*</span>
          </label>
          <Textfield
            name="username"
            className={error?.username ? "error" : ""}
            value={userDetails?.username}
            onChange={onChangeHandler}
            onBlur={saveUserInformation}
          />
          <HelperMessage>
            {locale?.strings?.validation_all_characters.replace(":num", "3")}
          </HelperMessage>
          {error?.username && <ErrorMessage>{error.username}</ErrorMessage>}
        </div>
        <div className="form-field">
          <label>
            {locale?.strings?.role_position} <span>*</span>
          </label>
          <Textfield
            name="role"
            className={error?.role ? "error" : ""}
            value={userDetails?.role}
            onChange={onChangeHandler}
            onBlur={saveUserInformation}
          />
          <HelperMessage>
            {locale?.strings?.validation_all_characters.replace(":num", "4")}
          </HelperMessage>
          {error?.role && <ErrorMessage>{error.role}</ErrorMessage>}
        </div>
        <div className="form-table">
          <DynamicTable
            head={{
              cells: [
                {key: "head_title1", content: "Sprint"},
                {key: "head_title2", content: "Capacity"},
              ],
            }}
            rows={tableRows}
            rowsPerPage={5}
            defaultPage={1}
            loadingSpinnerSize="large"
            isLoading={false}
            isFixedSize
          />
        </div>

        <div className="form-footer">
          <Button className="delete-link" spacing="none" onClick={handleDelete}>
            {locale?.strings?.delete}
          </Button>
          <div className="form-btn-group">
            {edit && <Button onClick={close}>{locale?.strings?.close}</Button>}
          </div>
        </div>
      </div>
    </ModalDialog>
  );
};

export default TeamMemberUpdateModal;
