import React, { Fragment } from "react";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import GlobalErrorModel from "models/GlobalErrorModel";
import { useSelector, useDispatch } from "react-redux";
import { globalErrorWasThrown } from "store/actions/globalErrorActions";

export const GlobalErrorWarning: React.FC<{}> = () => {
  const globalError: GlobalErrorModel = useSelector(
    (state: any) => state.globalError.error
  );

  const dispatch = useDispatch();

  const close = (): void => {
    dispatch(globalErrorWasThrown(null));
  };

  const actions = [{ text: "schließen", onClick: close }];

  return (
    <Fragment>
      {globalError === null ? (
        true
      ) : (
        <div>
          <ModalTransition>
            {globalError && (
              <Modal
                actions={actions}
                onClose={close}
                heading="Error"
                appearance="warning"
              >
                {globalError}
              </Modal>
            )}
          </ModalTransition>
        </div>
      )}
    </Fragment>
  );
};
