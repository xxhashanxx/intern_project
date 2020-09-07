import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Alert from "@material-ui/lab/Alert";
import { queryCache, useMutation, useQuery } from "react-query";
import useLawyerService from "../../../api/userManagement/lawyer/useLawyerService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {
  getComparator,
  stableSort,
  Order,
} from "../../TableViewComponents/useSortData";

//-------------------------------------

const headCells: any[] = [
  { id: "lawyer_id", label: "ID" },
  { id: "lawyer_name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "contact_number1", label: "Contact No 1" },
  { id: "contact_number2", label: "Contact No 2" },
];
interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            size="small"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
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

export interface LawyerTableProps {
  openDrawer: any;
}

const LawyerTable = (props: LawyerTableProps) => {
  //-----------------------------------------
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("lawyer_id");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  //-----------------------------------------------
  const { status, data, error } = useQuery(
    "lawyerList",
    useLawyerService().useGetLawyerListService
  );
  const deleteLawyerService = useLawyerService().useDeleteLawyerService();
  const [
    mutateDeleteLawyer,
    { status: deleteStatus, error: deleteError },
  ] = useMutation(
    async (deleteId: any) => {
      if (window.confirm("Are you sure you wish to delete this item?"))
        return await deleteLawyerService.deleteLawyer(deleteId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("lawyerList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const onDeleteClick = (lawyerDataItem: any) => {
    mutateDeleteLawyer(lawyerDataItem.lawyer_id);
  };
  // console.log(data)
  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}

      {<ToastContainer />}
      {status === "success" && (
        <TableContainer>
          <Table size="small">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(data.data, getComparator(order, orderBy)).map(
                (lawyerDataItem: any, key: number) => {
                  return (
                    <TableRow
                      hover
                      key={key}
                      onDoubleClick={() => props.openDrawer(lawyerDataItem)}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <TableCell>{lawyerDataItem.lawyer_id}</TableCell>
                      <TableCell>{lawyerDataItem.lawyer_name}</TableCell>
                      <TableCell>{lawyerDataItem.email}</TableCell>
                      <TableCell>{lawyerDataItem.contact_number1}</TableCell>
                      <TableCell>{lawyerDataItem.contact_number2}</TableCell>

                      <TableCell align="right">
                        <div className="btn-row flex-end">
                          <div className="btn-grid">
                            <Tooltip title="View/Edit">
                              <IconButton
                                aria-label="edit"
                                onClick={() => props.openDrawer(lawyerDataItem)}
                              >
                                <EditIcon color="primary" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </div>
                          <div className="btn-grid">
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="delete"
                                onClick={() => onDeleteClick(lawyerDataItem)}
                              >
                                <DeleteIcon color="error" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default LawyerTable;
