/* eslint-disable */
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MyPage(props) {
    const {user} = props;
    const bannerLogo = process.env.PUBLIC_URL + '/project-logo.png';

    const [selectedMenu, setSelectedMenu] = useState('profile'); // 현재 선택된 메뉴

    // 메뉴 클릭시 색상 변경
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    }

    return (
        <div className="mypage-container">
            {/* 마이페이지 좌측 메뉴바 */}
            <div className="mypage-left">
                <div style={{borderRadius:'10px', overflow:'hidden', width:'250px', height:'130px', border:'1px solid rgba(224, 218, 201)'}}>
                    <img src={bannerLogo} alt="project-logo"/>
                </div>
                <div>
                    <div className="mypage-profile-picture">

                    </div>
                    <lavel>
                        <div style={{textAlign:'center'}}>
                            <h2 style={{marginTop:'5px', cursor:'default'}}>{user.name}</h2>
                        </div>
                    </lavel>
                </div>
                <div className={`mypage-left-menu ${selectedMenu === 'profile' ? 'selected' : ''}`} onClick={() => handleMenuClick('profile')} >
                    <span>프로필</span>
                </div>
                <div className={`mypage-left-menu ${selectedMenu === 'favorite' ? 'selected' : ''}`} onClick={() => handleMenuClick('favorite')} >
                    <span>관심목록</span>
                </div>
                <Link to="/" className="mypage-left-menu">
                    <span>🚪 홈으로 돌아가기</span>
                </Link>
            </div>

            {/* 마이페이지 우측 */}
            <div className="mypage-right">
                <div>
                    <div className="mypage-profile-picture" style={{margin:'auto', width:'150px', height:'150px', marginTop:'5%'}}></div>
                    <h2 style={{margin:'10px 0px', textAlign:'center', cursor:'default'}}>{user.name}</h2>
                    <div style={{margin:'10px 0px', textAlign:'center'}}>
                        <span style={{border:'1px solid black', padding:'5px', borderRadius:'5px', cursor:'pointer'}}>프로필 사진 변경</span>
                    </div>
                </div>
                <div className="mypage-right-contents">
                    <div className="mypage-right-contents-keys" style={{gridColumn:'2/3', borderTop:'1px solid gray'}}>
                        <h2>이름</h2>
                    </div>
                    <div className="mypage-right-contents-values" style={{gridColumn:'3/4', borderTop:'1px solid gray'}}>{user.name}</div>

                    <div className="mypage-right-contents-keys" style={{gridColumn:'2/3'}}>
                        <h2>닉네임</h2>
                    </div>
                    <div className="mypage-right-contents-values" style={{gridColumn:'3/4'}}>{user.nickname}</div>

                    <div className="mypage-right-contents-keys" style={{gridColumn:'2/3'}}>
                        <h2>아이디</h2>
                    </div>
                    <div className="mypage-right-contents-values" style={{gridColumn:'3/4'}}>{user.id}</div>

                    <div className="mypage-right-contents-keys" style={{borderBottom:'0px', gridColumn:'2/3', marginBottom:'50px', borderBottom:'1px solid gray'}}>
                        <h2>핸드폰번호</h2>
                    </div>
                    <div className="mypage-right-contents-values" style={{borderBottom:'0px', gridColumn:'3/4', marginBottom:'50px', borderBottom:'1px solid gray'}}>{user.phoneNumber}</div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;