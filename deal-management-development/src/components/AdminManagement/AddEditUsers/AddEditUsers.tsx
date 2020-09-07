import React, { useState } from "react";
import { Card, CardHeader, Button, CardContent } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import UsersTable from "./UsersTable";
import FormDrawer from "../../../containers/FormDrawer/FormDrawer";
import AddEditUsersForm from "./AddEditUsersForm";
const AddEditUsers = () => {
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
    <div className="tab-box">
      <Card>
        <CardHeader
          //title="Add Users"
          //subheader="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quasi similique natus aspernatur eaque nobis temporibus dolores, illum deleniti quo consequuntur nemo, commodi reiciendis? Debitis, optio? Cumque tempora aliquam odio!"
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
          <UsersTable openDrawer={drawerOpen} />
        </CardContent>
      </Card>
      {isOpen && (
        <FormDrawer
          title={`${!formData ? "Add" : "Edit"} Users`}
          desc={`${!formData ? "Add" : "Edit"} users desc`}
          closeDrawer={() => toggleDrawer(false)}
        >
          <AddEditUsersForm
            formData={formData}
            closeDrawer={() => toggleDrawer(false)}
          />
        </FormDrawer>
      )}
    </div>
  );
};

export default AddEditUsers;
