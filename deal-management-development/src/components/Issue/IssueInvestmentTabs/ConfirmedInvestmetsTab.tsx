import React from "react";
import useinvestmentFilteredListService from "../../../api/investmentFilteredList/investmentFilteredListService";
import { useQuery, queryCache, useMutation } from "react-query";
import { useStoreState } from "../../../store";
import {
  LinearProgress,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
  Button,
  Select,
  Grid,
  InputLabel,
  MenuItem,
  CircularProgress,
  Chip,
  Tooltip,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import useIssueService from "../../../api/issue/useIssueService";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import usePrintInvestmentsService from "../../../api/report/usePrintInvestmentsService";
import PrintIcon from "@material-ui/icons/Print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
//import printInvestmentsService from "../../../api/report/printInvestmentsService";

export interface ConfirmedInvestmetsTabProps {}
const ConfirmedInvestmetsTab = (props: ConfirmedInvestmetsTabProps) => {
  const [selected, setSelected] = React.useState<number[]>([]);
  const [reptype, setReoprtType] = React.useState<string>();
  const issueId = useStoreState((state) => state.issue.issueId);
  const { status, data, error } = useQuery(
    "confirmedQuotationList",
    issueId,
    useinvestmentFilteredListService().useGetConfirmedQuatationListService
  );

  const deleteInvestmentsService = useIssueService().useDeleteInvestmentsService();
  const onDeleteClick = (issuerDataItem: any) => {
    //   console.log(issuerDataItem);

    if (window.confirm("Are you sure you wish to delete this item?"))
      mutateDeleteIssuer(issuerDataItem);
  };

  const [
    mutateDeleteIssuer,
    { status: deleteStatus, error: deleteError },
  ] = useMutation(
    async (issuerDataItem: any) => {
      return await deleteInvestmentsService.deleteInvestments(issuerDataItem);
    },
    {
      onSuccess: () => {
        return queryCache
          .refetchQueries("confirmedQuotationList")
          .then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const approveInvestmentsService = useIssueService().useApproveInvestmentsService();
  const onApproveClick = (quatationListItem: any) => {
    mutateApproveInvestment(quatationListItem);
  };
  const [mutateApproveInvestment] = useMutation(
    async (quatationListItem: any) => {
      if (window.confirm("Are you sure you wish to approve this item?"))
        return await approveInvestmentsService.approveInvestments(
          quatationListItem
        );
    },
    {
      onSuccess: () => {
        return queryCache
          .refetchQueries("confirmedQuotationList")
          .then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const cancelInvestmentsService = useIssueService().useCancelInvestmentsService();
  const onCancelClick = (quatationListItem: any) => {
    mutateCancelInvestment(quatationListItem);
  };
  const [mutateCancelInvestment] = useMutation(
    async (quatationListItem: any) => {
      if (window.confirm("Are you sure you wish to cancel this item?"))
        return await cancelInvestmentsService.cancelInvestments(
          quatationListItem
        );
    },
    {
      onSuccess: () => {
        return queryCache
          .refetchQueries("confirmedQuotationList")
          .then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const print = (issue_id: any) => {
    //  console.log(selected);
    mutatePrintInvestment({
      issue_id: issue_id,
      selected: selected,
      file_name: reptype,
    });
  };

  const printInvestmentsService = usePrintInvestmentsService();
  const [
    mutatePrintInvestment,
    { status: printStatus, error: printError },
  ] = useMutation(
    async (inputVal: any) => {
      return await printInvestmentsService.createReport(
        inputVal.issue_id,
        inputVal.selected,
        inputVal.file_name,
        "",
        new Date()
      );
    },
    {
      onError: (e) => {
        toast.error(
          "Issue should be in Approved status! Please select one row at least!"
        );
      },
    }
  );

  const handleClick = (event: React.MouseEvent<unknown>, inv_id: number) => {
    const selectedIndex = selected.indexOf(inv_id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, inv_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (inv_id: number) => selected.indexOf(inv_id) !== -1;

  const handleChange = (newVal: any) => {
    setReoprtType(newVal);
  };
  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}
      {<ToastContainer />}
      {/* {printStatus === "error" && printError && (
        <Alert severity="error">{"Issue should be in Approved status! Please select one row at least!"}</Alert>
      )}
      {deleteStatus === "error" && deleteError && (
        <Alert severity="error">{deleteError.message}</Alert>
      )} */}
      {status === "success" && (
        <>
          <Grid item xs={12} className="form-row ml-2">
            <div className="btn-cont pt-1 pr-4">
              <div className="btn-row  flex-end">
                <div className="btn-grid">
                  <Select
                    native
                    defaultValue="none"
                    onChange={(event) => handleChange(event.target.value)}
                  >
                    <option value="none" disabled>
                      Select Report Type
                    </option>
                    <option value="ConfirmationLetter">
                      Confirmation Letter
                    </option>
                    <option value="InvestorSchedule">Investor Schedule</option>
                    <option value="RePaymentSchedule">
                      Re-payment Schedule
                    </option>
                    <option value="TrustCertificate">Trust Certificate</option>
                  </Select>
                </div>
                <div className="btn-grid">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => print(issueId)}
                    startIcon={
                      printStatus === "loading" ? (
                        <CircularProgress size={20} />
                      ) : (
                        <PrintIcon />
                      )
                    }
                    disabled={
                      printStatus === "loading" || reptype === undefined
                    }
                  >
                    {printStatus === "loading" ? "Printing" : "Print"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="btn-row  ml-2"></div>
          </Grid>
          <div className="join-table-cont">
            <div className="join-table-grid">
              <div style={{ maxHeight: 440 }}>
                <Table
                  size="small"
                  className="form-row mt-2"
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow style={{ whiteSpace: "nowrap" }}>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      {/* <TableCell>Status </TableCell> */}
                      <TableCell>Investor ID</TableCell>
                      <TableCell>Investor Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.data &&
                      data.data.map((quatationListItem: any, key: number) => {
                        const isItemSelected = isSelected(
                          quatationListItem.inv_id
                        );
                        return (
                          <TableRow
                            key={quatationListItem.inv_id}
                            hover
                            onClick={(event) =>
                              handleClick(event, quatationListItem.inv_id)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                //inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>
                            <TableCell className="py-0" align="right">
                              <div className="btn-row flex-end">
                                {/* <div className="btn-grid">
                            {quatationListItem.status === "Preliminary" ? (
                              <Tooltip title="Approve">
                                <IconButton
                                  //style={{ border: "1px solid #0277bd" }}
                                  color="primary"
                                  onClick={() =>
                                    onApproveClick(quatationListItem)
                                  }
                                >
                                  <ThumbUpIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ) : quatationListItem.status === "Approved" ? (
                              <Tooltip title="Cancel">
                                <IconButton
                                  // style={{ border: "1px solid #546e7a" }}
                                  color="default"
                                  onClick={() =>
                                    onCancelClick(quatationListItem)
                                  }
                                >
                                  <ThumbDownIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              ""
                            )}
                          </div> */}
                                <div className="btn-grid">
                                  <Tooltip title="Delete">
                                    <IconButton
                                      size="small"
                                      aria-label="delete"
                                      onClick={() =>
                                        onDeleteClick(quatationListItem)
                                      }
                                    >
                                      <DeleteIcon
                                        color="error"
                                        fontSize="small"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              </div>
                            </TableCell>
                            {/* <TableCell>
                        <div className="btn-row">
                          <div className="btn-grid">
                            <Chip
                              variant="default"
                              size="small"
                              color={quatationListItem.status === "Preliminary" ? "default" : quatationListItem.status === "Cancelled" ? "secondary" : "primary"}
                              label={quatationListItem.status}
                            />
                          </div>
                        </div>
                      </TableCell> */}
                            <TableCell>
                              {quatationListItem.customer_id}{" "}
                            </TableCell>
                            <TableCell>
                              <div
                                className="ellipsis-text cell-250"
                                title={quatationListItem.customer_name}
                              >
                                {quatationListItem.customer_name}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="join-table-grid">
              <TableContainer style={{ maxHeight: 440 }}>
                <Table
                  size="small"
                  className="form-row mt-2"
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow style={{ whiteSpace: "nowrap" }}>
                      <TableCell>Tranche</TableCell>
                      <TableCell style={{ minWidth: "80px" }}>TC No</TableCell>
                      <TableCell style={{ minWidth: "120px" }}>
                        Issue Date
                      </TableCell>
                      <TableCell style={{ minWidth: "120px" }}>
                        Maturity
                      </TableCell>
                      <TableCell style={{ minWidth: "80px" }}>
                        No of Days
                      </TableCell>
                      <TableCell>Monthly Cash</TableCell>
                      <TableCell>Cash Cover</TableCell>
                      <TableCell>Face Value</TableCell>
                      <TableCell>Amount Invested</TableCell>

                      <TableCell>Interest</TableCell>
                      <TableCell>WHT</TableCell>
                      <TableCell style={{ minWidth: "120px" }}>
                        Rate at Maturity %{" "}
                      </TableCell>
                      <TableCell>AER %</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.data &&
                      data.data.map((quatationListItem: any, key: number) => {
                        const isItemSelected = isSelected(
                          quatationListItem.inv_id
                        );
                        return (
                          <TableRow
                            key={quatationListItem.inv_id}
                            hover
                            onClick={(event) =>
                              handleClick(event, quatationListItem.inv_id)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <TableCell>
                              {quatationListItem.tranche_no}{" "}
                            </TableCell>
                            <TableCell>{quatationListItem.tc_no} </TableCell>
                            <TableCell>
                              {moment(quatationListItem.issue_date).format(
                                "DD-MM-yyyy"
                              )}{" "}
                            </TableCell>
                            <TableCell>
                              {moment(quatationListItem.maturity).format(
                                "DD-MM-yyyy"
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {quatationListItem.no_of_days}{" "}
                            </TableCell>
                            <TableCell align="right">
                              {Number(
                                quatationListItem.monthly_cash
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </TableCell>
                            <TableCell align="right">
                              {Number(
                                quatationListItem.cash_cover
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                            </TableCell>
                            <TableCell align="right">
                              {Number(
                                quatationListItem.face_value
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                            </TableCell>
                            <TableCell align="right">
                              {Number(
                                quatationListItem.amount_invested
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                            </TableCell>

                            <TableCell align="right">
                              {Number(
                                quatationListItem.interest
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </TableCell>
                            <TableCell align="right">
                              {Number(quatationListItem.wht).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                            </TableCell>
                            <TableCell align="right">
                              {Number(
                                quatationListItem.rate_at_maturity
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                            </TableCell>
                            <TableCell align="right">
                              {Number(quatationListItem.aer).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ConfirmedInvestmetsTab;
