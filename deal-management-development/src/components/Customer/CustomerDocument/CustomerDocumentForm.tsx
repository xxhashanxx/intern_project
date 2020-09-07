import React from "react";
import CustomMultiFileUpload from "../../CustomMultiFileUpload/CustomMultiFileUpload";
import { useParams } from "react-router-dom";
import { queryCache } from "react-query";
export interface CustomerDocumentFormProps {
  closeDrawer?: any;
}
const CustomerDocumentForm = (props: CustomerDocumentFormProps) => {
  let { editId } = useParams();
  const keyRef = editId;

  const fileUploadSuccess = () => {
    props.closeDrawer();
    return queryCache.refetchQueries("customerDocList").then(() => {});
  };
  return (
    <div className="form-box-cont">
      <CustomMultiFileUpload
        modelName="customer"
        keyRef={keyRef}
        onFileUploadSuccess={() => fileUploadSuccess()}
      />
    </div>
  );
};
export default CustomerDocumentForm;
