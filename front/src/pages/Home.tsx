import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import {
  CalendarMonth,
  EventAvailable,
} from "@mui/icons-material";

export default function Home() {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        ホーム
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        予定管理アプリへようこそ。
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <CalendarMonth
                sx={{
                  fontSize: 40,
                  mb: 1,
                }}
              />

              <Typography variant="h5">
                予定管理
              </Typography>

              <Typography
                color="text.secondary"
              >
                予定を登録・編集・削除できます。
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <EventAvailable
                sx={{
                  fontSize: 40,
                  mb: 1,
                }}
              />

              <Typography variant="h5">
                日付管理
              </Typography>

              <Typography
                color="text.secondary"
              >
                date-fnsを使って日付を処理します。
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
