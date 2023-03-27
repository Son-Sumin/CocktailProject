/* eslint-disable */
import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// 재료정보 추가 컴포넌트 (하위)
function IngredientForm(props) {
    const ingredients = props.ingredients;
    const handleClickIngredientForm = props.handleClickIngredientForm;
    
    return (
        <label>
            <h3>재료 정보{ingredients.length} ▼</h3>
            <div className="signature-ingredient-container">
                <div><h3>재료1</h3></div>
                <div style={{gridColumn:'1/3'}}><input type="text" onChange={(e) => props.handleIngredientChange(e)} placeholder="재료 이름을 검색해주세요" className="signature-ingredient-contents-1" style={{width:'98.3%'}}></input></div>
                <div><input type="text" value={ingredients.amount} onChange={(e) => props.handleAmountChange(e)} placeholder="용량" className="signature-ingredient-contents-1"></input></div>
                <div><input type="text" value={ingredients.unit} onChange={(e) => props.handleUnitChange(e)} placeholder="단위" className="signature-ingredient-contents-1"></input></div>
            </div>
            <button type='button' onClick={handleClickIngredientForm} className="signature-ingredient-contents-btn">재료추가</button>
        </label>
    )
}




// 시그니처 작성페이지 (상위)
function SignatureJoin(props) {
    const { ingredient, token } = props;

    // 사진 그림 불러오기, navigate 사용
    const uploadPhoto = process.env.PUBLIC_URL + '/upload-photo.png'; // 이미지 업로드 버튼
    const navigate = useNavigate();

    // 텍스트 데이터를 저장할 state
    const [signatureJoin, setSignatureJoin] = useState({
        cocktailName: '',
        engName: '',
        cocktailContents: '',
        recipeContents: '',
    })

    // 재료 데이터를 저장할 state
    const [ingredients, setIngredients] = useState(
        {
        "ingredient": {
            "no": '',
            },
        "amount": '',
        "unit": '',
        },
    )

    const [ingredients02, setIngredients02] = useState(
        {
        "ingredient": {
            "no": '1',
            },
        "amount": '2',
        "unit": '개',
        },
    )

    // 이미지 파일을 저장할 state
    const [files, setFiles] = useState([]);


    // handleClickPhoto 이벤트
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(Array.from({length: 3}, () => null)); // 3개의 원소가 있는 배열을 생성하고 각 원소를 'null'값으로 초기화

    const handleClickPhoto = () => {
        fileInputRef.current.click();
    }
    const handleFilesChange = (e) => {
        e.preventDefault();

        // state에 파일 저장
        if (files.length < 3) {
            const fileList = e.target.files;
            const fileArray = [];

        for (let i = 0; i < fileList.length; i++) {
            fileArray.push(fileList[i]);
        }

        // state에 들어간 이전 이미지 파일 데이터는 유지하면서 새로운 이미지를 추가
        setFiles(prevFiles => [...prevFiles, ...fileArray]);

        console.log("files state: " + files);

        // 파일 미리보기
        const reader = new FileReader();
        reader.onloadend = () => { // reader.onloadend는 FileReader객체가 이미지 파일을 읽는 작업을 마쳤을 때 발생하는 이벤트
            setPreviewUrl((prevUrls) => {
            const newUrls = [...prevUrls];
            newUrls[files.length] = reader.result; // 새로운 미리보기 URL을 배열의 마지막에 추가
            return newUrls; // 새로운 배열상태 newUrls를 반환하면서 previewUrls 배열상태를 업데이트
            });
        };
        reader.readAsDataURL(e.target.files[0]);
        } else {
            alert("이미지파일은 최대 3장까지만 업로드 할수 있어요^^!!");
        }
    }



    // handleChange 이벤트
    const handleSignatureJoinChange = (e) => {
        const {name, value} = e.target; // name과 value 속성을 추출

        setSignatureJoin({
            ...signatureJoin,
            [name]: value // 추출한 속성을 사용
        });
    };


    // IngredientForm 이벤트
    const handleClickIngredientForm = () => {
        const nextKey = ingredientForm.length;
        const newIngredientForm = <IngredientForm key={nextKey} />;
        setIngredientForm([...ingredientForm, newIngredientForm]);
        console.log("클릭 성공!");
        console.log(ingredientForm);
    };

    const handleIngredientChange = (e) => {
        const { value } = e.target;
        const eachIngredient = ingredient.find((ingredient) => ingredient.name === value);

        if (eachIngredient != null) {
            setIngredients((prevState) => {
                const newState = {
                  ...prevState,
                  ingredient: {
                    no: eachIngredient.no,
                  },
                };
    
                console.log(eachIngredient);
                console.log(newState);
                return newState;
            });   
        }
    }

    const handleAmountChange = (e) => {
        const { value } = e.target;
        setIngredients((prevState) => {
          const newState = {...prevState};
          newState.amount = value;

          console.log(newState);
          return newState;
        });
      };
      
    const handleUnitChange = (e) => {
    const { value } = e.target;
    setIngredients((prevState) => {
        const newState = {...prevState};
        newState.unit = value;
        
        console.log(newState);
        return newState;
    });
    };

    // IngredientForm을 저장할 공간
    const [ingredientForm, setIngredientForm] = useState([<IngredientForm key={0} ingredients={ingredients} ingredient={ingredient} 
        setIngredients={setIngredients} handleClickIngredientForm={handleClickIngredientForm} 
        handleIngredientChange={handleIngredientChange} handleAmountChange={handleAmountChange} handleUnitChange={handleUnitChange} />]);

    // handleSumit 이벤트
    const handleSubmit = async (e) => {
        // form을 제출 했을때 새로고침되는 것을 방지
        e.preventDefault();

        // FormData객체에 데이터 저장
        const formData01 = new FormData();

        const formData02 = new FormData();
        const formData03 = new FormData();

        const formData04 = new FormData();

        formData01.append('cocktailName', signatureJoin.cocktailName);
        formData01.append('cocktailContents', signatureJoin.cocktailContents);
        formData01.append('recipeContents', signatureJoin.recipeContents);
        formData01.append('engName', signatureJoin.engName);

        // formData02.append('recipesData', ingredients[0]));
        formData02.append('ingredient', ingredients.ingredient.no);
        formData02.append('amount', ingredients.amount);
        formData02.append('unit', ingredients.unit);

        formData03.append('ingredient', ingredients02.ingredient.no);
        formData03.append('amount', ingredients02.amount);
        formData03.append('unit', ingredients02.unit);

        files.forEach((file) => formData04.append('files', file));


        // formData에 데이터 들어가있나 확인
        for (const [key, value] of formData01.entries()) {
            console.log("formData01: " + `${key}: ${value}`);
            console.log("--------");
        }
        for (const [key, value] of formData02.entries()) {
            console.log("formData02: " + `${key}: ${value}`);
            console.log("--------");
        }
        for (const [key, value] of formData04.entries()) {
            console.log("file state: " + files);
            console.log("formData04: " + `${key}: ${value}`);
            console.log("--------");
        }

        // 엔드포인트에 JSON파일 전달
        try {
            const res01 = await axios.post(`${process.env.REACT_APP_ENDPOINT}/signature/write`, formData01, 
                {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            // console.log(res.data);
            // navigate("/signature");

            const postNo = res01.data.no;
            console.log("postNo: " + postNo);
        
            const res02 = await axios.post(`${process.env.REACT_APP_ENDPOINT}/signature/write/${postNo}/recipe`, formData02 ,
                {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            
            // console.log("formData02: " + JSON.stringify(res02.data));
            // console.log("eachIngredientNo: " + JSON.stringify(ingredients));

            const res03 = await axios.post(`${process.env.REACT_APP_ENDPOINT}/signature/write/${postNo}/recipe`, formData03, 
                {
                headers: {
                  Authorization: `Bearer ${token}`
                }
                });
            
            // console.log("formData03: " + JSON.stringify(res03.data));
            // console.log("eachIngredientNo: " + JSON.stringify(ingredients));
            
            await axios.post(`${process.env.REACT_APP_ENDPOINT}/signature/write/${postNo}/file`, formData04, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
              });

            navigate("/signature");
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="signature-join-container">
            <div className="signature-join-banner">
                <div className="signature-join-banner-img" style={{gridRow:'1/4'}}></div>
                <div style={{gridColumn:'3/4', fontSize:'30px', fontWeight:'600', paddingTop:'30px'}}>나만의 시그니처 올리기</div>
                <div style={{gridColumn:'3/4', fontWeight:'600', color:'rgb(110, 110, 110)'}}>모여Bar 가이드에 도전하세요</div>
                <div style={{gridColumn:'3/4', color:'rgb(110, 110, 110)', marginTop:'30px'}}>♥좋아요♥를 많이 받게되면 <br /> 모여Bar 가이드에 정식 레시피로 등록됩니다. 매력적인 칵테일을 소개해주세요!</div>
            </div>
            <div className="signature-join-contents">
                {/* 영문이름 grid 150px */}
                <form style={{display:'grid', gridTemplateRows:'1fr 150px 150px 280px 1fr 1fr', rowGap:'20px'}} onSubmit={handleSubmit}>
                    <div>
                        <h3>칵테일 사진 ▼</h3>
                        <div className="signature-picture-box signature-picture-box-grid-1" style={{border:'0px'}}>
                            <div>
                                <button type='button' className='signature-picture-button' onClick={handleClickPhoto}>
                                    <img src={uploadPhoto} alt="이미지 업로드 버튼"/>
                                    <p className='signature-picture-button-text'>사진 업로드</p>
                                </button>
                                <input ref={fileInputRef} type="file" name='files' multiple onChange={handleFilesChange} style={{display:'none'}}></input>  
                            </div>

                            <div className="signature-picture-box-2 signature-picture-box-grid-2" style={(previewUrl[0] === null) ? null : {overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                                {(previewUrl[0] === null) ?
                                (<>
                                <div style={{gridRow:'2/3', textAlign:'center', fontWeight:'600'}}>추천사진1</div>
                                <div style={{gridRow:'3/4', textAlign:'center'}}>깔끔하게 흰 배경에 <br/> 찍어보세요!</div>
                                </>) : <img src={previewUrl[0]} alt="file preview" />}
                            </div>

                            <div className="signature-picture-box-2 signature-picture-box-grid-2" style={(previewUrl[1] === null) ? null : {overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                                {(previewUrl[1] === null) ?
                                (<>
                                <div style={{gridRow:'2/3', textAlign:'center', fontWeight:'600'}}>추천사진2</div>
                                <div style={{gridRow:'3/4', textAlign:'center'}}>깔끔하게 흰 배경에 <br/> 찍어보세요!</div>
                                </>) : <img src={previewUrl[1]} alt="file preview" />}
                            </div>

                            <div className="signature-picture-box-2 signature-picture-box-grid-2" style={(previewUrl[2] === null) ? null : {overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                                {(previewUrl[2] === null) ?
                                (<>
                                <div style={{gridRow:'2/3', textAlign:'center', fontWeight:'600'}}>추천사진3</div>
                                <div style={{gridRow:'3/4', textAlign:'center'}}>깔끔하게 흰 배경에 <br/> 찍어보세요!</div>
                                </>) : <img src={previewUrl[2]} alt="file preview" />}
                            </div>
                        </div>
                    </div>
                    <label>
                        <h3>칵테일 이름 ▼</h3>
                        <input type="text" placeholder="이름을 지어주세요:)" className="signature-join-contents-2" name='cocktailName' value={signatureJoin.cocktailName} onChange={handleSignatureJoinChange}></input>
                        <p style={{textAlign:'right', marginTop:'5px'}}>{signatureJoin.cocktailName.length}/50</p>
                    </label>
                    <label>
                        <h3>칵테일 영문이름 ▼</h3>
                        <input type="text" placeholder="영문이름을 지어주세요:)" className="signature-join-contents-2" name='engName' value={signatureJoin.engName} onChange={handleSignatureJoinChange}></input>
                        <p style={{textAlign:'right', marginTop:'5px'}}>{signatureJoin.engName.length}/50</p>
                    </label>
                    <label>
                        <h3>칵테일 설명 ▼</h3>
                        <textarea placeholder="칵테일 설명을 적어주세요:)" spellCheck="false" className="signature-join-contents-2 signature-textarea" name='cocktailContents' value={signatureJoin.cocktailContents} onChange={handleSignatureJoinChange}></textarea>
                        <p style={{textAlign:'right', marginTop:'5px'}}>{signatureJoin.cocktailContents.length}/200</p>
                    </label>
                    {/* {<IngredientForm ingredients={ingredients} ingredient={ingredient} setIngredients={setIngredients} />} */}
                    {
                    ingredientForm.map(function(a, i) {
                      return (
                        <label key={i}>
                            <h3>재료 정보{ingredients.length} ▼</h3>
                            <div className="signature-ingredient-container">
                                <div><h3>재료{i + 1}</h3></div>
                                <div style={{gridColumn:'1/3'}}><input type="text" onChange={(e) => handleIngredientChange(e)} placeholder="재료 이름을 검색해주세요" className="signature-ingredient-contents-1" style={{width:'98.3%'}}></input></div>
                                <div><input type="text" value={a.amount} onChange={(e) => handleAmountChange(e)} placeholder="용량" className="signature-ingredient-contents-1"></input></div>
                                <div><input type="text" value={a.unit} onChange={(e) => handleUnitChange(e)} placeholder="단위" className="signature-ingredient-contents-1"></input></div>
                            </div>
                            <button type='button' onClick={handleClickIngredientForm} className="signature-ingredient-contents-btn">재료추가</button>
                        </label>
                      )
                    })
                    }
                    <label>
                        <h3>레시피 정보 ▼</h3>
                        <textarea placeholder="레시피에 대한 설명을 적어주세요:)" spellCheck="false" className="signature-join-contents-2 signature-textarea" name='recipeContents' value={signatureJoin.recipeContents} onChange={handleSignatureJoinChange}></textarea>
                        <p style={{textAlign:'right', marginTop:'5px'}}>{signatureJoin.recipeContents.length}/200</p>
                    </label>
                    <div>
                        <button type='submit' className="signature-contents-btn">업로드</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignatureJoin;