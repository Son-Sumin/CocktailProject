/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// 관리자의 마이페이지 좌측메뉴바
function AdminMypage(props) {
    const { bannerLogo, user, selectedMenu, handleMenuClick } = props;

    return (
        <div className="mypage-left">
            <Link to="/" style={{borderRadius:'10px', overflow:'hidden', width:'250px', height:'130px', border:'1px solid rgba(224, 218, 201)'}}>
                <img src={bannerLogo} alt="project-log-no" width={'100%'} />
            </Link>
            <div>
                <div className="mypage-profile-picture">
                    <img className="mypage-profile-picture-img" src={`${process.env.REACT_APP_ENDPOINT}${user.profileImage}`} alt="profile-image" />
                </div>
                <div style={{textAlign:'center'}}>
                    <h2 style={{marginTop:'5px', cursor:'default'}}>{user.name}</h2>
                </div>
            </div>
            <div className={`mypage-left-menu ${selectedMenu === 'profile' ? 'selected' : ''}`} onClick={() => handleMenuClick('profile')} >
                <span>프로필</span>
            </div>
            <div className={`mypage-left-menu ${selectedMenu === 'controlBanner' ? 'selected' : ''}`} onClick={() => handleMenuClick('controlBanner')} >
                <span>배너관리</span>
            </div>
            <div className={`mypage-left-menu ${selectedMenu === 'controlUser' ? 'selected' : ''}`} onClick={() => handleMenuClick('controlUser')} >
                <span>유저관리</span>
            </div>
        </div>
    )
}

// 관리자의 마이페이지중 배너관리 (하위컴포넌트)
function ControlBanner(props) {
    const { user, banner } = props;

    const [allUser, setAllUser] = useState([]);
    const [allBanner, setAllBanner] = useState([]);
    
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    const uploadPhoto = process.env.PUBLIC_URL + '/upload-photo.png'; // 이미지 업로드 버튼

    useEffect(() => {
        setAllUser(user);
    }, []);

    useEffect(() => {
        setAllBanner(banner);
    }, []);

    const handleClickPhoto = () => {
        fileInputRef.current.click();
    }

    const handleFilesChange = (e) => {
        e.preventDefault();

        setFile(e.target.files[0]);

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }


    return (
        <div className="mypage-right" style={{display:'grid', gridTemplateRows:'1fr 1fr'}}>
            <div style={{display:'grid', gridTemplateColumns:'300px 1fr', padding:'50px'}}>
                <div style={{width:'200px', height:'200px'}}>
                    <button type='button' className='signature-picture-button' onClick={handleClickPhoto}>
                        <img src={uploadPhoto} alt="이미지 업로드 버튼"/>
                        <p className='signature-picture-button-text'>사진 업로드</p>
                    </button>
                    <input ref={fileInputRef} type="file" name='files' multiple onChange={handleFilesChange} style={{display:'none'}}></input>  
                </div>

                <div>
                    <div className="mypage-banner-preview-box" style={(previewUrl === null) ? null : {overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                    {(previewUrl == null) ?
                    (<h1 style={{textAlign:'center', cursor:'default'}}>배너 사진 업로드</h1>) 
                        : <img src={previewUrl} alt="file preview" style={{width:'100%', height:'100%'}} />}
                    </div>
                </div>
            </div>

            <div style={{padding:'50px'}}>
                <h3>배너 목록 ▼</h3>
                <div className="mypage-banner-list-box">
                    <div><h4>No</h4></div>
                    <div><h4>배너이름</h4></div>
                    <div><h4>배너</h4></div>

                    <div style={{gridColumn:'2/3'}}>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 일반유저의 마이페이지 좌측메뉴바
function EnUserMyPage(props) {
    const { bannerLogo, user, selectedMenu, handleMenuClick } = props;

    return (
        <div className="mypage-left">
            <Link to="/" style={{borderRadius:'10px', overflow:'hidden', width:'250px', height:'130px', border:'1px solid rgba(224, 218, 201)', 
            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={bannerLogo} alt="project-log-no" style={{ width: '80%', margin: 'auto' }} />
            </Link>
            <div>
                <div className="mypage-profile-picture">
                    <img className="mypage-profile-picture-img" src={`${process.env.REACT_APP_ENDPOINT}${user.profileImage}`} alt="profile-image" />
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
    )
}

// 관리자,일반유저의 마이페이지중 프로필 (하위컴포넌트)
function MyPageProfile(props) {
    const { user } = props;

    // 프로필사진 수정할때 저장할 state
    const [file, setFile] = useState(null);
    // const [banner, setBanner] = useState(null);

    const fileInputRef = useRef(null);
    // const bannerInputRef = useRef(null);

    const handleClickPhoto = (type) => () => {
        if (type === "profile") {
            fileInputRef.current.click();
        } 
        // else if (type === "banner") {
        //     bannerInputRef.current.click();
        // }
    }
    const handleFilesChange = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append()
    }
    // const handleBannerChange = (e) => {
    //     e.preventDefault();

    // }

    console.log(user.profileImage);
    console.log(process.env.REACT_APP_ENDPOINT);

    return (
        <div className="mypage-right" style={{display:'grid', gridTemplateRows:'1fr 1fr'}}>
            <div>
                <div className="mypage-profile-picture" style={{margin:'auto', width:'150px', height:'150px', marginTop:'5%'}}>
                    <img className="mypage-profile-picture-img" src={`${process.env.REACT_APP_ENDPOINT}${user.profileImage}`} alt="profile-image" />
                </div>
                <div style={{margin:'30px 0px', textAlign:'center'}} onClick={handleClickPhoto("profile")}>
                    <span className="mypage-profile-picture-change-button">프로필 사진 변경</span>
                    {/* {
                        <div style={{margin:'30px 0px', textAlign:'center'}} onClick={handleClickPhoto("banner")}>
                            <span className="mypage-profile-picture-change-button" style={{padding:'4px 13px'}}>배너 사진 변경</span>
                        </div>
                    } */}
                </div>
                <input ref={fileInputRef} type="file" name='files' multiple onChange={handleFilesChange} style={{display:'none'}}></input>
                {/* <input ref={bannerInputRef} type="file" name='files' multiple onChange={handleBannerChange} style={{display:'none'}}></input> */}
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



// 일반유저의 마이페이지중 찜목록 (하위컴포넌트)
function MyPageFavorite(props) {
    // App.js에서 유저 정보 불러옴
    const { user } = props;

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
                { (favoriteCocktail.length == 0) ? (
                    <div className="signature-join-contents" style={{border:'1px solid black', gridColumn:'1/4'}}>
                        <h3 style={{ margin: '0px' }}>아직 찜한 칵테일이 없어요^^!!</h3>
                    </div>
                ) : (
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
                )
                }
                </div>
            </div>

            <div style={{padding:'1% 5%', marginTop:'5%'}}>
                <h2 style={{cursor:'default'}}>내가 찜한 시그니처 ▼</h2>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', columnGap:'80px', rowGap:'100px', gridAutoFlow: 'row'}}>
                { (favoriteCocktail.length == 0) ? (
                    <div className="signature-join-contents" style={{border:'1px solid black', gridColumn:'1/4'}}>
                        <h3 style={{ margin: '0px' }}>아직 찜한 시그니처 없어요^^!!</h3>
                    </div>
                ) : (
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
                )
                }
                </div>
                <div style={{margin:'30px 0px'}}>&nbsp;</div>
            </div>
        </div>
    )
}



// 마이페이지 (상위컴포넌트)
function MyPage(props) {
    const { user, banner } = props;
    const bannerLogo = process.env.PUBLIC_URL + '/project-log-no.png';

    // 현재 선택된 메뉴
    const [selectedMenu, setSelectedMenu] = useState('profile');

    // 메뉴 클릭시 색상 변경
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    }

    console.log("권한: " + user.role);

    return (
        <div className="mypage-container">
            {/* 마이페이지 좌측메뉴바 (관리자일때와 유저일때 각 상황에 맞는 좌측메뉴바 구성) */}
            {(user.role === "admin") ? (<AdminMypage bannerLogo={bannerLogo} user={user} banner={banner} selectedMenu={selectedMenu} handleMenuClick={handleMenuClick} />
            ) : (
            <EnUserMyPage bannerLogo={bannerLogo} user={user} selectedMenu={selectedMenu} handleMenuClick={handleMenuClick} />
            )}

            {/* 마이페이지중 일반유저, 관리자의 프로필 */}
            {selectedMenu === 'profile' && <MyPageProfile user={user}/>}

            {/* 마이페이지중 일반유저의 찜목록 */}
            {selectedMenu === 'favorite' && <MyPageFavorite user={user} />}

            {/* 마이페이지중 관리자의 배너관리 */}
            {selectedMenu === 'controlBanner' && <ControlBanner user={user} />}
        </div>
    )
}

export default MyPage;