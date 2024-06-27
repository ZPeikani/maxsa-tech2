import {Card, CardContent, Typography } from "@mui/material";
import GetPayment from "../getpayment/GetPayment";

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

        <GetPayment link="/checkout" buttonText="Procced to checkout"/>
      </CardContent>
    </Card>
  );
}
