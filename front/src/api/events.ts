import type {
  Event,
  EventInput,
} from "../types/event";

const API_URL =
  "http://localhost/sample-app/php/api/events.php";


// --------------------------------
// APIエラーメッセージ
// --------------------------------

async function getErrorMessage(
  response: Response
): Promise<string> {

  try {

    const body =
      await response.json();

    return (
      body.message ??
      "APIエラーが発生しました。"
    );

  } catch {

    return `APIエラー (${response.status})`;

  }
}


// --------------------------------
// 一覧取得
// --------------------------------

export async function getEvents(): Promise<Event[]> {

  const response =
    await fetch(API_URL);

  if (!response.ok) {

    throw new Error(
      await getErrorMessage(response)
    );

  }

  return response.json();
}


// --------------------------------
// 1件取得
// --------------------------------

export async function getEvent(
  id: number
): Promise<Event> {

  const response =
    await fetch(
      `${API_URL}?id=${id}`
    );

  if (!response.ok) {

    throw new Error(
      await getErrorMessage(response)
    );

  }

  return response.json();
}


// --------------------------------
// 新規登録
// --------------------------------

export async function createEvent(
  data: EventInput
): Promise<Event> {

  const response =
    await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );


  if (!response.ok) {

    throw new Error(
      await getErrorMessage(response)
    );

  }


  return response.json();
}


// --------------------------------
// 更新
// --------------------------------

export async function updateEvent(
  id: number,
  data: EventInput
): Promise<Event> {

  const response =
    await fetch(
      `${API_URL}?id=${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );


  if (!response.ok) {

    throw new Error(
      await getErrorMessage(response)
    );

  }


  return response.json();
}


// --------------------------------
// 削除
// --------------------------------

export async function deleteEvent(
  id: number
): Promise<void> {

  const response =
    await fetch(
      `${API_URL}?id=${id}`,
      {
        method: "DELETE",
      }
    );


  if (!response.ok) {

    throw new Error(
      await getErrorMessage(response)
    );

  }

}
