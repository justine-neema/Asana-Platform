import { Metadata } from "next";
import LoginComponent from "@/components/auth/Logincomponent";
import GuestGuard from "@/components/auth/GuestGuard";
export const metadata:Metadata={
    title:"Login-Asana",
    description:"Login page for our parent project"
}

export default function LoginPage(){
    return(
        <GuestGuard>
            <LoginComponent />
        </GuestGuard>
    );
}