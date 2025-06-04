//routes: 클라이언트에서 오는 API 요청을 처리함
import { Router } from 'express';
import { getMyInfo, getInfoById, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js'
const router = Router();
//이용자 정보를 조회, 수정, 삭제하는 라우팅

//내 정보 조회 - api/user/me
router.get('/me', authenticateJWT, getMyInfo);
//이용자 정보 조회 - api/user/:id
router.get('/:id', getInfoById);
//이용자 정보 갱신
router.put('/:id', authenticateJWT, (req, res, next) => {
    if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({message: '본인만 수정할 수 있습니다.'})
    }
    next();
}, updateUser);
//이용자 정보 삭제
router.delete('/:id', authenticateJWT, (req, res, next) => {
    if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({message: '본인만 삭제제할 수 있습니다.'})
    }
    next();
}, deleteUser);

export default router;