import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function createHash(text: string) {
    const hashed = await bcrypt.hash(text, 10)
    return hashed
}

export async function verifyHash(hashed: string, text: string) {
    const compareResult = await bcrypt.compare(text, hashed)
    return compareResult
}


type JwtPayload = { email: string, isAdmin: boolean }

export function createJwt(user: JwtPayload) {
    const jwtSecret = process.env.JWT_SECRET_KEY
    if (jwtSecret) {
        const encoded = jwt.sign(user, jwtSecret);
        return encoded
    }
    else
        throw ('JWT_SECRET_KEY not defined!')

}

export function verifyJwt(token: string) {
    const jwtSecret = process.env.JWT_SECRET_KEY
    if (jwtSecret) {
        try {
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
            return decoded
        }
        catch (e: any) {
            return null
        }
    }
    else
        throw ('JWT_SECRET_KEY not defined!')



}