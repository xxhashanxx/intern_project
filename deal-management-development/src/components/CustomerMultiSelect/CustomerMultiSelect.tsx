import React from "react";
import { useQuery } from "react-query";
import useCustomerService from "../../api/customer/useCustomerService";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useField } from "react-final-form";
import { useFilterRows } from "../TableViewComponents/useFilterData";


function filterData(tableData: CustomerMultiSelectProps[], searchText: string = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.name &&
      dataObj.name.toLowerCase().startsWith(searchText)
  );
}


export interface CustomerMultiSelectProps {
  name: string;
}

const emptyArray: any[] = [];
const CustomerMultiSelect = (
  props: CustomerMultiSelectProps) => {
    const { status, data } = useQuery("DefaultValueList", useCustomerService().useGetCustomerListService);
    const { pageData} = useFilterRows(
      "",
      data,
      filterData
  );
  const { input } = useField(props.name, { initialValue: emptyArray });
  
  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      className="standard-select"
    >
      <InputLabel className="standard-select-label" htmlFor="customer_key">
        Customer
      </InputLabel>
      
      <Select native {...input} required labelId="customer_name" >
      
        {status === "success" &&
          pageData &&
          pageData.map((customerData: any ) => (
            
            <option  value={customerData.customer_id}>
              {customerData.customer_name}
            </option>
          ))}
          <option value="temp" hidden></option>
      </Select>
      
    </FormControl>
  );
};
export default CustomerMultiSelect;
