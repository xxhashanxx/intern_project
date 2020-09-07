import React from "react";
import useGetAuditLogService from "../../api/auditLog/useGetAuditLogService";
import { useQuery } from "react-query";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import { LinearProgress } from "@material-ui/core";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { getComparator, stableSort, Order } from "../TableViewComponents/useSortData";

//-------------------------------------

const headCells: any[] = [
  { id: 'id', label: 'Id' },
  { id: 'task', label: 'Task' },
  { id: 'user_id', label: 'User Id' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
  
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
export interface AuditLogTableProps {
  searchVal: string;
}

const AuditLogTable = (props: AuditLogTableProps) => {
    //-----------------------------------------
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<any>('id');
  
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
    //-----------------------------------------------
  const { status, data: tableDataArr, error } = useQuery(
    "auditLogList",
    useGetAuditLogService
  );
  return (
    <>
      {status === "loading" && <LinearProgress />}
      <TableContainer component={Paper}>
        {status === "error" && (
          <Alert className="mt-4 w-100" severity="error">
            Audit list error
          </Alert>
        )}
        {status === "success" && (
          <Table aria-label="collapsible table">
          <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
            <TableBody>
            {stableSort(tableDataArr, getComparator(order, orderBy))
                .map((tableData: any, key: number) => {
                  return (
                    <TableRow key={key}>
                      <TableCell>{tableData.id}</TableCell>
                      <TableCell>{tableData.task}</TableCell>
                      <TableCell>{tableData.user_id}</TableCell>
                      <TableCell>{tableData.createdAt}</TableCell>
                      <TableCell>{tableData.updatedAt}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
};
export default AuditLogTable;
