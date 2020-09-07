import React from "react";
import CustomMultiFileUpload from "../../CustomMultiFileUpload/CustomMultiFileUpload";
import { useParams } from "react-router-dom";
import { queryCache } from "react-query";
export interface IssueDocumentFormProps {
  closeDrawer?: any;
}
const IssueDocumentForm = (props: IssueDocumentFormProps) => {
  let { editId } = useParams();
  const keyRef = editId;

  const fileUploadSuccess = () => {
    props.closeDrawer();
    return queryCache.refetchQueries("issueDocList").then(() => {});
  };
  return (
    <div className="form-box-cont">
      <CustomMultiFileUpload
        modelName="issue"
        keyRef={keyRef}
        onFileUploadSuccess={() => fileUploadSuccess()}
      />
    </div>
  );
};
export default IssueDocumentForm;
