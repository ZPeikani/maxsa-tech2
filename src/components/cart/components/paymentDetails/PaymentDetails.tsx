import {Button, Card, CardContent, Typography } from "@mui/material";
import GetPayment from "../getpayment/GetPayment";
import Link from "next/link";

export default function PaymentDetails() {
  return (
    <Card
      sx={{
        width: "416px",
        height: "267px",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontSize={"24px"} fontWeight={"500"} mb={2.5}>
          Payment Details
        </Typography>
        <GetPayment />
        <Link href="/checkout">
        <Button
          variant="contained"
          sx={{ mt: "25px", py: "12px", textTransform: "none" }}
          fullWidth
        >
          Proceed to checkout
        </Button>
      </Link>
      </CardContent>
    </Card>
  );
}
