/* eslint-disable */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignatureJoin(props) {
    // ingredient 데이터 불러오기
    const ingredient = props.ingredient;
    const navigate = useNavigate();

    // 데이터를 저장할 state
    const [cocktailName, setCocktailName] = useState("");
    const [engName, setEngName] = useState("");
    const [cocktailContents, setCocktailContents] = useState("");
    const [recipeContents, setRecipeContents] = useState("");
    // const [files, setFiles] = useState([]);

    const [eachIngredientNo, setEachIngredientNo] = useState([
        {
            "ingredient": [],
            "amount": '',
            "unit": '',
        }
    ])

    const [search, setSearch] = useState([
        {
            "ingredient": [
                {
                    "no": 1,
                }
            ],
            "amount": 1,
            "unit": "개",
        },
    ]);

    // handleChange 이벤트
    const handleNameChange = (e) => {
        setCocktailName(e.target.value);
    }

    const handleEngNameChange = (e) => {
        setEngName(e.target.value);
    }

    const handleCocktailContentsChange = (e) => {
        setCocktailContents(e.target.value);
    }

    const handleRecipeContentsChange = (e) => {
        setRecipeContents(e.target.value);
    }

    const handleIngredientChange = (e, index) => {
        const { value } = e.target;
        const eachIngredient = ingredient.find((ingredient) => ingredient.name === e.target.value);

        if (eachIngredient != null) {
            setEachIngredientNo((prevState) => {
                const newState = [...prevState];
                newState[index] = {
                  ...newState[index],
                  ingredient: {
                    no: eachIngredient.no,
                  },
                };
    
                console.log(eachIngredient);
                return newState;
            });   
        }
    }

    const handleAmountChange = (e, index) => {
        const { value } = e.target;
        setEachIngredientNo((prevState) => {
          const newState = [...prevState];
          newState[index].amount = value;

          return newState;
        });
      };
      
    const handleUnitChange = (e, index) => {
    const { value } = e.target;
    setEachIngredientNo((prevState) => {
        const newState = [...prevState];
        newState[index].unit = value;
        
        return newState;
    });
    };

    // const handleFilesChange = (e) => {
    //     setFiles(e.target.value);
    // }

    // handleSumit 이벤트
    const handleSubmit = async (e) => {
        // form을 제출 했을때 새로고침되는 것을 방지
        e.preventDefault();

        // FormData객체에 데이터 저장
        const formData01 = new FormData();
        const formData02 = new FormData();

        formData01.append('cocktailName', cocktailName);
        formData01.append('cocktailContents', cocktailContents);
        formData01.append('recipeContents', recipeContents);
        formData01.append('engName', engName);
        formData02.append('recipes', JSON.stringify(eachIngredientNo));
        // joinSignature.files.forEach((file) => {
        //     formData.append('files', file);
        // });

        // 엔드포인트에 JSON파일 전달
        try {
            const res01 = await axios.post('/signature/write', formData01, {
                // headers: {
                //   'Content-Type': 'application/json'
                // }
              }); // http://192.168.0.4:8080/signature/form
            // console.log(res.data);
            // navigate("/signature");

            const postNo = res01.data.no;
            console.log("postNo: " + postNo);
        
            const res02 = await axios.post(`/signature/write/${postNo}/recipe`, formData02, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }); // http://192.168.0.4:8080/signature/form
            navigate("/signature");
        } catch(err) {
            console.log(err);
        }

        // try {
        //     await axios.post(`/signature/write/${no}/file`, formData03, {
        //         // headers: {
        //         //   'Content-Type': 'multipart/form-data'
        //         // }
        //       }); // http://192.168.0.4:8080/signature/form
        //     // console.log(res.data);
        //     navigate("/signature");
        // } catch(err) {
        //     console.log(err);
        // }

        console.log("formData02: " + JSON.stringify(res02.data));
        console.log("eachIngredientNo: " + JSON.stringify(eachIngredientNo));
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
                    <div className="signature-contents-picture-box">
                        <h3>칵테일 사진 ▼</h3>
                        <div className="signature-picture-box signature-picture-box-grid-1" style={{border:'0px'}}>
                            {/* <div className="signature-picture-box" style={{border:'3px solid'}}>
                                <input type="file" name='files' defaultValue={joinSignature.files} multiple onChange={handleFileChange} style={{textAlign:'center', marginTop:'80px'}}></input>  
                            </div> */}
                            <div className="signature-picture-box signature-picture-box-grid-2">
                                <div style={{gridRow:'2/3', textAlign:'center', fontWeight:'600'}}>추천사진1</div>
                                <div style={{gridRow:'3/4', textAlign:'center'}}>깔끔하게 흰 배경에 <br/> 찍어보세요!</div>
                            </div>
                            <div className="signature-picture-box signature-picture-box-grid-2">
                                <div style={{gridRow:'2/3', textAlign:'center', fontWeight:'600'}}>추천사진2</div>
                                <div style={{gridRow:'3/4', textAlign:'center'}}>깔끔하게 흰 배경에 <br/> 찍어보세요!</div>
                            </div>
                            <div className="signature-picture-box signature-picture-box-grid-2">
                                <div style={{gridRow:'2/3', textAlign:'center', fontWeight:'600'}}>추천사진3</div>
                                <div style={{gridRow:'3/4', textAlign:'center'}}>깔끔하게 흰 배경에 <br/> 찍어보세요!</div> 
                            </div>
                        </div>
                    </div>
                    <label>
                        <h3>칵테일 이름 ▼</h3>
                        <input type="text" placeholder="이름을 지어주세요:)" className="signature-join-contents-2" name='cocktailName' value={cocktailName} onChange={handleNameChange}></input>
                        <p style={{textAlign:'right', marginTop:'5px'}}>{cocktailName.length}/50</p>
                    </label>
                    <label>
                        <h3>칵테일 영문이름 ▼</h3>
                        <input type="text" placeholder="영문이름을 지어주세요:)" className="signature-join-contents-2" name='engName' value={engName} onChange={handleEngNameChange}></input>
                        <p style={{textAlign:'right', marginTop:'5px'}}>{engName.length}/50</p>
                    </label>
                    <label>
                        <h3>칵테일 설명 ▼</h3>
                        <textarea placeholder="칵테일 설명을 적어주세요:)" spellCheck="false" className="signature-join-contents-2 signature-textarea" name='cocktailContents' value={cocktailContents} onChange={handleCocktailContentsChange}></textarea>
                        <p style={{textAlign:'right', marginTop:'5px'}}>{cocktailContents.length}/200</p>
                    </label>
                    <label>
                        <h3>재료 정보 ▼</h3>
                        <div className="signature-ingredient-container">
                            <div><h3>재료1</h3></div>
                            <div style={{gridColumn:'1/3'}}><input type="text" onChange={(e) => handleIngredientChange(e, 0)} placeholder="재료 이름을 검색해주세요" className="signature-ingredient-contents-1" style={{width:'98.3%'}}></input></div>
                            <div><input type="text" value={eachIngredientNo[0].amount} onChange={(e) => handleAmountChange(e, 0)} placeholder="용량" className="signature-ingredient-contents-1"></input></div>
                            <div><input type="text" value={eachIngredientNo[0].unit} onChange={(e) => handleUnitChange(e, 0)} placeholder="단위" className="signature-ingredient-contents-1"></input></div>
                        </div>
                        <button className="signature-ingredient-contents-btn">재료추가</button>
                    </label>
                    <label>
                        <h3>레시피 정보 ▼</h3>
                        <textarea placeholder="레시피에 대한 설명을 적어주세요:)" spellCheck="false" className="signature-join-contents-2 signature-textarea" name='recipeContents' value={recipeContents} onChange={handleRecipeContentsChange}></textarea>
                        <p style={{textAlign:'right', marginTop:'5px'}}>{recipeContents.length}/200</p>
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