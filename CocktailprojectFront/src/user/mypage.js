/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { func } from "prop-types";

// 마이페이지 프로필 (하위컴포넌트)
function MyPageProfile(props) {
    const {user} = props;

    return (
        <div className="mypage-right" style={{display:'grid', gridTemplateRows:'1fr 1fr'}}>
            <div>
                <div className="mypage-profile-picture" style={{margin:'auto', width:'150px', height:'150px', marginTop:'5%'}}></div>
                <div style={{margin:'30px 0px', textAlign:'center'}}>
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
    )
}



// 마이페이지 찜목록 (하위컴포넌트)
function MyPageFavorite(props) {
    // App.js에서 유저 정보 불러옴
    const {user} = props;

    // 유저가 좋아요 한 칵테일을 저장할 state
    const [favoriteCocktail, setFavoriteCocktail] = useState([]);

    // 렌더링 할때마다, 유저가 좋아요 한 칵테일을 state에 저장
    useEffect(() => {
        setFavoriteCocktail(user.likeCocktail);
    }, []);

    return (
        <div className="mypage-right">
            <div style={{padding:'3% 5%'}}>
                <h2 style={{cursor:'default'}}>내가 찜한 칵테일 ▼</h2>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', columnGap:'80px', rowGap:'100px', gridAutoFlow: 'row'}}>
                {
                favoriteCocktail.map(function (a, i) {
                    return (
                            <Link to={`/cocktail/${a.cocktail.no}`} key={i}>
                                <div className="cocktail-box">
                                    <img src={a.cocktail.cocktailImages[0].url} width='280px' height='200px' style={{ borderRadius: '10px' }} alt="cocktail"></img>
                                    <div className='cocktail-contents' style={{fontWeight: '800', padding: '10px 0px', backgroundColor:'rgba(224, 218, 201)'}}>{a.cocktail.name}</div>
                                    <div className='cocktail-contents' style={{color: 'rgb(131, 131, 131)', fontSize: '12px', backgroundColor:'rgba(224, 218, 201)' }}>{a.cocktail.cocktailContents}</div>
                                </div>
                            </Link>
                    )   
                })
                }
                </div>
            </div>

            <div style={{padding:'1% 5%', marginTop:'5%'}}>
                <h2 style={{cursor:'default'}}>내가 찜한 시그니처 ▼</h2>
            </div>
        </div>
    )
}



// 마이페이지 (상위컴포넌트)
function MyPage(props) {
    const {user} = props;
    const bannerLogo = process.env.PUBLIC_URL + '/project-log-no.png';

    // 현재 선택된 메뉴
    const [selectedMenu, setSelectedMenu] = useState('profile');

    // 메뉴 클릭시 색상 변경
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    }

    return (
        <div className="mypage-container">
            {/* 마이페이지 좌측 메뉴바 */}
            <div className="mypage-left">
                <Link to="/" style={{borderRadius:'10px', overflow:'hidden', width:'250px', height:'130px', border:'1px solid rgba(224, 218, 201)'}}>
                    <img src={bannerLogo} alt="project-log-no" width={'100%'} />
                </Link>
                <div>
                    <div className="mypage-profile-picture">

                    </div>
                    <div style={{textAlign:'center'}}>
                        <h2 style={{marginTop:'5px', cursor:'default'}}>{user.name}</h2>
                    </div>
                </div>
                <div className={`mypage-left-menu ${selectedMenu === 'profile' ? 'selected' : ''}`} onClick={() => handleMenuClick('profile')} >
                    <span>프로필</span>
                </div>
                <div className={`mypage-left-menu ${selectedMenu === 'favorite' ? 'selected' : ''}`} onClick={() => handleMenuClick('favorite')} >
                    <span>찜목록</span>
                </div>
                <Link to="/" className="mypage-left-menu">
                    <span>🚪 홈으로 돌아가기</span>
                </Link>
            </div>

            {/* 마이페이지 프로필 */}
            {selectedMenu === 'profile' && <MyPageProfile user={user}/>}

            {/* 마이페이지 찜목록 */}
            {selectedMenu === 'favorite' && <MyPageFavorite user={user} />}
        </div>
    )
}

export default MyPage;