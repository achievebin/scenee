//controller: 사용자 입력과 model, view 간의 상호작용을 제어함
import bcrypt from 'bcrypt'
//비밀번호 암호화를 위한 bcrypt 라이브러리 활용
import { createUser } from '../models/userModel.js'
//상호작용할 userModel 호출

const saltRound = 10;
//비밀번호를 암호화하기 위한 salt 생성

//회원 가입
export const registerUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const hashedPw = await bcrypt.hash(password, saltRound);
        const userId = createUser(username, hashedPw);
        return res.status(201).json({message: '회원가입 성공', userId});
        //http 응답코드 201(Created)
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: '회원가입 실패', error: err.message});
        //http 응답코드 500(Internet Server Error)
    }
}

//로그인
export const loginUser = async (req, res) => {
    const {username, password} = req.body;
    

}