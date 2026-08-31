import {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";

import {
  Add,
  Delete,
  Edit,
  Refresh,
} from "@mui/icons-material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  format,
  parseISO,
} from "date-fns";

import {
  ja,
} from "date-fns/locale";

import {
  deleteEvent,
  getEvents,
} from "../api/events";

import type {
  Event,
} from "../types/event";


// --------------------------------
// 日付表示
// --------------------------------

function formatEventDate(
  date: string
) {
  return format(
    parseISO(date),
    "yyyy年M月d日(E)",
    {
      locale: ja,
    }
  );
}


// --------------------------------
// コンポーネント
// --------------------------------

export default function EventList() {

  const navigate = useNavigate();


  const [events, setEvents] =
    useState<Event[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // --------------------------------
  // 一覧取得
  // --------------------------------

  const loadEvents = async () => {

    setLoading(true);
    setError("");

    try {

      const data =
        await getEvents();

      setEvents(data);

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "予定の取得に失敗しました。"
      );

    } finally {

      setLoading(false);

    }
  };


  // --------------------------------
  // 初回読み込み
  // --------------------------------

  useEffect(() => {

    const loadInitialEvents =
      async () => {

        try {

          const data =
            await getEvents();

          setEvents(data);

        } catch (err) {

          setError(
            err instanceof Error
              ? err.message
              : "予定の取得に失敗しました。"
          );

        } finally {

          setLoading(false);

        }
      };


    void loadInitialEvents();

  }, []);


  // --------------------------------
  // 削除
  // --------------------------------

  const handleDelete =
    async (
      id: number
    ) => {

      const result =
        window.confirm(
          "この予定を削除しますか？"
        );

      if (!result) {
        return;
      }


      try {

        await deleteEvent(id);


        setEvents(
          (current) =>
            current.filter(
              (event) =>
                event.id !== id
            )
        );


      } catch (err) {

        setError(
          err instanceof Error
            ? err.message
            : "削除に失敗しました。"
        );

      }
    };


  // --------------------------------
  // 画面
  // --------------------------------

  return (

    <>

      {/* ヘッダー */}

      <Box
        sx={{
          display: "flex",

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          justifyContent:
            "space-between",

          alignItems: {
            xs: "stretch",
            sm: "center",
          },

          gap: 2,

          mb: 3,
        }}
      >

        <Typography variant="h4">
          予定一覧
        </Typography>


        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}
        >

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() =>
              void loadEvents()
            }
            disabled={loading}
          >
            更新
          </Button>


          <Button
            component={Link}
            to="/events/new"
            variant="contained"
            startIcon={<Add />}
          >
            予定登録
          </Button>

        </Box>

      </Box>


      {/* エラー */}

      {error && (

        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          {error}
        </Alert>

      )}


      {/* 読み込み中 */}

      {loading ? (

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 6,
          }}
        >

          <CircularProgress />

        </Box>

      ) : events.length === 0 ? (

        <Alert severity="info">
          予定はありません。
        </Alert>

      ) : (

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >

          {events.map(
            (event) => (

              <Card
                key={event.id}
              >

                <CardContent>

                  <Box
                    sx={{
                      display: "flex",

                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },

                      justifyContent:
                        "space-between",

                      alignItems: {
                        xs: "flex-start",
                        sm: "center",
                      },

                      gap: 2,
                    }}
                  >

                    {/* 内容 */}

                    <Box>

                      <Typography
                        variant="h6"
                      >
                        {event.title}
                      </Typography>


                      <Typography
                        color="primary"
                        sx={{
                          mt: 0.5,
                        }}
                      >
                        {formatEventDate(
                          event.date
                        )}
                      </Typography>


                      <Typography
                        color="text.secondary"
                        sx={{
                          mt: 1,
                        }}
                      >
                        {event.description ||
                          "説明なし"}
                      </Typography>

                    </Box>


                    {/* 操作 */}

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >

                      <IconButton
                        color="primary"
                        aria-label="編集"
                        onClick={() =>
                          navigate(
                            `/events/${event.id}/edit`
                          )
                        }
                      >

                        <Edit />

                      </IconButton>


                      <IconButton
                        color="error"
                        aria-label="削除"
                        onClick={() =>
                          void handleDelete(
                            event.id
                          )
                        }
                      >

                        <Delete />

                      </IconButton>

                    </Box>

                  </Box>

                </CardContent>

              </Card>

            )
          )}

        </Box>

      )}

    </>
  );
}
