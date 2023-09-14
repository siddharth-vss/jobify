import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    left:auto;
    right:auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    align-item:center;
    border-top: 5px solid var(--primary-500);
  }
  h3 {
    text-align: center;
    text-align-last: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
    border: transparent;
    background-color: transparent;
    
  }
  img{
    margin : 0 25% 5%;
  }
`;
export default Wrapper;
