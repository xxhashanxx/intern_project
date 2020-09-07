import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Chip,
  List,
  ListItem,
  LinearProgress,
  Grid,
  Button,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import useTrusteeService from "../../../api/userManagement/trustee/useTrusteeService";
import { useFilterRows } from "../../TableViewComponents/useFilterData";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { theme } from "../../../theme";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { getComparator, stableSort, Order } from "../../TableViewComponents/useSortData";

//-------------------------------------

const headCells: any[] = [
  { id: 'trustee_id', label: 'ID' },
  { id: 'trustee_name', label: 'Name' },
  // { id: 'email', label: 'Email' },
  // { id: 'contact_person', label: 'Contact Person' },
  // { id: 'contact_person_desig', label: 'Designation' },
  { id: 'contact_number1', label: 'Con. No 1' },
  { id: 'contact_number2', label: 'Con. No 2' },
  // { id: 'address_line1', label: 'Add. Line 1' },
  // { id: 'address_line2', label: 'Add. Line 2' },
  
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
        <TableCell></TableCell>
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
export interface TrusteeTableProps {
  searchVal: string;
}

export interface TableDataResponse {
  trustee_id: string;
  trustee_name: string;
  email: string;
  contact_person: string;
  contact_person_desig: string;
  nic_passport_br: string;
  contact_number1: string;
  contact_number2: string;
  address_line1: string;
  address_line2: string;
}
function filterData(tableData: TableDataResponse[], searchText: string = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.trustee_name &&
      dataObj.trustee_name.toLowerCase().includes(searchText)
  );
}

const TrusteeTable = ({ searchVal }: TrusteeTableProps) => {
    //-----------------------------------------
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<any>('trustee_id');
  
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
    //-----------------------------------------------

  const { status, data, error } = useQuery(
    "trusteeList",
    useTrusteeService().useGetTrusteeListService
  );

  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    data,
    filterData
  );
  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}
       { <ToastContainer />}
      {status === "success" && (
        <TableContainer>
          <Table size="small">
          <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
            <TableBody>
              
            {stableSort(pageData, getComparator(order, orderBy))
                .map((trusteeDataItem: any, key: number) => {
                  return <Row key={key} row={trusteeDataItem} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default TrusteeTable;

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const deleteTrusteeService = useTrusteeService().useDeleteTrusteeService();
  const [mutateDeleteTrustee,{status:deleteStatus,error:deleteError}] = useMutation(
    async (deleteId: any) => {
      return await deleteTrusteeService.deleteTrustee(deleteId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("trusteeList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const onDeleteClick = (trusteeDataItem: any) => {
    if (window.confirm("Are you sure you wish to delete this item?"))
      mutateDeleteTrustee(trusteeDataItem.trustee_id);
  };

  return (
    <>
      <TableRow
        hover 
        onDoubleClick={() => history.push(`/trustee/edit/${row.trustee_id}`)} style={{ whiteSpace: "nowrap"}}>
        <TableCell style={{ paddingLeft: 10, paddingRight: 5 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.trustee_id}</TableCell>
        <TableCell>{row.trustee_name}</TableCell>
        {/* <TableCell>{row.email}</TableCell> */}
        {/* <TableCell>{row.contact_person}</TableCell>
        <TableCell>
          {row.contact_person_desig}
        </TableCell>*/}
        <TableCell>{row.contact_number1}</TableCell>
        <TableCell>{row.contact_number2}</TableCell> 
        {/* <TableCell>{row.address_line1}</TableCell>
        <TableCell>{row.address_line2}</TableCell> */}

        <TableCell align="right">
          <div className="btn-row flex-end">
            <div className="btn-grid">
              <Tooltip title="View/Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() => history.push(`/trustee/edit/${row.trustee_id}`)}
                >
                  <EditIcon color="primary" fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="btn-grid">
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteClick(row)}
                >
                  <DeleteIcon color="error" fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="collapse-box">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <List dense={true} disablePadding={true}>
                    <ListItem disableGutters={true} dense={true}>
                      <div className="list-item-cont d-flex">
                        <div className="label w-50">
                          <b>Address 1</b>
                        </div>
                        <div className="value  w-50">{row.address_line1} </div>
                      </div>
                    </ListItem>
                    <Divider />
                    <ListItem disableGutters={true} dense={true}>
                      <div className="list-item-cont d-flex">
                        <div className="label  w-50">
                          <b>Address 2</b>
                        </div>
                        <div className="value  w-50">{row.address_line2} </div>
                      </div>
                    </ListItem>
                    <Divider />
                    
                    <Divider />
                    {/* <ListItem disableGutters={true} dense={true}>
                      <div className="list-item-cont d-flex">
                        <div className="label  w-50">
                          <b>Contact Numbers</b>
                        </div>
                        <div className="value  w-50">
                          {row.contact_number1} {row.contact_number2 === null ? "" : " , "}
                          {row.contact_number2} {row.contact_number3 === null ? "" : " , "}
                          {row.contact_number3} 
                        </div>
                      </div>
                    </ListItem> */}
                  </List>
                </Grid>
                
              </Grid>
              <Grid container spacing={3} style={{ paddingBottom:30, paddingTop:30, paddingLeft:10}}>
                <Grid>
                    <TableContainer>
                      <Table size="small" >
                        <TableHead style={{backgroundColor: theme.palette.grey[300]  }}>
                          <TableRow>
                            <TableCell>Contact Person</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Email</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.trustee_contact_val &&
                            row.trustee_contact_val.map((contactItem: any, contactkey: number) => {
                              return (
                                <TableRow key={contactkey}>
                                  <TableCell>{contactItem.contact_person}</TableCell>
                                  <TableCell>{contactItem.contact_designation}</TableCell>
                                  <TableCell>{contactItem.contact_number}</TableCell>
                                  <TableCell>{contactItem.email}</TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
              </Grid>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
