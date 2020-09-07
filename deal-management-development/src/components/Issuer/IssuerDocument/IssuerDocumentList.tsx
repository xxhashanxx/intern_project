import React, { useState } from "react";
import { Divider, CardHeader, Button, CardContent } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import IssuerDocumentTable from "./IssuerDocumentTable";
import FormDrawer from "../../../containers/FormDrawer/FormDrawer";
import IssuerDocumentForm from "./IssuerDocumentForm";

export interface IssuerDocumentListProps {}
const IssuerDocumentList = (props: IssuerDocumentListProps) => {
  const [isOpen, toggleDrawer] = useState(false);
  const [formData, setFromData] = useState(null);
  const drawerOpen = (formDataItem?: any) => {
    if (formDataItem) {
      setFromData(formDataItem);
    } else {
      setFromData(null);
    }

    toggleDrawer(true);
  };
  return (
    <>
      <Divider className="mt-5" />

      <CardHeader
        title="Document Attachment"
        action={
          <div className="btn-grid">
            <Button
              color="primary"
              variant="outlined"
              startIcon={<PersonAddIcon />}
              onClick={() => drawerOpen()}
            >
              Add
            </Button>
          </div>
        }
      />
      <CardContent className="p-0">
        <IssuerDocumentTable />
      </CardContent>
      {isOpen && (
        <FormDrawer
          title={`${!formData ? "Add" : "Edit"} Document`}
          desc={`${!formData ? "Add" : "Edit"} document desc`}
          closeDrawer={() => toggleDrawer(false)}
        >
          <IssuerDocumentForm closeDrawer={() => toggleDrawer(false)} />
        </FormDrawer>
      )}
    </>
  );
};
export default IssuerDocumentList;
