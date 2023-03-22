/* eslint-disable */
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";

function Login(props) {
    const { setIsLoggedIn } = props;

    const [id, setUserId] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/member/login`, { 
                id: id, 
                password: password });
            const accessToken = response.data.accessToken;
            
            // 로그인 후 토큰을 localStorage에 저장
            localStorage.setItem('accessToken', accessToken);
            
            // 로그인 상태에 변화를 줌
            setIsLoggedIn(true);

            // 이후 메인화면으로 복귀
            navigate("/");

            console.log("accessToken: " + accessToken);

            alert("로그인 성공!!");
          } catch (error) {
            console.error(error);
            alert("로그인 실패!!");
        }
    };

    return (
        <div className="signature-join-container">
            <div className="signature-join-contents">
                <h1 style={{margin:'0px'}}>모여Bar 로그인</h1>
            </div>
            <div className="signature-join-contents" style={{display:'grid', gridTemplateRows:'1fr 1fr'}}>
                <label>
                    <h3>아이디 ▼</h3>
                    <input type="text" placeholder="아이디를 입력해주세요:)" className="signature-join-contents-2" value={id} onChange={e => setUserId(e.target.value)}></input>
                    <p style={{textAlign:'right', marginTop:'5px'}}>{id.length}/30</p>
                </label>
                <label>
                    <h3>패스워드 ▼</h3>
                    <input type="password" placeholder="패스워드를 입력해주세요:)" className="signature-join-contents-2" value={password} onChange={e => setPassword(e.target.value)}></input>
                    <p style={{textAlign:'right', marginTop:'5px'}}>{password.length}/30</p>
                </label>
                <div style={{display:'grid', gridTemplateColumns:'1fr 200px', columnGap:'2%'}}>
                    <Link to="/">
                        <button className="signature-contents-btn">취소</button>
                    </Link>
                    <button type="submit" className="signature-contents-btn" onClick={handleLogin}>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default Login;