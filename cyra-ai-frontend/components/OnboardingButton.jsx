import React from 'react';
// import '../styles/OnboardingButton.css';

const OnboardingButton = () => {
  const handleClick = () => {
    // 处理点击事件，后续可以添加路由跳转
    console.log('Starting recruitment process...');
  };

  return (
    <button className="onboarding-button" onClick={handleClick}>
      Start Recruiting Journey
    </button>
  );
};

export default OnboardingButton;