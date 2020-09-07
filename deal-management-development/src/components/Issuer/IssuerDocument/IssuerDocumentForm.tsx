import React from "react";
import CustomMultiFileUpload from "../../CustomMultiFileUpload/CustomMultiFileUpload";
import { useParams } from "react-router-dom";
import { queryCache } from "react-query";
export interface IssuerDocumentFormProps {
  closeDrawer?: any;
}
const IssuerDocumentForm = (props: IssuerDocumentFormProps) => {
  let { editId } = useParams();
  const keyRef = editId;

  const fileUploadSuccess = () => {
    props.closeDrawer();
    return queryCache.refetchQueries("issuerDocList").then(() => {});
  };
  return (
    <div className="form-box-cont">
      <CustomMultiFileUpload
        modelName="issuer"
        keyRef={keyRef}
        onFileUploadSuccess={() => fileUploadSuccess()}
      />
    </div>
  );
};
export default IssuerDocumentForm;
