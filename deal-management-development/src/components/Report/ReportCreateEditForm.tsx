import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Form as FinalForm, Field as FinalField} from "react-final-form";
import { Grid, Button, CircularProgress, InputLabel, LinearProgress, FormControl, Select, CardContent, Card, FormGroup, Container } from "@material-ui/core";
import FormItemLabel from "../FormItemLabel/FormItemLabel";
import { useQuery, useMutation } from "react-query";
import useCustomerService from "../../api/customer/useCustomerService";
import usePrintInvestmentsService from "../../../src/api/report/usePrintInvestmentsService";
import PrintIcon from "@material-ui/icons/Print";
import DatePickerInput from "../DatePickerInput/DatePickerInput";
import { ToastContainer ,toast} from "react-toastify";

export interface ReportCreateEditFormProps {
  formSubmitted: () => void;
}
const ReportCreateEditForm = (props: ReportCreateEditFormProps) => {

  const [selected, setSelected] = React.useState<number[]>([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const printInvestmentsService = usePrintInvestmentsService()
  const [mutatePrintInvestment,
    { status: printStatus, error: addEditError }] = useMutation(
    async (inputVal: any) => {
        
        return await printInvestmentsService.createReport(
          "",
          inputVal.selected,
          inputVal.file_name,

          inputVal.inputVal.customer_id,
          inputVal.selectedDate
        ); 
      },
      {
      onError: (e) => {
        toast.error(e.message);
      },
      }

  );
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };  
  const {
    status: customerStatus,
    data: customerData,
    error: customerError,
  } = useQuery("ReportCreate", useCustomerService().useGetCustomerListService);
  let formData = null;
  const formOnSubmit = (inputVal: any) => {
    mutatePrintInvestment(
      {
        selected:selected,
        file_name:"BalanceConfirmation",
        inputVal,
        selectedDate
      });
  };

  return (
    <>
      {customerStatus === "loading" && <LinearProgress />}
      {customerStatus === "error" && customerError && (
        <Alert severity="error">{customerError.message}</Alert>
       )}

     
      { <ToastContainer />}
      {customerStatus === "success" && (
      <div className="form-box-cont">
        <div className="form-box">
          <FinalForm
            
            keepDirtyOnReinitialize
            initialValues={formData}
            onSubmit={formOnSubmit}
            render={({ handleSubmit,submitting,pristine }) => (
              <form className="form" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                <Grid item xs={12} className="form-row mt-2">
                    <div className="btn-row flex-end">
                      
                      <div className="btn-grid">
                       <Button
                          variant="contained"
                          color="primary"
                          type={"submit"}
                          startIcon={
                            printStatus === "loading" ? (
                              <CircularProgress size={20} />
                            ) : (
                              <PrintIcon />
                            )
                          }
                          disabled={
                            printStatus === "loading" ||submitting || pristine
                          }
                            
                        >
                          {printStatus === "loading" ? "Printing" : "Print"}
                  
                        </Button>  
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} className="form-row">
                    <FormItemLabel
                      className="mb-0"
                      text="Genaral Information"
                      isLine
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="form-row">
                    <FinalField
                      name="customer_id"
                      render={({ input, meta }) => (
                        <>
                          <FormControl
                            variant="outlined"
                            size="small"
                            fullWidth
                            className="standard-select"
                          >
                            <InputLabel
                              htmlFor="customer_id"
                              className="standard-select-label"
                            >
                              Investor *
                            </InputLabel>
                            {customerStatus === "success" && (
                              <Select native {...input} required>
                                <option hidden>Select Investor </option>
                
                                {customerData &&
                                  customerData.map(
                                    (customerArray: any, key: string) => {
                                      return (
                                        
                                        <option
                                          value={customerArray.customer_id}
                                          key={key}
                                        >
                                          {customerArray.customer_name}
                                        </option>
                                      );
                                    }
                                  )}
                              </Select>
                            )}
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="form-row">
                    <DatePickerInput
                     label="Balance Date"
                     name="Balance_date"
                    selectedDate={selectedDate}
                     handleDateChange={handleDateChange}
                     required
                  />
                  </Grid>   
                </Grid>
              </form>
            )}
          />
        </div>
      </div>
      )}
    </>
  );
};
export default ReportCreateEditForm;
