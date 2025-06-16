export default function MovieInfoSection({ movieData }) {
  return (
    <section>
      <h2>줄거리</h2>
      <p>{movieData.overview}</p>
      {/* 추가 정보 */}
    </section>
  );
}
