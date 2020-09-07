import React from "react";
import { useQuery } from "react-query";
import useRMService from "../../api/userManagement/relationshipManager/useRMService";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useField } from "react-final-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export interface RelationshipManagerMultiSelectProps {
  name: string;
}

const emptyArray: any[] = [];
const RelationshipManagerMultiSelect = (
  props: RelationshipManagerMultiSelectProps
) => {
  const { status, data } = useQuery("rmListForSelect", useRMService().useGetRMListService);

  const { input } = useField(props.name, { initialValue: emptyArray });

  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      className="standard-select"
    >
      <InputLabel className="standard-select-label" id="RM-Manager">
        Relationship Manager
      </InputLabel>
      <Select labelId="RM-Manager" multiple {...input} MenuProps={MenuProps}>
        {status === "success" &&
          data.data &&
          data.data.map((rmData: any) => (
            <MenuItem key={rmData.rm_id} value={rmData.rm_id}>
              {rmData.manager_name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
export default RelationshipManagerMultiSelect;
