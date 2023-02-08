import { getNode,getNodes } from "../lib/dom/getNode.js";
import { tiger } from "../lib/utils/tiger.js";
import {insertLast} from "../lib/dom/insert.js"

const idInput = getNode("#memberId");
const PwInput = getNode("#password");
const PwConfirmInput = getNode("#passwordConfirm");
const NameInput = getNode("#name");
const EmailInput = getNode("#email");
const PhonenumberInput = getNode("#mobileNumber");
const BirthyearInput = getNode("#birthyear");
const BirthdateInput = getNode("#birthdate");
const BirthdayInput = getNode("#birthday");
const registerButton = getNode(".register-button");
const idDuplicateButton=getNode(".id-duplicate-button"); 
const emailDuplicateButton=getNode(".email-duplicate-button"); 
// const inputAreas=getNodes(".input-entire");

const member = {
  id: "", 
  password: "",
  passwordConfirm: "",
  name: "",
  email: "",
  phonenumber: "",
  birthyear: "",
  birthdate: "",
  birthday:""
}

idInput.addEventListener("change", function(e){
  member.id=e.target.value;
})

PwInput.addEventListener("change", function(e){
  member.password=e.target.value;
})

PwConfirmInput.addEventListener("change", function(e){
  member.passwordConfirm=e.target.value;
})

NameInput.addEventListener("change", function(e){
  member.name=e.target.value;
})

EmailInput.addEventListener("change", function(e){
  member.email=e.target.value;
})

PhonenumberInput.addEventListener("change", function(e){
  member.phonenumber=e.target.value;
})

BirthyearInput.addEventListener("change", function(e){
  member.birthyear=e.target.value;
})

BirthdateInput.addEventListener("change", function(e){
  member.birthdate=e.target.value;
})

BirthdayInput.addEventListener("change", function(e){
  member.birthday=e.target.value;
})

const agreeChkAll = document.querySelector('input[name=agree_all]');
agreeChkAll.addEventListener('change', (e) => {
    let agreeChk = document.querySelectorAll('input[name=agree]');
    for (let i = 0; i < agreeChk.length; i++) { agreeChk[i].checked = e.target.checked; }
});



// 유니크 아이디 생성
const generateRandomString = (num) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const pwdValidate=()=>{
  let reg = /^.{8,}$/;
  if(member.password.length===0){
     alert("필수 입력값입니다.");
    //  insertLast(inputAreas[1], "필수 입력값입니다.")
    return;
  }
  else{
    if(reg.test(member.password)){
      alert("비밀번호 유효성 확인")
      // insertLast(inputAreas[1], "비밀번호 유효성 확인")
    }
    else{
      alert("비밀번호를 다시 확인해주세요.")
      // insertLast(inputAreas[1], "비밀번호를 다시 확인해주세요.")
    }
  }
}

const pwdConfirmValidate=()=>{
  if(member.passwordConfirm.length===0){
     alert("비밀번호를 한번 더 입력해주세요.");
    //  insertLast(inputAreas[1], "필수 입력값입니다.")
    return;
  }
  else{
    if(member.password==member.passwordConfirm){
      // insertLast(inputAreas[1], "비밀번호 유효성 확인")
    }
    else{
      if(member.password!=member.passwordConfirm){
        // alert("동일한 비밀번호를 입력")
        return false;
      // insertLast(inputAreas[1], "비밀번호를 다시 확인해주세요.")
      }
    }
  }
}

const emailValidate=()=>{
  let reg = /^[0-9a-zA-Z]*@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/i;
  if(member.email.length===0){
     alert("필수 입력값입니다.");
    //  insertLast(inputAreas[1], "필수 입력값입니다.")
    return;
  }
  else{
    if(reg.test(member.email)){
      alert("이메일 유효성 확인.")
      // insertLast(inputAreas[1], "비밀번호 유효성 확인")
    }
    else{
      alert("이메일 형식으로 입력해주세요.")
      // insertLast(inputAreas[1], "비밀번호를 다시 확인해주세요.")
      
    }
  }
}

const findMemberId=(memberList)=>{
  let duplicateResult=memberList.some(memberInfo=>memberInfo.id===member.id)
  return duplicateResult
}

const onIdDuplicateClickHandler= async () => {
  let data=await tiger.get("http://localhost:3000/users");
  let members=await data.data;
  if(findMemberId(members)){
    alert("사용 불가능한 아이디입니다");
  }else{
    alert("사용할 수 있는 아이디입니다")
  }
}


const findMemberemail=(memberList)=>{
  let duplicateResult=memberList.some(memberInfo=>memberInfo.email===member.email)
  return duplicateResult
}

const onemailDuplicateClickHandler= async () => {
  let data=await tiger.get("http://localhost:3000/users");
  let members=await data.data;
  if(findMemberemail(members)){
    alert("사용 불가능한 이메일입니다");
  }else{
    alert("사용할 수 있는 이메일입니다")
  }

}


idDuplicateButton.addEventListener("click", onIdDuplicateClickHandler);

emailDuplicateButton.addEventListener("click", onemailDuplicateClickHandler);

const onClickRegisterHandler= async ()=>{
  pwdValidate()
  pwdConfirmValidate();
  emailValidate()

  //유니크 아이디 생성 함수 호출
    member.uniqueId=generateRandomString(10);
    await tiger.post("http://localhost:3000/users", member);
    console.log("포스트 완료")


}

registerButton.addEventListener("click", onClickRegisterHandler)