import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteAllUsers, deleteUser } from "@/modules/user";
import { later } from "@/modules/utils";

const UserDelete = ({
  callBack = () => {},
  doRedirect = false,
  flagLabel = false,
  id,
  label = "",
}) => {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  let navigate = useNavigate();

  const toggleOpen = () => setOpen(!isOpen);

  const doDelete = () => {
    if (id) {
      deleteUser(id);
    } else {
      deleteAllUsers();
    }
    setLoading(true);

    later(1500).finally(() => {
      toggleOpen(false);
      setLoading(false);
      if (doRedirect) {
        navigate("/users");
      }
      callBack();
    });
  };

  return (
    <>
      <Button
        color="danger"
        disabled={isLoading}
        onClick={toggleOpen}
        outline
        size="sm"
        type="button"
      >
        <i className="fa fa-trash" />
        {(flagLabel || label) && (
          <span className="ms-2">{label || "Delete"}</span>
        )}
      </Button>
      <Modal isOpen={isOpen} toggle={toggleOpen}>
        <ModalHeader toggle={toggleOpen}>
          Are you sure you want to delete?
        </ModalHeader>
        <ModalBody>
          This will delete the selected data and you won't be able to revert
          this change back.
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            disabled={isLoading}
            onClick={doDelete}
            style={{ minWidth: 100 }}
          >
            {isLoading ? (
              <i
                className="fa fa-circle-notch fa-spin"
                aria-hidden="true"
                style={{ height: 16, width: 16 }}
              />
            ) : (
              "Confirm"
            )}
          </Button>
          <Button color="secondary" onClick={toggleOpen}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserDelete;
