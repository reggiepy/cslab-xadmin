import React from "react";

import {
  Button, Spin,
  DropdownMenuItem,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "xui";
import { app, use } from "xadmin";

import { Icon } from "xadmin-ui";

const BatchDeleteBtn = (props) => {
  const { _t } = app.context;
  const [show, setShow] = React.useState(false);
  const { canDelete, loading, onBatchDelete } = use("actons.batch_delete");
  const { selected } = use("model.select");
  const { model } = use("model");

  const onClose = () => {
    setShow(false);
  };

  const renderModel = () => {
    return (
      <Dialog
        key="actions_batch_delete_modal"
        open={show}
        onOpenChange={setShow}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{_t("Confirm to delete selected items")}</DialogTitle>
          </DialogHeader>
          <div className="divide-y flex flex-col">
            {selected.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-3"
              >
                <Icon name={model.icon} className="mr-2" />
                <span>{model.display ? model.display(item) : item.name}</span>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              {_t("Cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => onBatchDelete().then(onClose)}
              disabled={loading}
            >
              {loading && <Spin /> }{_t("Delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return canDelete
    ? [
        <DropdownMenuItem
          {...props}
          key={"actions_batch_delete"}
          onClick={(e) => {
            props.onClick && props.onClick(e);
            setShow(true);
          }}
          disabled={selected.length == 0}
        >
          {_t("Batch Delete Items")}
        </DropdownMenuItem>,
        selected.length > 0 ? renderModel() : null,
      ]
    : null;
};

export default BatchDeleteBtn;
