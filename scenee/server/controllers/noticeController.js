import {
  fetchBoards,
  fetchBoardById,
  fetchNoticeBoards,
  fetchEventBoards,
  insertNotice,
} from "../models/noticeModel.js";

// 전체 게시판
export const getBoards = async (req, res) => {
  try {
    const data = await fetchBoards();
    res.json(data);
  } catch {
    res.status(500).json({ message: "전체 목록 조회 실패" });
  }
};

// 상세 조회
export const getBoardById = async (req, res) => {
  try {
    const data = await fetchBoardById(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: "게시글이 존재하지 않습니다." });
  } catch {
    res.status(500).json({ message: "게시글 조회 실패" });
  }
};

// 공지사항 목록
export const getNoticeBoards = async (req, res) => {
  try {
    const data = await fetchNoticeBoards();
    res.json(data);
  } catch {
    res.status(500).json({ message: "공지 목록 조회 실패" });
  }
};

// 이벤트 목록
export const getEventBoards = async (req, res) => {
  try {
    const data = await fetchEventBoards();
    res.json(data);
  } catch (err) {
    console.error("getEventBoards 에러 발생:", err);
    // 개발 중에는 err.message, err.stack 까지 내려주면 빨리 원인 파악에 도움이 됩니다.
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

// 공지/이벤트 생성
export const createNotice = async (req, res) => {
  try {
    console.log("createNotice req.body:", req.body);
    await insertNotice(req.body);
    res.status(201).json({ message: "공지 생성 완료" });
  } catch (err) {
    console.error("createNotice 에러 발생:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};
