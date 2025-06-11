import React, { useEffect, useState } from "react";
import {
  getUserReviews,
  deleteReview,
  reviseReview,
} from "../../api/reviewApi";
import { fetchMovieDetails } from "../../api/tmdbApi";
import EditReviewModal from "../../components/Review/EditReviewModal";
import Rating from "react-rating";
import { Star } from "lucide-react";
import styles from "./UserReviews.module.css";

export default function UserReviews({ userId }) {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fixReview, setFixReview] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchReviews = async () => {
      try {
        const res = await getUserReviews(userId);
        const raw = Array.isArray(res.data) ? res.data : [];
        const enriched = await Promise.all(
          raw.map(async (review) => {
            try {
              const movie = await fetchMovieDetails(review.movie_id);
              return { ...review, movie };
            } catch (err) {
              console.error(
                `❌ TMDB 요청 실패 (movie_id: ${review.movie_id})`,
                err
              );
              return { ...review, movie: null };
            }
          })
        );
        setBoardList(enriched);
      } catch (err) {
        console.error("❌ 사용자 리뷰 조회 실패:", err);
        setBoardList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  //리뷰 삭제
  const handleDelete = async (reviewId) => {
    if (!window.confirm("정말 이 리뷰를 삭제하겠습니까?")) return;
    try {
      await deleteReview(reviewId);
      setBoardList((prev) => prev.filter((r) => r.id == reviewId));
    } catch (err) {
      console.error("리뷰 삭제 실패", err);
      alert("리뷰 삭제에 실패하였습니다.");
    }
  };

  //리뷰 수정
  const handleUpdate = async (UpdatedReview) => {
    try {
      await reviseReview(UpdatedReview.id, {
        content: UpdatedReview.content,
        rating: UpdatedReview.rating,
      });
      setBoardList((prev) =>
        prev.map((r) => (UpdatedReview.id ? { ...r, ...UpdatedReview } : r))
      );
      setFixReview(null);
    } catch (err) {
      console.error("수정 실패", err);
    }
  };

  return (
    <section>
      <h3>작성한 리뷰</h3>
      {loading ? (
        <p>로딩 중...</p>
      ) : boardList.length === 0 ? (
        <p>작성한 리뷰가 없습니다.</p>
      ) : (
        <ul className={styles["my-review-list__container"]}>
          {boardList.map((review) => (
            <li key={review.id} className={styles["my-review-list"]}>
              {review.movie && (
                <section className={styles["my-review__container"]}>
                  {/* TMDB API 활용하여 이미지 출력 */}
                  <img
                    src={`https://image.tmdb.org/t/p/w200${review.movie.poster_path}`}
                    alt={review.movie.title}
                    className={styles["my-review__thumbnail"]}
                  />
                  <article>
                    <strong>{review.movie.title}</strong>
                    <Rating
                      initialRating={review.rating}
                      readonly
                      emptySymbol={<Star color="lightgray" size={20} />}
                      fullSymbol={<Star color="gold" size={20} fill="gold" />}
                    />
                    <p>{review.content}</p>
                    <button onClick={() => setFixReview(review)}>수정</button>
                    <button onClick={() => handleDelete(review.id)}>
                      삭제
                    </button>
                  </article>
                </section>
              )}
            </li>
          ))}
        </ul>
      )}
      {/* 리뷰 수정할 때 모달 사용 */}
      <EditReviewModal
        isOpen={!!fixReview}
        onClose={() => setFixReview(null)}
        review={fixReview}
        onSubmit={handleUpdate}
      />
    </section>
  );
}
