import { Button } from "@mui/material";
import Link from "next/link";

type PaymentButtonProps = {
    link: string;
    buttonText:string
}
export default function PaymentButton({link,buttonText}:PaymentButtonProps) {
  return (
    <>
      <Link href={link}>
        <Button
          variant="contained"
          sx={{ mt: "25px", py: "12px", textTransform: "none" }}
          fullWidth
        >
          {buttonText}
        </Button>
      </Link>
    </>
  );
}
