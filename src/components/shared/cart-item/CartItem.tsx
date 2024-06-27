import { Box, Button, Stack, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Guaranteed from "@/assets/images/cart-item-icons/guaranteed.svg";
import freeDelivery from "@/assets/images/cart-item-icons/free delivery.svg";
import { ICartProducts } from "@/layout/navbar/hooks/types";
import { useGetCartItemDetails } from "@/layout/navbar/hooks";
import trashBtn from "@/assets/images/trashbtn.svg";
import Image from "next/image";

type Props = {
  cartItemProps: ICartProducts;
  changeComponent: "menu" | "account" | "payment";
};

const CartItemDetails = ({ cartItemProps, changeComponent }: Props) => {
  const { data: cartItemDetails } = useGetCartItemDetails(
    cartItemProps.productId
  );
  const boxStyles = {
    menu: {
      width: "232px",
      height: "157px",
    },
    account: {
      width: "466px",
      height: "172px",
    },
    payment: {
      width: "257px",
      height: "74px",
    },
  };
  return (
    <Box sx={{ ...boxStyles[changeComponent], mr: "10px", my: "8px" }}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ ...boxStyles[changeComponent] }}
        justifyContent={"space-between"}
        mb={changeComponent === "account" ? 3 : 0}
      >
        <Typography
          fontSize={changeComponent === "payment" ? "12px" : "16px"}
          fontWeight={changeComponent === "payment" ? "300" : "600"}
        >
          {cartItemDetails?.name}
        </Typography>
        <Box
          display="flex"
          flexDirection={"column"}
          gap={changeComponent === "account" ? 1.25 : "2px"}
        >
          {cartItemDetails?.color && (
            <Typography fontSize="10px" fontWeight="500" color="#717171">
              {cartItemDetails.color}
            </Typography>
          )}
          {changeComponent === "account" ? (
            ""
          ) : (
            <Typography fontSize="10px" fontWeight="500" color="#717171">
              ×{cartItemProps.quantity}
            </Typography>
          )}
          {changeComponent === "payment" ? (
            ""
          ) : (
            <>
              <Image src={freeDelivery} alt="Free Delivery" />
              <Image src={Guaranteed} alt="Guaranteed" />
            </>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={changeComponent === "account" ? 3 : 0}
        >
          <Typography
            fontSize={changeComponent === "account" ? "16px" : "12px"}
            fontWeight={changeComponent === "account" ? "400" : "300"}
            color="#2D2D2D"
            marginLeft={changeComponent === "payment" ? "auto" : ""}
          >
            ${(cartItemDetails?.price * cartItemProps.quantity).toFixed(2)}
          </Typography>
          {changeComponent === "account" ||
            (changeComponent === "menu" && (
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                justifyContent="center"
              >
                <Box component="img" src={trashBtn.src} alt="Remove" />
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  borderBottom={1}
                  width="69px"
                  height="24px"
                >
                  <Button
                    size="small"
                    sx={{ color: "#717171", minHeight: 16, minWidth: 16 }}
                  >
                    <RemoveIcon />
                  </Button>
                  <Typography
                    fontSize="14px"
                    fontWeight="300"
                    textAlign="center"
                    color="#717171"
                  >
                    {String(cartItemProps.quantity)}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ color: "#717171", minHeight: 16, minWidth: 16 }}
                  >
                    <AddIcon />
                  </Button>
                </Stack>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
const CartItem = ({ cartItemProps, changeComponent }: Props) => {
  const { data: cartItemDetails } = useGetCartItemDetails(
    cartItemProps.productId
  );
  const boxStyles = {
    menu: {
      width: "450px",
      height: "173px",
    },
    account: {
      width: "704px",
      height: "212px",
    },
    payment: {
      width: "368px",
      height: "86px",
    },
  };
  return (
    <Box
      width={boxStyles[changeComponent].width}
      height={boxStyles[changeComponent].height}
      display="flex"
      alignItems="center"
      gap="16px"
      boxShadow={1}
      borderRadius="8px"
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box component="img" src={cartItemDetails?.thumbnailImage} ml={1.5} />
      </Box>
      <CartItemDetails
        cartItemProps={cartItemProps}
        changeComponent={changeComponent}
      />
    </Box>
  );
};
export default CartItem;
