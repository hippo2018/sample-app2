import {
  useEffect,
  useState,
} from "react";

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

export default function EventList() {
  const navigate = useNavigate();

  const [events, setEvents] =
    useState<Event[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

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

  useEffect(() => {
    void loadEvents();
  }, []);

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

  return (
    <>
      <div className="page-header page-header--actions">
        <div>
          <h2>予定一覧</h2>
        </div>

        <div className="button-row">
          <button
            type="button"
            className="button button--secondary"
            onClick={() =>
              void loadEvents()
            }
            disabled={loading}
          >
            <span aria-hidden="true">↻</span>
            更新
          </button>

          <Link
            className="button button--primary"
            to="/events/new"
          >
            <span aria-hidden="true">+</span>
            予定登録
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert--error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">
          <span className="spinner" />
        </div>
      ) : events.length === 0 ? (
        <div className="alert alert--info">
          予定はありません。
        </div>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <article
              className="event-card"
              key={event.id}
            >
              <div className="event-card__body">
                <h3>{event.title}</h3>
                <p className="event-card__date">
                  {formatEventDate(
                    event.date
                  )}
                </p>
                <p className="event-card__description">
                  {event.description ||
                    "説明なし"}
                </p>
              </div>

              <div className="event-card__actions">
                <button
                  type="button"
                  className="icon-button icon-button--primary"
                  aria-label="編集"
                  onClick={() =>
                    navigate(
                      `/events/${event.id}/edit`
                    )
                  }
                >
                  <span aria-hidden="true">✎</span>
                </button>

                <button
                  type="button"
                  className="icon-button icon-button--danger"
                  aria-label="削除"
                  onClick={() =>
                    void handleDelete(
                      event.id
                    )
                  }
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
