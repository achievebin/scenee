//아이디 유효성 검증
export const validateUserName = (username) => {
    if (username.length < 8) {
        return '아이디는 8자 이상이어야 합니다.';
    }
    return null;

}
//비밀번호 유효성 검증
export const validatePassword = (password) => {
    const pwRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z!@#$%^&*0-9]{8,19}$/;
    if (!pwRegex.test(password)) {
        return '비밀번호는 8~19자, 영문자·특수문자·숫자 각각 1개 이상 포함되어야 합니다.';
    }
    return null;
}
//비밀번호 일치 검증
export const verifyPasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return '비밀번호가 일치하지 않습니다.'
    }
    return null; 
}

//닉네임 유효성 검증
export const validateNickname = (nickname) => {
    if (!nickname || nickname <2) {
        return '닉네임은 최소 2자 이상이어야 합니다.'
    }
    return null;
}

//이메일 유효성 검증
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return '유효한 이메일 주소를 입력해주세요.'
    }
}