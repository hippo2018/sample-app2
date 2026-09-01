import {
  useEffect,
  useState,
} from "react";

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

type EventFormData =
  z.infer<typeof eventSchema>;

export default function EventForm() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const isEdit =
    Boolean(id);

  const eventId =
    Number(id);

  const isValidEventId =
    Number.isInteger(eventId) &&
    eventId > 0;

  const [loading, setLoading] =
    useState(
      isEdit &&
      isValidEventId
    );

  const [saving, setSaving] =
    useState(false);

  const [loadError, setLoadError] =
    useState("");

  const [saveError, setSaveError] =
    useState("");

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

  useEffect(() => {
    if (
      !isEdit ||
      !isValidEventId
    ) {
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
    isValidEventId,
    reset,
  ]);

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

        if (isEdit) {
          await updateEvent(
            eventId,
            input
          );
        } else {
          await createEvent(
            input
          );
        }

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

  if (loading) {
    return (
      <div className="loading">
        <span className="spinner" />
      </div>
    );
  }

  if (loadError) {
    return (
      <>
        <div className="alert alert--error">
          {loadError}
        </div>

        <button
          type="button"
          className="button button--secondary"
          onClick={() =>
            navigate("/events")
          }
        >
          <span aria-hidden="true">←</span>
          予定一覧へ戻る
        </button>
      </>
    );
  }

  return (
    <>
      <div className="page-header page-header--inline">
        <button
          type="button"
          className="button button--secondary"
          onClick={() =>
            navigate("/events")
          }
        >
          <span aria-hidden="true">←</span>
          戻る
        </button>

        <h2>
          {isEdit
            ? "予定編集"
            : "予定登録"}
        </h2>
      </div>

      <section className="form-panel">
        {saveError && (
          <div className="alert alert--error">
            {saveError}
          </div>
        )}

        <form
          className="event-form"
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }
        >
          <label className="field">
            <span className="field__label">
              タイトル
            </span>
            <input
              type="text"
              {...register("title")}
              disabled={saving}
              aria-invalid={
                Boolean(errors.title)
              }
            />
            <span className="field__hint">
              {errors.title?.message ??
                "50文字以内"}
            </span>
          </label>

          <label className="field">
            <span className="field__label">
              日付
            </span>
            <input
              type="date"
              {...register("date")}
              disabled={saving}
              aria-invalid={
                Boolean(errors.date)
              }
            />
            {errors.date?.message && (
              <span className="field__hint">
                {errors.date.message}
              </span>
            )}
          </label>

          <label className="field">
            <span className="field__label">
              説明
            </span>
            <textarea
              rows={5}
              {...register(
                "description"
              )}
              disabled={saving}
              aria-invalid={
                Boolean(errors.description)
              }
            />
            <span className="field__hint">
              {errors.description?.message ??
                "200文字以内"}
            </span>
          </label>

          <button
            type="submit"
            className="button button--primary button--large"
            disabled={saving}
          >
            <span aria-hidden="true">✓</span>
            {saving
              ? "保存中..."
              : isEdit
                ? "更新"
                : "登録"}
          </button>
        </form>
      </section>
    </>
  );
}
