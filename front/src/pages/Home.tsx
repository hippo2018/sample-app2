export default function Home() {
  return (
    <>
      <div className="page-header">
        <h2>ホーム</h2>
        <p>
          予定管理アプリへようこそ。
        </p>
      </div>

      <div className="feature-grid">
        <section className="card">
          <div
            className="card__icon"
            aria-hidden="true"
          >
            □
          </div>
          <h3>予定管理</h3>
          <p>
            予定を登録・編集・削除できます。
          </p>
        </section>

        <section className="card">
          <div
            className="card__icon"
            aria-hidden="true"
          >
            ✓
          </div>
          <h3>日付管理</h3>
          <p>
            date-fnsを使って日付を処理します。
          </p>
        </section>
      </div>
    </>
  );
}
