import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGetAllProductsToDashboard } from "@/components/dashboard/hook/index";
import { IProduct } from "@/components/home/hooks/types";
import { Box, CircularProgress } from "@mui/material";

interface Column {
  id: "thumbnailImage" | "name" | "id" | "price" | "categoryName" | "brandName";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (
    value: number | string | undefined
  ) => string | JSX.Element | undefined;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  {
    id: "thumbnailImage",
    label: "Image",
    minWidth: 100,
    align: "left",
    format: (value: string) => (
      <Box
        component="img"
        src={value as string}
        alt="Product"
        style={{ width: 50, height: 50 }}
      />
    ),
  },
  { id: "name", label: "NameProducts", minWidth: 170, align: "left" },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    align: "center",
    format: (value: number) => `$${value.toFixed(2)}`,
  },
  { id: "categoryName", label: "Category", minWidth: 100, align: "center" },
  { id: "brandName", label: "Brand", minWidth: 100, align: "center" },
];

export default function TableProducts() {
  const { data, isLoading, error } = useGetAllProductsToDashboard();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const rows = data || [];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof IProduct];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value as any) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
