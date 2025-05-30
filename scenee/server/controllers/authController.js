//controller: 사용자 입력과 model, view 간의 상호작용을 제어함
import bcrypt from 'bcrypt'
//비밀번호 암호화를 위한 bcrypt 라이브러리 활용
import { createUser, getUserByUsername } from '../models/userModel.js'
//상호작용할 userModel 호출
const saltRound = 10;
//비밀번호를 암호화하기 위한 salt 생성
import jwt from 'jsonwebtoken';

//회원 가입 - api/auth/register
export const registerUser = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
      return res.status(400).json({success: false, message: '아이디와 비밀번호를 입력해야 합니다'});
    }
    try {
        //아이디 중복 확인
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
        return res
        .status(409)   
        .json({ message: '이미 사용 중인 아이디입니다.' });
        //http 응답코드 409(Conflict)
    }
        const hashedPw = await bcrypt.hash(password, saltRound);
        const userId = await createUser(username, hashedPw);
        return res.status(201).json({success: true, message: '회원가입 성공', userId});
        //http 응답코드 201(Created)
    } catch (err) {
        console.error(err);
        return res.status(500).json({success: false, message: '회원가입 실패', error: err.message});
        //http 응답코드 500(Internet Server Error)
    }
}

//로그인 - api/auth/login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({success: false, message:'아이디와 비밀번호를 입력해야 합니다.'})
  }
  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(401).json({ message: '등록된 사용자가 아닙니다.' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok)  return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ message: '로그인 성공', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({success: false, message: '로그인 실패', error: err.message})
  }

};
