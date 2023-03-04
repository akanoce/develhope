import { useState } from "react"
import { useRegisterMutation } from '../redux/api/authApiSlice'

import { useNavigate } from 'react-router-dom'

export default function Register() {

    const [email, setEmail] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState<string | undefined>(undefined)

    const navigate = useNavigate()

    const [runRegistration, { isLoading: isRegistrationLoading, isError: isRegistrationError }] = useRegisterMutation()


    const isButtonDisabled = !(email && password)


    async function handleRegistration() {

        if (email && password) {
            try {
                const result = await runRegistration({ email: email, password: password }).unwrap()
                navigate('/login')
            }
            catch (e: any) {
                console.error(e)
            }
        }
    }

    return (
        <div className='flex items-center justify-center h-screen p-4'  >
            <form onSubmit={(e) => { e.preventDefault(); handleRegistration(); }} className="p-4 flex  flex-col items-center justify-center border border-black rounded-sm w-full md:w-1/3">
                <h1 className="font-bold text-xl">Registrazione</h1>
                <div className="mt-4 flex flex-col items-start w-full">
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {isRegistrationError && <p className='input-error'>Impossibile registrare l'utente</p>}
                </div>
                <div className="flex flex-col items-start mt-4 w-full">
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {isRegistrationError && <p className='input-error'>Impossibile registrare l'utente</p>}
                </div>
                <div className="flex items-center justify-between w-full">
                    <button className='mt-4 btn-outline' type='button' onClick={() => navigate('/login')} >Vai al login</button>
                    <button className='mt-4 btn' disabled={isButtonDisabled} type='submit' >Registrati</button>
                </div>
            </form>
        </div>
    )
}