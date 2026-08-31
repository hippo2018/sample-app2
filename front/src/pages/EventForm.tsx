import {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  ArrowBack,
  Save,
} from "@mui/icons-material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useForm,
} from "react-hook-form";

import {
  z,
} from "zod";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  format,
} from "date-fns";

import {
  createEvent,
  getEvent,
  updateEvent,
} from "../api/events";

import type {
  EventInput,
} from "../types/event";


// ------------------------------
// Zod スキーマ
// ------------------------------

const eventSchema = z.object({

  title: z
    .string()
    .trim()
    .min(
      1,
      "タイトルを入力してください。"
    )
    .max(
      50,
      "タイトルは50文字以内で入力してください。"
    ),

  date: z
    .string()
    .min(
      1,
      "日付を入力してください。"
    )
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "日付の形式が不正です。"
    ),

  description: z
    .string()
    .max(
      200,
      "説明は200文字以内で入力してください。"
    ),

});


// Zodから型を自動生成

type EventFormData =
  z.infer<typeof eventSchema>;


// ------------------------------
// コンポーネント
// ------------------------------

export default function EventForm() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();


  // 編集モードかどうか

  const isEdit =
    Boolean(id);


  const eventId =
    Number(id);


  // 状態

  const [loading, setLoading] =
    useState(isEdit);

  const [saving, setSaving] =
    useState(false);

  const [loadError, setLoadError] =
    useState("");

  const [saveError, setSaveError] =
    useState("");


  // ------------------------------
  // React Hook Form
  // ------------------------------

  const {
    register,
    reset,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<EventFormData>({

    resolver:
      zodResolver(eventSchema),

    defaultValues: {

      title: "",

      date: format(
        new Date(),
        "yyyy-MM-dd"
      ),

      description: "",

    },

  });


  // ------------------------------
  // 編集データ取得
  // ------------------------------

  useEffect(() => {

    // 新規登録なら何もしない

    if (
      !isEdit ||
      !Number.isInteger(eventId) ||
      eventId <= 0
    ) {

      setLoading(false);

      return;

    }


    const loadEvent =
      async () => {

        setLoading(true);

        setLoadError("");


        try {

          const event =
            await getEvent(
              eventId
            );


          // フォームへセット

          reset({

            title:
              event.title,

            date:
              event.date,

            description:
              event.description,

          });

        } catch (err) {

          setLoadError(

            err instanceof Error
              ? err.message
              : "予定の取得に失敗しました。"

          );

        } finally {

          setLoading(false);

        }

      };


    void loadEvent();

  }, [
    eventId,
    isEdit,
    reset,
  ]);


  // ------------------------------
  // 登録・更新
  // ------------------------------

  const onSubmit =
    async (
      data: EventFormData
    ) => {

      setSaving(true);

      setSaveError("");


      try {

        const input: EventInput = {

          title:
            data.title.trim(),

          date:
            data.date,

          description:
            data.description.trim(),

        };


        // 編集

        if (isEdit) {

          await updateEvent(
            eventId,
            input
          );

        }

        // 新規登録

        else {

          await createEvent(
            input
          );

        }


        // 一覧へ戻る

        navigate("/events");

      } catch (err) {

        setSaveError(

          err instanceof Error
            ? err.message
            : "保存に失敗しました。"

        );

      } finally {

        setSaving(false);

      }

    };


  // ------------------------------
  // 読み込み中
  // ------------------------------

  if (loading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 6,
        }}
      >

        <CircularProgress />

      </Box>

    );

  }


  // ------------------------------
  // 読み込みエラー
  // ------------------------------

  if (loadError) {

    return (

      <>

        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {loadError}
        </Alert>


        <Button
          startIcon={<ArrowBack />}
          onClick={() =>
            navigate("/events")
          }
        >
          予定一覧へ戻る
        </Button>

      </>

    );

  }


  // ------------------------------
  // 画面
  // ------------------------------

  return (

    <Box>

      {/* タイトル */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          mb: 3,
        }}
      >

        <Button
          startIcon={<ArrowBack />}
          onClick={() =>
            navigate("/events")
          }
        >
          戻る
        </Button>


        <Typography variant="h4">
          {isEdit
            ? "予定編集"
            : "予定登録"}
        </Typography>

      </Box>


      {/* フォーム */}

      <Paper
        sx={{
          p: {
            xs: 2,
            md: 3,
          },

          maxWidth: 700,
        }}
      >

        {/* 保存エラー */}

        {saveError && (

          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {saveError}
          </Alert>

        )}


        <form
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >


            {/* 日付 */}

            <TextField
              label="日付"
              type="date"
              fullWidth
              {...register("date")}
              error={
                !!errors.date
              }
              helperText={
                errors.date?.message
              }
              disabled={saving}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />


            {/* 説明 */}

            <TextField
              label="説明"
              multiline
              rows={5}
              fullWidth
              {...register(
                "description"
              )}
              error={
                !!errors.description
              }
              helperText={
                errors.description?.message ??
                "200文字以内"
              }
              disabled={saving}
            />


            {/* 保存 */}

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<Save />}
              disabled={saving}
            >
              {saving
                ? "保存中..."
                : isEdit
                  ? "更新"
                  : "登録"}
            </Button>

          </Box>

        </form>

      </Paper>

    </Box>

  );
}
