import { fetchIdCookie, getCartItemDetails } from "@/layout/navbar/services";
import Payment from "../payment/Payment";
import { useGetCartItems } from "@/layout/navbar/hooks";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

export default function GetPayment() {
  const userId = fetchIdCookie();
  const { data: cartItems } = useGetCartItems(userId);
  const shipment = 22.5;
  const [subtotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    let newSubtotal = 0;
    let newDiscount = 0;
    let newGrandTotal = 0;
    cartItems?.map((item: any) => {
      getCartItemDetails(item.productId).then((productDetail) => {
        newDiscount +=
          (productDetail.discount.percent * productDetail.price) / 100;
        newSubtotal += productDetail.price;
        setSubTotal(newSubtotal);
        setDiscount(newDiscount);
        newGrandTotal = newSubtotal - newDiscount + shipment;
        setGrandTotal(newGrandTotal);
      });
    });
  }, [cartItems]);

  return (
    <Stack direction={"column"}>
      <Payment
        subtotal={subtotal}
        discount={discount}
        shipment={shipment}
        grandTotal={grandTotal}
      />
    </Stack>
  );
}
