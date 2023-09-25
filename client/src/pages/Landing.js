import Logo from '../component/Logo'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Link } from 'react-router-dom'



const Landing = () => {
    return (
        <>
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className="container page">
                    <div className="info">
                        <h1>job <span>tracking</span> app</h1>
                        <p>I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin coffee chia. Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch narwhal.</p>


                        <Link className='btn register-link' to="/register"> Register</Link>
                        <Link className='btn btn-hero' to="/login">Login / Demo User</Link>
                    </div>
                    <img src={main} alt="JOB BLAST " className='img main-img' />
                </div>
            </Wrapper>
        </>
    )
}

export default Landing
