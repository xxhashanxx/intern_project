import React, { useState } from "react";
import TrusteeContactTable from "./TrusteeContactTable";
import { Button, CardContent, CardHeader, Divider } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FormDrawer from "../../../../containers/FormDrawer/FormDrawer";
import TrusteeContactForm from "./TrusteeContactForm";

export interface TrusteeContactListProps {}
const TrusteeContactList = (props: TrusteeContactListProps) => {
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
        <TrusteeContactTable openDrawer={drawerOpen} />
      </CardContent>

      {isOpen && (
        <FormDrawer
          title={`${!formData ? "Add" : "Edit"} Contact`}
          desc={`${!formData ? "Add" : "Edit"} contact desc`}
          closeDrawer={() => toggleDrawer(false)}
        >
          <TrusteeContactForm
            formData={formData}
            closeDrawer={() => toggleDrawer(false)}
          />
        </FormDrawer>
      )}
    </>
  );
};
export default TrusteeContactList;
