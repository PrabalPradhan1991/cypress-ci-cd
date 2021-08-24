import Button, { LoadingButton, ButtonGroup } from "@atlaskit/button";
import ChevronLeftLargeIcon from "@atlaskit/icon/glyph/chevron-left-large";

import React, { useState } from "react";
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  HelperMessage,
} from "@atlaskit/form";
import styled from "styled-components";
import TextField from "@atlaskit/textfield";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import * as emailService from "services/email.service";
import {
  confirmEmail,
  ConfirmEmailActionArgs,
} from "store/actions/confirmEmailActions";
import { ConfirmEmailStoreState } from "store/reducers/confirmEmailReducer";
import { createProjectOnboardingGoPrev } from "store/actions/createProjectOnboardingAction";

const ConfirmEmailForm: React.FC = () => {
  const confirmEmailState: ConfirmEmailStoreState = useSelector(
    (state: any) => state?.confirmEmail
  );
  const mailToken: string = useSelector(
    (state: any) => state?.createProject?.project?.mailToken
  );
  const locale = useSelector((state: any) => state?.locale);

  const dispatch = useDispatch();

  const handleSubmit = (data: emailService.eMailData) => {
    const args: ConfirmEmailActionArgs = {
      mailToken: mailToken,
      mailCode: data?.mailCode,
    };
    dispatch(confirmEmail(args));
    return;
  };
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [showResendInfo, setshowResendInfo] = useState(false);

  const projectId = useSelector(
    (state: any) => state?.createProject?.project?.id
  );

  const resendCodeHandler = async () => {
    setIsResendLoading(true);
    try {
      await emailService?.resendConfirmation(projectId);
      setshowResendInfo(true);
    } catch (err) {
      setshowResendInfo(false);
    }

    setIsResendLoading(false);
  };

  const goBack = () => {
    dispatch(createProjectOnboardingGoPrev());
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            {/* <Fragment>{this.props.hasErrored && <h1></h1>}</Fragment> */}
            <Field
              name="mailCode"
              label={locale?.strings?.confirmation_code}
              isRequired
              defaultValue=""
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField autoComplete="off" {...fieldProps} />
                  {confirmEmailState?.error && (
                    <ErrorMessage>{confirmEmailState?.error}</ErrorMessage>
                  )}
                  <HelperMessage>
                    {locale?.strings?.confimation_email_text}
                  </HelperMessage>
                </Fragment>
              )}
            </Field>

            <ResendDiv>
              <ResendBlock>
                <HelperMessage>
                  {locale?.strings?.email_not_received}
                </HelperMessage>
                <LoadingButton
                  className="link-btn"
                  appearance="link"
                  spacing="none"
                  isLoading={isResendLoading}
                  onClick={resendCodeHandler}
                >
                  {locale?.strings?.resend_confirmation_code}
                </LoadingButton>
              </ResendBlock>

              {showResendInfo && !isResendLoading && (
                <HelperMessage>
                  {locale?.strings?.resend_confirmation_code_info}
                </HelperMessage>
              )}
            </ResendDiv>
            <FormFooter>
              <ButtonGroup>
                <Button
                  iconBefore={<ChevronLeftLargeIcon label="ChevronLeft icon" />}
                  onClick={goBack}
                >
                  {locale?.strings?.back}
                </Button>
                <LoadingButton
                  isDisabled={confirmEmailState?.isLoading}
                  isLoading={confirmEmailState?.isLoading}
                  appearance="primary"
                  type="submit"
                >
                  {locale?.strings?.confirm_email}
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
};

const ResendBlock = styled.div`
  display: flex;
  align-items: center;

  .link-btn {
    margin-top: 4px;
    padding-left: 8px;
    font-size: 13px;
    text-decoration: underline;
  }
`;
const ResendDiv = styled.div`
  margin: 0.6rem 0 4rem;
`;

export default withRouter(ConfirmEmailForm);
