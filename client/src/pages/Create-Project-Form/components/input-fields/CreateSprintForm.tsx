import React, { Fragment } from "react";
import Button, { LoadingButton, ButtonGroup } from "@atlaskit/button";
import ChevronLeftLargeIcon from "@atlaskit/icon/glyph/chevron-left-large";
import { DatePicker } from "@atlaskit/datetime-picker";
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  HelperMessage,
} from "@atlaskit/form";
import Select from "@atlaskit/select";
import { ValidationState } from "@atlaskit/select/types";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import * as sprintService from "services/sprint.service";
import {
  createSprint,
  CreateSprintActionArgs,
} from "store/actions/createSprintActions";
import { CreateProjectStoreState } from "store/reducers/createProjectReducer";
import { CreateSprintStoreState } from "store/reducers/createSprintReducer";
import { createProjectOnboardingGoPrev } from "store/actions/createProjectOnboardingAction";

const validate = (value: any) => (!value ? "EMPTY" : undefined);

const getValidationState = (error: any, valid: boolean): ValidationState => {
  if (!error && !valid) {
    return "default";
  }
  if (valid === true) {
    return "success";
  }
  return "error";
};

// const createSprint = async (data: sprintService.CreateSprintData) => {
//   sprintService.postData(data);
// };

const SprintForm: React.FC = () => {
  // const { createSprint, isLoading, projectId, mailToken } = props;

  const createSprintState: CreateSprintStoreState = useSelector(
    (state: any) => state?.createSprint
  );

  const locale = useSelector((state: any) => state?.locale);

  const intervalTimes = [
    { label: "1 " + locale?.strings?.week, value: 1 },
    { label: "2 " + locale?.strings?.weeks, value: 2 },
    { label: "3 " + locale?.strings?.weeks, value: 3 },
    { label: "4 " + locale?.strings?.weeks, value: 4 },
  ];

  const createProjectState: CreateProjectStoreState = useSelector(
    (state: any) => state?.createProject
  );
  const dispatch = useDispatch();

  const handleSubmit = (data: sprintService.SprintData): void => {
    const args: CreateSprintActionArgs = {
      intervalTime: data.sprintInterval,
      sprintStartDate: data.sprintStart,
      projectId: createProjectState?.project?.id,
      mailToken: createProjectState?.project?.mailToken,
    };
    dispatch(createSprint(args));
    return;
  };

  const goBack = () => {
    dispatch(createProjectOnboardingGoPrev());
  };

  return (
    <Form onSubmit={handleSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <Field
            label={locale?.strings?.interval_length}
            name="sprintInterval"
            isRequired
            validate={validate}
          >
            {({ fieldProps, error, meta: { valid } }: any) => (
              <Fragment>
                <Select
                  {...fieldProps}
                  options={intervalTimes}
                  placeholder={locale?.strings?.interval_length}
                  validationState={getValidationState(error, valid)}
                />
                <HelperMessage>
                  {locale?.strings?.interval_length_info}
                </HelperMessage>
                {error === "EMPTY" && (
                  <ErrorMessage>
                    {locale?.strings?.validation_iteration_length}
                  </ErrorMessage>
                )}
              </Fragment>
            )}
          </Field>
          <Field
            label={locale?.strings?.sprint_start_date}
            name="sprintStart"
            isRequired
            validate={validate}
            defaultValue=""
          >
            {({ fieldProps, error }: any) => (
              <Fragment>
                <DatePicker id="datepicker-1" {...fieldProps} />
                <HelperMessage>
                  {locale?.strings?.sprint_start_day}
                </HelperMessage>
                {error === "EMPTY" && (
                  <ErrorMessage>
                    {locale?.strings?.validation_start_date}
                  </ErrorMessage>
                )}
              </Fragment>
            )}
          </Field>
          <FormFooter>
            <ButtonGroup>
              <Button
                iconBefore={<ChevronLeftLargeIcon label="ChevronLeft icon" />}
                onClick={goBack}
              >
                {locale?.strings?.back}
              </Button>
              <LoadingButton
                appearance="primary"
                type="submit"
                isLoading={createSprintState?.isLoading}
                isDisabled={createSprintState?.isLoading}
              >
                {locale?.strings?.create_sprint}
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};

export default withRouter(SprintForm);
