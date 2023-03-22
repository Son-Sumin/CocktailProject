import { authService, dbService } from 'fbase';
import React, { useState } from 'react';

const AuthForm = () => {
    const [authObj, setAuthObj] = useState({
        id: '',
        password: '',
        name: '',
        nickname: '',
        birth: '',
        phoneNumber: '',
        gender: ''
    });
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [checkError, setCheckError] = useState("");
    const [error, setError] = useState("");

    // 닉네임 중복검사 함수
    const checkIfAvailable = async (value) => {
        const IDcheck = await dbService
            .collection("User_Profile")
            .where("displayName", "==", value)
            .get();
        if (IDcheck.docs.length === 0 && value.length > 0) {
            setCheckError("사용 가능한 닉네임입니다.");
            setNicknameCheck(true);
        }
        else {
            if (value.length > 0) setCheckError("이미 다른 사용자가 사용 중인 닉네임입니다.");
            else setCheckError("");
            setNicknameCheck(false);
        }
    };

    const onChange = async (event) => {
        const { target: { name, value } } = event;
        setAuthObj(authObj => ({ ...authObj, [name]: value }));

        if (name === "nickname") {
            await checkIfAvailable(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            let data;

            if (!nicknameCheck) throw new Error('닉네임을 확인해주세요.');
            data = await authService.createUserWithEmailAndPassword(authObj.email, authObj.password);
            await dbService.collection("User_Profile").add({ displayName: authObj.displayName, uid: data.user.uid });

        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <>
            <form className="centerContainer authForm" onSubmit={onSubmit}>
                <div>
                    <input
                        name="id"
                        type="text"
                        placeholder="Email Address"
                        required
                        value={authObj.id}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password (at least 6 characters)"
                        required
                        value={authObj.password}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        name="nickname"
                        type="text"
                        placeholder="nickname"
                        required
                        value={authObj.nickname}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        name="birth"
                        type="text"
                        placeholder="birth"
                        required
                        value={authObj.birth}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        name="phoneNumber"
                        type="text"
                        placeholder="phoneNumber"
                        required
                        value={authObj.phoneNumber}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        name="gender"
                        type="text"
                        placeholder="gender"
                        required
                        value={authObj.gender}
                        onChange={onChange}
                    />
                </div>
                <span id="checkMess">{checkError}</span>
                <input type="submit" id="submitBtn" value="Sign Up" />
                <span id="error">{error}</span>
            </form>
        </>
    );
};

export default AuthForm;
