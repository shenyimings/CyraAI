// filepath: /web3-llm-recruiter/web3-llm-recruiter/src/pages/Home.jsx
import React from 'react';
import ParticleHeader from '../components/ParticleHeader';
import OnboardingButton from '../../../cyra-ai-frontend/components/OnboardingButton';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <ParticleHeader />
      <OnboardingButton />
    </div>
  );
};

export default Home;