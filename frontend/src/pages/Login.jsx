import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await axios.post(
                "http://localhost:3000/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            toast.success("Login successful");

            navigate("/");

        } catch (error) {

            console.log(error);

            toast.error("Login failed");
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>Login</h1>

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button onClick={handleLogin}>
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;