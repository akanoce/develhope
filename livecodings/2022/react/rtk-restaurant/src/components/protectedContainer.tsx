import React from "react";
import { Navbar } from "./navbar";


export function ProtectedContainer({ children }: { children: React.ReactElement }) {


    return (
        <>
            <Navbar />
            <div className='w-full p-4'>
                {children}
            </div>
        </>

    )
}