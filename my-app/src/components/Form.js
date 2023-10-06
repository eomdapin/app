import React from 'react';

const Form = ({ updateCounter }) => {
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // 한글 검증
  const hangul = text => /[가-힣|ㄱ-ㅎ|ㅏ-ㅣ]/.test(text);

  function handleInputChange(data) {
    const userValue = data.target.value;

    if (hangul(userValue)) {
      setErrorMessage('한글은 입력하실 수 없습니다.');
    } else {
      setErrorMessage('');
    }
    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    setErrorMessage('');

    if (value === '') {
      setErrorMessage('값이 없으므로 추가할 수 없습니다.');
    } else {
      updateCounter();
    }
  }

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <input type="text" name="name" placeholder="상품명을 입력하세요."
        onChange={handleInputChange} value={value}
      />
      <button type="submit">추가</button>
      <p style={{ color: "#f00", fontWeight: "bold" }}>{errorMessage}</p>
    </form>
  );
};

export default Form;