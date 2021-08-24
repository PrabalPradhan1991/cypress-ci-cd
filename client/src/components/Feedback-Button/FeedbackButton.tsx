import Button from "@atlaskit/button";
import Form, { Field } from "@atlaskit/form";
import EditorFeedbackIcon from "@atlaskit/icon/glyph/editor/feedback";
import {
  default as ModalDialog,
  ModalFooter,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import TextArea from "@atlaskit/textarea";
//FIXME: Import error
import Textfield from "@atlaskit/textfield";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as FeedbackService from "services/feedback.service";
import "./FeedbackButton.scss";

export interface FormData {
  userEmail: string;
  text: string;
}

export const FeedbackButton: React.FC = () => {
  const projectLinks = useSelector(
    (state: any) => state.project.project.projectLinks
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);
  const onFormSubmit = (data: FormData) => {
    const args: FeedbackService.postFeedbackArgs = {
      body: data,
      projectLink: projectLinks[0].link,
    };

    FeedbackService.postFeedback(args);
    setIsOpen(false);
  };

  const footer = () => (
    <ModalFooter>
      <span />
      <Button appearance="primary" type="submit">
        senden
      </Button>
    </ModalFooter>
  );
  return (
    <div>
      <div className="feedback">
        <div className="feedback-container">
          <div className="feedback-container-button" onClick={() => open()}>
            <p>Feedback </p>
            <EditorFeedbackIcon label="" size="medium"></EditorFeedbackIcon>
          </div>
        </div>
      </div>

      <ModalTransition>
        {/* Modal to create a User */}

        {isOpen ? (
          <ModalDialog
            heading="Du hast Feedback?"
            onClose={close}
            components={{
              Container: ({ children, className }) => (
                <Form onSubmit={onFormSubmit}>
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
              label="Deine Kontakt E-mail"
              name="userEmail"
              defaultValue=""
              isRequired
            >
              {({ fieldProps }) => <Textfield {...fieldProps} />}
            </Field>
            <Field<string, HTMLTextAreaElement>
              name="text"
              defaultValue=""
              label="Wie können wir uns verbessern."
              isRequired
            >
              {({ fieldProps }) => <TextArea {...fieldProps} />}
            </Field>
          </ModalDialog>
        ) : (
          isOpen
        )}
      </ModalTransition>
    </div>
  );
};
