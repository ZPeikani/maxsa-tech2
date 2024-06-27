import CartItem from "@/components/shared/cart-item/CartItem";
import { useGetCartItems } from "@/layout/navbar/hooks";
import { fetchIdCookie, getCartItemDetails } from "@/layout/navbar/services";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Payment from "@/components/cart/components/payment/Payment";
import { discountCodeType } from "../../hook/type";
import Link from "next/link";
type ButtonProps = {
  link: string;
  buttonText:string
}
export default function UserOrder({link,buttonText}:ButtonProps) {
  const userId = fetchIdCookie();
  const { data: cartItems } = useGetCartItems(userId);

  const shipment = 22.5;
  const [subtotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountCodeInput, setDiscountCodeInput] = useState<string>("");
  const discountCode: discountCodeType = {
    bronze: "10",
    silver: "20",
    gold: "30",
  };

  useEffect(() => {
    let newSubtotal = 0;
    let newDiscount = 0;
    let newGrandTotal = 0;
    if (cartItems) {
      cartItems?.map(async (item: any) => {
        const productDetail = await getCartItemDetails(item.productId);
        newDiscount +=
          (productDetail.discount.percent * productDetail.price) / 100;
        newSubtotal += productDetail.price;
        newGrandTotal = newSubtotal - newDiscount + shipment;
        setSubTotal(newSubtotal);
        setDiscount(newDiscount);
        setGrandTotal(newGrandTotal);
      });
    }
  }, [cartItems]);

  const handelDiscountApply = () => {
    const discountValue = discountCode[discountCodeInput];
    if (discountValue) {
      const discountPercent = parseInt(discountValue);
      const discountAmount = (subtotal * discountPercent) / 100;
      setGrandTotal(subtotal - discountAmount + shipment);
    }
  };

  return (
    <Card sx={{ minHeight: "338px" }}>
      <CardContent>
        <Stack direction={"row"} gap={"25px"} minHeight={"331px"}>
          <Stack direction={"column"}>
            <Typography variant="h5" mb={1.5}>
              Your Order
            </Typography>
            <Stack direction={"column"} mb={6} gap={3}>
              {cartItems?.map((item: any) => (
                <CartItem
                  key={item.productId}
                  cartItemProps={item}
                  changeComponent="payment"
                />
              ))}
              <Stack direction={"row"} gap={"5px"}>
                <TextField
                  placeholder="discount code"
                  value={discountCodeInput}
                  onChange={(e) => setDiscountCodeInput(e.target.value)}
                  sx={{ borderRadius: "8px" }}
                />
                <Button
                  variant="outlined"
                  onClick={handelDiscountApply}
                  sx={{ width: "133px", borderRadius: "8px" }}
                >
                  Apply
                </Button>
              </Stack>
            </Stack>
            <Payment
              subtotal={subtotal}
              discount={discount}
              shipment={shipment}
              grandTotal={grandTotal}
            />
            <Link href={link}>
              <Button
                variant="contained"
                sx={{ mt: "25px", py: "12px", textTransform: "none" }}
                fullWidth
              >
                {buttonText}
              </Button>
            </Link>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
