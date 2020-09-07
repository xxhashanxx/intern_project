import React, { useState } from "react";
import CustomerContactTable from "./CustomerContactTable";
import { Button, CardContent, CardHeader, Divider } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FormDrawer from "../../../containers/FormDrawer/FormDrawer";
import CustomerContactForm from "./CustomerContactForm";

export interface CustomerContactListProps {}
const CustomerContactList = (props: CustomerContactListProps) => {
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
      <Divider className="mt-3" />

      <CardHeader
        title="Contact Person"
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
        <CustomerContactTable openDrawer={drawerOpen} />
      </CardContent>

      {isOpen && (
        <FormDrawer
          title={`${!formData ? "Add" : "Edit"} Contact`}
          desc={`${!formData ? "Add" : "Edit"} contact desc`}
          closeDrawer={() => toggleDrawer(false)}
        >
          <CustomerContactForm
            formData={formData}
            closeDrawer={() => toggleDrawer(false)}
          />
        </FormDrawer>
      )}
    </>
  );
};
export default CustomerContactList;
