import React, { useState } from "react";
import { Divider, CardHeader, Button, CardContent } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CustomerDocumentTable from "./CustomerDocumentTable";
import FormDrawer from "../../../containers/FormDrawer/FormDrawer";
import CustomerDocumentForm from "./CustomerDocumentForm";

export interface CustomerDocumentListProps {}
const CustomerDocumentList = (props: CustomerDocumentListProps) => {
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
        <CustomerDocumentTable />
      </CardContent>
      {isOpen && (
        <FormDrawer
          title={`${!formData ? "Add" : "Edit"} Document`}
          desc={`${!formData ? "Add" : "Edit"} document desc`}
          closeDrawer={() => toggleDrawer(false)}
        >
          <CustomerDocumentForm closeDrawer={() => toggleDrawer(false)} />
        </FormDrawer>
      )}
    </>
  );
};
export default CustomerDocumentList;
