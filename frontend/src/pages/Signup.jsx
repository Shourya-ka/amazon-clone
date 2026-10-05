import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {

        try {

            await axios.post(
                "http://localhost:3000/register",
                {
                    name,
                    email,
                    password
                }
            );

            toast.success("Account created successfully");

            navigate("/login");

        } catch (error) {

            console.log(error);

            toast.error("Signup failed");
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>Signup</h1>

                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleSignup}>
                    Signup
                </button>

            </div>

        </div>
    );
}

export default Signup;