import { Box, Typography } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import UserInfo from "./user-info/UserInfo";
import UserOrder from "./user-order/UserOrder";
import { useEffect } from "react";
import { fetchIdCookie, getCartItemDetails } from "@/layout/navbar/services";
import { useGetCartItems } from "@/layout/navbar/hooks";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0C68F4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0C68F4",
    },
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
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
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
  ...(ownerState.completed && {
    backgroundColor: "#78ABF9",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <LocalMallOutlinedIcon sx={{ fontSize: "32px" }} />,
    2: (
      <LocalShippingOutlinedIcon sx={{ fontSize: "48px", color: "#0C68F4" }} />
    ),
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

export default function Checkout() {
  const userId = fetchIdCookie();
  const { data: cartItems } = useGetCartItems(userId);

  const shipment = 22.5;
    useEffect(() => {
    let newSubtotal = 0;
    let newDiscount = 0;
    let newGrandTotal = 0;
    cartItems?.map((item: any) => {
      getCartItemDetails(item.productId).then((productDetail) => {
        newDiscount +=
          (productDetail.discount.percent * productDetail.price) / 100;
        newSubtotal += productDetail.price;
        newGrandTotal += newSubtotal - newDiscount + shipment;
      });
    });
  }, [cartItems]);
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
            activeStep={1}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography
                    sx={{
                      color: label === "Payment" ? "#9E9E9E" : "#0C68F4",
                      fontSize: label === "Checkout" ? "16px" : "14px",
                      fontWeight: label === "Cart" ? "400" : "500",
                      mt: label === "Checkout" ? -2 : -1,
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
      <Stack direction={"row"} justifyContent={"space-between"} mb={6}>
        <UserInfo />
        <UserOrder />
      </Stack>
    </Box>
  );
}
