import React, { useState } from "react";
import Page from "../containers/Page/Page";
import { Container, Grid, Card, CardContent } from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";
import CustomerCreateEditForm from "../components/Customer/CustomerCreateEditForm";
import CustomerContactList from "../components/Customer/CustomerContact/CustomerContactList";
import CustomerDocumentList from "../components/Customer/CustomerDocument/CustomerDocumentList";
import { useStoreActions } from "../store";

import useCustomerService from "../api/customer/useCustomerService";
import { useQuery } from "react-query";

export interface CustomerCreateEditPageProps {}
const CustomerCreateEditPage = (props: CustomerCreateEditPageProps) => {
  let { editId } = useParams();
  const history = useHistory();
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const updateCustomerId = useStoreActions(
    (actions) => actions.customer.updateCustomerId
  );

  const {
    status: customerIdStatus,
    data: customerIdData,
    error: customerIdError,
  } = useQuery("customerNextId", useCustomerService().useGetCustomerGetNextIdService);

  let customerId = "";
  if (editId) {
    customerId = editId;
  } else {
    if ( 
      customerIdStatus === "success" &&
      customerIdData &&
      customerIdData.data
    ) {
      customerId = customerIdData.data.customer_id;
    }
  }
  updateCustomerId(customerId); //todo error in console
  const onFormSubmitted = () => {
    setFormSubmitted(true);
    history.push("/customer/edit/" + customerId);
  };

  return (
    <Page title="Investor">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              {/* <CardHeader
                title={editId ? "Edit Customer" : "Add Customer"}
                subheader="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quasi similique natus aspernatur eaque nobis temporibus dolores, illum deleniti quo consequuntur nemo, commodi reiciendis? Debitis, optio? Cumque tempora aliquam odio!"
                action={
                  <div className="btn-grid">
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<ArrowBackIosIcon />}
                      onClick={() => history.push("/customer/customer-list")}
                    >
                      Back to list
                    </Button>
                  </div>
                }
              /> */}
              <CardContent className="p-0">
                <CustomerCreateEditForm formSubmitted={onFormSubmitted} />
                <div id="customerBottomForms">
                  {editId || isFormSubmitted ? (
                    <>
                      <CustomerContactList />
                      <CustomerDocumentList />
                    </>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default CustomerCreateEditPage;
