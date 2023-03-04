import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLoginMutation } from '../redux/api/authApiSlice'
import { setCredentials } from "../redux/slice/authSlice"
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState<string | undefined>(undefined)

    const [runLogin, { isLoading: isLoginLoading, isError: isLoginError }] = useLoginMutation()


    const isButtonDisabled = !(email && password)


    async function handleLogin() {

        if (email && password) {
            try {
                const result = await runLogin({ email: email, password: password }).unwrap()
                dispatch(setCredentials({ user: result.user, accessToken: result.accessToken }))
                navigate('/menu')
            }
            catch (e: any) {
                console.error(e)
            }
        }
    }

    return (
        <div className='flex items-center justify-center h-screen p-4'>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="w-full md:w-1/3 p-4 flex  flex-col items-center justify-center border border-black rounded-sm">
                <h1 className="font-bold text-xl">Login</h1>
                <div className="mt-4 flex flex-col items-start w-full">
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {isLoginError && <p className='input-error'>Credenziali non valide</p>}
                </div>
                <div className="flex flex-col items-start mt-4 w-full">
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {isLoginError && <p className='input-error'>Credenziali non valide</p>}
                </div>
                <div className="flex items-center justify-between w-full">
                    <button className='mt-4 btn-outline' type='button' onClick={() => navigate('/register')}  >Registrati</button>
                    <button className='mt-4 btn' disabled={isButtonDisabled} type='submit'  >Login</button>
                </div>
            </form>
        </div>
    )
}