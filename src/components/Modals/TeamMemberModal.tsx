import Form, { ErrorMessage, Field, HelperMessage } from "@atlaskit/form";
import { default as ModalDialog, ModalFooter } from "@atlaskit/modal-dialog";
import Textfield from "@atlaskit/textfield";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingButton } from "@atlaskit/button";
import { UserInfo } from "services/user.service";
import { initialStoreInterface } from "store";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TeamMemberModalProps {
  close: () => void;
  onFormSubmit: (values: any) => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = (props) => {
  const { close, onFormSubmit } = props;
  const locale = useSelector((state: initialStoreInterface) => state?.locale);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    await onFormSubmit(values);
    setIsLoading(false);
  };

  const footer = () => (
    <ModalFooter>
      <span />
      <LoadingButton appearance="primary" type="submit" isLoading={isLoading}>
        {locale?.strings?.create}
      </LoadingButton>
    </ModalFooter>
  );

  return (
    <ModalDialog
      heading={locale?.strings?.create_team_member}
      onClose={close}
      components={{
        Container: ({ children, className }: ContainerProps) => (
          <Form onSubmit={onSubmit}>
            {({ formProps }) => (
              <form {...formProps} className={className}>
                {children}
              </form>
            )}
          </Form>
        ),
        Footer: footer,
      }}
    >
      <Field
        isRequired
        label={locale?.strings?.username}
        name="username"
        validate={(value) =>
          value && value.length < 3
            ? locale?.strings?.validation_too_short
            : value && /^\S.*/.test(value) !== true
            ? locale?.strings?.validation_no_space
            : value && value.length > 20
            ? locale?.strings?.validation_max_20
            : undefined
        }
      >
        {({ fieldProps, error }) => (
          <Fragment>
            <Textfield {...fieldProps} />
            <HelperMessage>
              {locale?.strings?.validation_all_characters.replace(":num", "3")}
            </HelperMessage>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Fragment>
        )}
      </Field>
      <Field
        label={locale?.strings?.role_position}
        name="role"
        isRequired
        validate={(value) =>
          value && value.length < 4
            ? locale?.strings?.validation_too_short
            : value && /^\S.*/.test(value) !== true
            ? locale?.strings?.validation_no_space
            : value && value.length > 20
            ? locale?.strings?.validation_max_20
            : undefined
        }
      >
        {({ fieldProps, error }) => (
          <Fragment>
            <Textfield {...fieldProps} />
            <HelperMessage>
              {locale?.strings?.validation_all_characters.replace(":num", "4")}
            </HelperMessage>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Fragment>
        )}
      </Field>
    </ModalDialog>
  );
};

export default TeamMemberModal;
