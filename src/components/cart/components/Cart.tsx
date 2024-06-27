import { Box, Stack, Typography } from "@mui/material";
import { useGetCartItems } from "@/layout/navbar/hooks";
import { fetchIdCookie, getCartItemDetails } from "@/layout/navbar/services";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { useEffect, useState } from "react";
import Card from "@/components/shared/card/components";
import { useGetProduct } from "../hooks";
import CartItem from "@/components/shared/cart-item/CartItem";
import PaymentDetails from "./paymentDetails/PaymentDetails";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#9E9E9E",
  zIndex: 1,
  color: "#fff",
  width: 48,
  height: 48,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "white",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    width: 72,
    height: 72,
    border: "3px solid #0C68F4",
    transform: "translateY(-15%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <LocalMallOutlinedIcon sx={{ color: "#0C68F4", fontSize: "48px" }} />,
    2: <LocalShippingOutlinedIcon sx={{ fontSize: "32px" }} />,
    3: <PaymentOutlinedIcon sx={{ fontSize: "32px" }} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["Cart", "Checkout", "Payment"];

export default function Cart() {
  const { data: randomProducts } = useGetProduct();
  const userId = fetchIdCookie();
  const { data: cartItems } = useGetCartItems(userId);

  return (
    <Box>
      <Box
        marginY={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack sx={{ width: "50%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={0}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography
                    sx={{
                      color: label === "Cart" ? "#0C68F4" : "#9E9E9E",
                      fontSize: label === "Cart" ? "16px" : "14px",
                      fontWeight: label === "Cart" ? "normal" : "medium",
                      mt: label === "Cart" ? -2 : -1,
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </Box>
      <Stack direction={"column"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"column"} mb={6}>
            {cartItems?.map((item: any) => (
              <CartItem
                key={item.productId}
                cartItemProps={item}
                changeComponent="account"
              />
            ))}
          </Stack>
          <Stack>
            <PaymentDetails />
          </Stack>
        </Stack>
        <Stack direction={"column"}>
          <Typography fontSize={"20px"} fontWeight={"500"}>
            Customers who viewed items in your browsing history also viewed
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }} marginY={6}>
            {randomProducts?.map((item) => (
              <Card
                key={item.productId}
                cardProps={item}
                hoverMode={{ hoverMode: "productHover" }}
              />
            ))}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
