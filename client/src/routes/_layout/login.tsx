import LoginForm from "@/components/common/form/loginform";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
    return(
        <div className="position: absolute;width:310px height: 48px;left: 41px;top: 74px;background: #FFFFFF;">
            <LoginForm/>
        </div> 
    )
}