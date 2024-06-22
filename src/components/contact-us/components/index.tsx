import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Router from "next/router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function ContactUs() {
  const breadcrumbs = [
    <Link key="1" color="inherit" href="/" className="text-lg hover:underline">
      Home
    </Link>,
    <Box key="2">
      <Typography fontSize="18px" color="text.primary">
        Contact us
      </Typography>
    </Box>,
  ];
  return (
    <Box marginBottom={6} marginTop={3}>
      <Stack spacing={2}>
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="large" sx={{ color: "#717171" }} />
          }
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Box
        width="794px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin="auto"
        marginY={5}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: "none",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocationOnOutlinedIcon
                  sx={{ width: "48px", height: "48px" }}
                  color="primary"
                />
                <Typography fontSize="20px" fontWeight="medium">
                  Office
                </Typography>
                <Typography
                  fontSize="15px"
                  fontWeight="light"
                  color="#717171"
                  width="133px"
                  textAlign="center"
                >
                  123 Main Street, Tehran, Iran
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: "none",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EmailOutlinedIcon
                  sx={{ width: "48px", height: "48px" }}
                  color="primary"
                />
                <Typography fontSize="20px" fontWeight="medium">
                  Email
                </Typography>
                <Typography fontSize="15px" fontWeight="light" color="#717171">
                  MaxaTechSupport@gmail.com
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: "none",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CallOutlinedIcon
                  sx={{ width: "48px", height: "48px" }}
                  color="primary"
                />
                <Typography fontSize="20px" fontWeight="medium">
                  Phone
                </Typography>
                <Typography fontSize="15px" fontWeight="light" color="#717171">
                  +98 (912) 123-4567
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" gap={10} justifyContent="center">
        <Box width="470px">
          <Typography fontSize="24px" fontWeight="medium" marginBottom={3}>
            Message us
          </Typography>
          <Typography
            fontSize="20px"
            fontWeight="light"
            color="#717171"
            textAlign="justify"
          >
            We are here to assist you every step of the way. Whether you have a
            question, need technical support, or simply want to share your
            feedback, our dedicated team is ready to listen and provide prompt
            assistance.
          </Typography>
        </Box>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          width="392px"
        >
          <TextField
            id="outlined-basic"
            label="* Your name"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="* Email" variant="outlined" />
          <TextField
            id="outlined-multiline-static"
            label="Massage"
            multiline
            rows={7}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontWeight: "normal",
              fontSize: "1.125",
              textTransform: "none",
              width: "184px",
              paddingX: "16px",
              paddingY: "8px",
              alignSelf: "flex-end",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
