import { Box, Button, Stack, Typography } from "@mui/material";
import { paymentType } from "../../hooks/type";
import Link from "next/link";

export default function Payment({
  subtotal,
  discount,
  shipment,
  grandTotal,
}: paymentType) {
  return (
    <>
      <Stack direction={"column"} gap={0.5} fontSize={"14px"} fontWeight={"00"}>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography fontSize={"14px"} fontWeight={"300"} color={"#717171"}>
            Subtotal
          </Typography>
          <Typography fontSize={"14px"} fontWeight={"300"} color={"#444444"}>
            ${subtotal.toFixed(2)}
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography fontSize={"14px"} fontWeight={"300"} color={"#717171"}>
            Discount
          </Typography>
          <Typography fontSize={"14px"} fontWeight={"300"} color={"#444444"}>
            ${discount.toFixed(2)}
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography fontSize={"14px"} fontWeight={"300"} color={"#717171"}>
            Shipment Cost
          </Typography>
          <Typography fontSize={"14px"} fontWeight={"300"} color={"#444444"}>
            ${shipment.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ borderBottom: "1px solid #CBCBCB" }} my={0.75}></Box>
      <Stack direction={"row"} justifyContent="space-between">
        <Typography fontSize={"16px"} fontWeight={"500"}>
          Grand Total
        </Typography>
        <Typography fontSize={"16px"} fontWeight={"500"}>
          ${grandTotal.toFixed(2)}
        </Typography>
      </Stack>
    </>
  );
}
