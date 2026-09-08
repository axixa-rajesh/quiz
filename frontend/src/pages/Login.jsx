import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin=async(e)=>{
        e.preventDefault();

        localStorage.setItem("token","demo-token");
        navigate("/dashboard");
    };

    return (
        <div className="login-page"> 
            
            <div className="login-decoration">
                <div className="blob blob-one"></div>
                <div className="blob blob-two"></div>
            </div>

            <div className="login-card">

                <div className="login-icon">
                    Q
                </div>

            <h1>Welcome back</h1>

            <p>
                Sign in to your Quiz Management System
            </p>

            <form onSubmit={handleLogin}>

                <div className="form-group">
                    <label>Email address</label>

                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>

       <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          <div className="login-options">

            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" className="forgot">
              Forgot password?
            </button>

          </div>

          <button className="login-btn">
            Sign In →
          </button>

        </form>

      </div>

        </div>
    );
}

export default Login;