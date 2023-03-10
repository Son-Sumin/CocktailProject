/* eslint-disable */
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Join() {
    const navigate = useNavigate();

    // JSON데이터를 저장할 객체
    const [joinMember,setJoinMember] = useState({
        id: '',  
        password: '',
        name: '',
        nickname: '',
        birth: '',
        phoneNumber: '',
        gender: ''
    });

    // input에 넣은 값을 항상 value로 업데이트 해주고 빈state객체에 저장해줌
    const handleChange = (e) => {
        const {name, value} = e.target;

        setJoinMember({
            ...joinMember,
            [name]: value
        });
    };

    const handleJoin = async (e) => {
        // form을 제출 했을때 새로고침되는 것을 방지
        e.preventDefault();

        // FormData객체에 데이터 저장
        const formData = new FormData();
        formData.append('id', joinMember.id);
        formData.append('password', joinMember.password);
        formData.append('name', joinMember.name);
        formData.append('nickname', joinMember.nickname);
        formData.append('birth', joinMember.birth);
        formData.append('phoneNumber', joinMember.phoneNumber);
        formData.append('gender', joinMember.gender);

        // 엔드포인트에 JSON파일 전달
        try {
            const res = await axios.post('/member/join', formData, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }); // http://192.168.0.4:8080/member/join
            alert("회원가입 성공!!");
            navigate("/");
        } catch(err) {
            alert("회원가입 실패");
        }

        // 콘솔에 띄우기
        console.log(joinMember);
    };

    return (
        <div className="signature-join-container">
            <div className="signature-join-contents">
                <span>제목</span>
            </div>
            <form className="signature-join-contents" onSubmit={handleJoin}>
                <label>
                    <h3>아이디 ▼</h3>
                    <input type="text" placeholder="아이디를 입력해주세요:)" className="signature-join-contents-2" name="id" value={joinMember.id} onChange={handleChange}></input>
                    <p style={{textAlign:'right', marginTop:'5px'}}>{joinMember.id.length}/30</p>
                </label>
                <label>
                    <h3>패스워드 ▼</h3>
                    <input type="password" placeholder="패스워드를 입력해주세요:)" className="signature-join-contents-2" name="password" value={joinMember.password} onChange={handleChange}></input>
                    <p style={{textAlign:'right', marginTop:'5px'}}>{joinMember.password.length}/30</p>
                </label>
                <label>
                    <h3>이름 ▼</h3>
                    <input type="text" placeholder="이름을 지어주세요:)" className="signature-join-contents-2" name="name" value={joinMember.name} onChange={handleChange}></input>
                    <p style={{textAlign:'right', marginTop:'5px'}}>{joinMember.name.length}/30</p>
                </label>
                <label>
                    <h3>닉네임 ▼</h3>
                    <input type="text" placeholder="닉네임을 지어주세요:)" className="signature-join-contents-2" name="nickname" value={joinMember.nickname} onChange={handleChange}></input>
                    <p style={{textAlign:'right', marginTop:'5px'}}>{joinMember.nickname.length}/30</p>
                </label>
                <label>
                    <h3>생년월일 ▼</h3>
                    <input type="date" className="signature-join-contents-2" style={{marginBottom:'20px'}} name="birth" value={joinMember.birth} onChange={handleChange}></input>
                </label>
                <label>
                    <h3>핸드폰번호 ▼</h3>
                    <input type="tel" className="signature-join-contents-2" style={{marginBottom:'20px'}} placeholder="000-0000-0000" name="phoneNumber" value={joinMember.phoneNumber} onChange={handleChange}></input>
                </label>
                <div>
                    <h3>성별 ▼</h3>
                    <label>
                        <span>남성</span>
                        <input type="checkbox" name="gender" value='male' checked={joinMember.gender === 'male'} onChange={handleChange} />
                    </label>
                    <label>
                        <span>여성</span>
                        <input type="checkbox" name="gender" value='female' checked={joinMember.gender === 'female'} onChange={handleChange} />
                    </label>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 200px', columnGap:'2%'}}>
                    <Link to="/">
                        <button className="signature-contents-btn">취소</button>
                    </Link>
                    <button type='submit' className="signature-contents-btn">회원가입</button>
                </div>
            </form>
        </div>
    )
}

export default Join;