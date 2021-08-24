import React, {Fragment} from "react";
import {LoadingButton, ButtonGroup} from "@atlaskit/button";
import TextField from "@atlaskit/textfield";

import Form, {
  Field,
  ErrorMessage,
  FormFooter,
  HelperMessage,
} from "@atlaskit/form";

import * as projectService from "services/project.service";
import {
  createProject,
  CreateProjectActionArgs,
} from "store/actions/createProjectActions";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {CreateProjectStoreState} from "store/reducers/createProjectReducer";

const ProjectForm: React.FC = () => {
  const createProjectState: CreateProjectStoreState = useSelector(
    (state: any) => state?.createProject
  );
  const dispatch = useDispatch();
  const locale = useSelector((state: any) => state?.locale);

  const handleSubmit = (data: projectService.ProjectData) => {
    const args: CreateProjectActionArgs = {
      companyName: data.companyName.trim(),
      projectName: data.projectName.trim(),
      username: data.username.trim(),
      email: data.email.trim(),
    };
    dispatch(createProject(args));
    return;
  };

  return (
    <Form onSubmit={handleSubmit}>
      {({formProps, submitting}) => (
        <form {...formProps}>
          <Field
            name="projectName"
            label={locale?.strings?.project_name}
            isRequired
            validate={(value) =>
              value && value.length < 4
                ? locale?.strings?.validation_too_short
                : undefined
            }
            defaultValue={createProjectState?.project?.projectName}
          >
            {({fieldProps, error}) => (
              <Fragment>
                <TextField autoComplete="off" {...fieldProps} />
                <HelperMessage>
                  {locale?.strings?.validation_min_characters}
                </HelperMessage>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </Fragment>
            )}
          </Field>
          <Field
            name="companyName"
            label={locale?.strings?.organization_name}
            isRequired
            validate={(value) =>
              value && /^[A-Za-z0-9_äÄöÖüÜß]/.test(value) !== true
                ? locale?.strings?.validation_no_special_characters
                : value && value.length < 4
                ? locale?.strings?.validation_too_short
                : undefined
            }
            defaultValue={createProjectState?.project?.companyName}
          >
            {({fieldProps, error}) => (
              <Fragment>
                <TextField autoComplete="off" {...fieldProps} />
                <HelperMessage>
                  {locale?.strings?.validation_min_characters}
                </HelperMessage>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </Fragment>
            )}
          </Field>
          <Field
            name="username"
            label={locale?.strings?.project_manager}
            isRequired
            validate={(value) =>
              value && value.length < 4
                ? locale?.strings?.validation_too_short
                : value && /^\S.*/.test(value) !== true
                ? locale?.strings?.validation_no_space
                : undefined
            }
            defaultValue={createProjectState?.project?.username}
          >
            {({fieldProps, error}) => (
              <Fragment>
                <TextField autoComplete="off" {...fieldProps} />
                <HelperMessage>
                  {locale?.strings?.name_and_surname_add_later}
                </HelperMessage>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </Fragment>
            )}
          </Field>
          <Field
            name="email"
            label={locale?.strings?.email_address}
            defaultValue={createProjectState?.project?.email}
            isRequired
            validate={(value) =>
              value &&
              //FIXME: Validator in Funktion auslagern --> No-useless-escape
              // RegEx from -> https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                value
              ) !== true
                ? locale?.strings?.validation_email
                : undefined
            }
          >
            {({fieldProps, error}) => (
              <Fragment>
                <TextField {...fieldProps} />
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </Fragment>
            )}
          </Field>
          <FormFooter>
            <ButtonGroup>
              <LoadingButton
                isDisabled={createProjectState?.isLoading}
                appearance="primary"
                type="submit"
                isLoading={createProjectState?.isLoading}
              >
                {locale?.strings?.create_project}
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};

export default withRouter(ProjectForm);
