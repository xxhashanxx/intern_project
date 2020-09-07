import React from "react";
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
import EmailIcon from '@material-ui/icons/Email';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Paper from "@material-ui/core/Paper";
import useMaturityInvestment from "../../../api/matureInvestments/maturityListService"
//import printInvestmentsService from "../../../api/report/printInvestmentsService";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { getComparator, stableSort, Order } from "../../TableViewComponents/useSortData";

//-------------------------------------

const headCells: any[] = [
  { id: 'notification_sent', label: 'Notified' },
  { id: 'customer_name', label: 'Investor' },
  { id: 'customer_address', label: 'Investor Address' },
  { id: 'issue_name', label: 'Issue' },
  { id: 'tc_no', label: 'TC No' },
  { id: 'issue_date', label: 'Investment Date' },
  { id: 'maturity', label: 'Maturity' },
  { id: 'no_of_days', label: 'No of Days' },
  { id: 'amount_invested', label: 'Amount Invested' },
  { id: 'interest', label: 'Interest' },
  
  // { id: 'wht', label: 'Maturity Value' },
  { id: 'rate_at_maturity', label: 'Rate at Maturity  % ' },
  { id: 'aer', label: 'AER' },
  { id: 'notified_date', label: 'Notified Date' },
  
];
interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            size="small"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}

            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
//---------------------------------------------
export interface MaturityInvestmetsTableProps {}

const MaturityInvestmetsTable = (props: MaturityInvestmetsTableProps) => {
      //-----------------------------------------
      const [order, setOrder] = React.useState<Order>('asc');
      const [orderBy, setOrderBy] = React.useState<any>('customer_id');
    
      const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
      //-----------------------------------------------
  const { status, data, error } = useQuery(
    "MaturityInvestmentList",
    useMaturityInvestment().useGetMaturityInvestment
  );

  const investmentsService =useMaturityInvestment().useNotifiedtMaturityService();
  const onNotifyClick = (investmentDataItem: any) => {
    mutateNotify(investmentDataItem);
  };
  const [mutateNotify] = useMutation(
    async (investmentDataItem: any) => {
      if (window.confirm("Did you notify the investor?"))
        return await investmentsService.notifyInvestments(investmentDataItem);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("MaturityInvestmentList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}
       { <ToastContainer />}
      {status === "success" && (  
        <TableContainer  component={Paper}>
          <Table aria-label="collapsible table">
          <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
            <TableBody>
            {stableSort(data.data, getComparator(order, orderBy))
                .map((quatationListItem: any, key: number) => {
                  return (
                    <TableRow 
                      key={key} 
                      hover
                      >
                        <TableCell padding="checkbox">
                      <Checkbox
                        checked={quatationListItem.notification_sent}
                        //inputProps={{ 'aria-labelledby': labelId }}
                      />
                      </TableCell>
                      {/* <TableCell >{quatationListItem.notification_sent} </TableCell>  */} 
                      <TableCell>{quatationListItem.customer_name} </TableCell>
                      <TableCell>{quatationListItem.address1} {quatationListItem.address2} </TableCell>
                      <TableCell>{quatationListItem.issue_name} </TableCell>
                      <TableCell>{quatationListItem.tc_no} </TableCell>
                      <TableCell>{moment(quatationListItem.issue_date).format('DD-MM-yyyy')} </TableCell>
                      <TableCell>{moment(quatationListItem.maturity).format('DD-MM-yyyy')}</TableCell>
                      <TableCell >{quatationListItem.no_of_days} </TableCell>
                      


                      
                      <TableCell >
                      {Number(quatationListItem.amount_invested).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}
                      </TableCell>

                      <TableCell >{Number(quatationListItem.interest).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</TableCell>
                      {/* <TableCell >{quatationListItem.wht} </TableCell> */}
                      <TableCell >{quatationListItem.rate_at_maturity} </TableCell>
                      <TableCell >{quatationListItem.aer} </TableCell>
                      <TableCell >{quatationListItem.notified_date === null ? "":moment(quatationListItem.notified_date).format('DD-MM-yyyy')} </TableCell>
                      <TableCell align="right">
                        <div className="btn-row flex-end">
                          <div className="btn-grid">
                            <Tooltip title="Notify">
                              <IconButton
                                aria-label="Notify"
                                onClick={() => onNotifyClick(quatationListItem)}
                              >
                                <EmailIcon color="primary" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default MaturityInvestmetsTable;
