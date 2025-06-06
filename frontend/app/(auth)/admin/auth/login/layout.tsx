import { Card, CardContent } from "@/components/ui/card";
import LoginAdminIcon from "@/public/login-admin-icon.svg";
import Image from "next/image";
import "../../../../globals.css";

const AuthAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "flex flex-col items-center justify-center mx-auto gap-6 max-w-7xl min-h-screen"
      }
    >
      <Card className="overflow-hidden p-0 w-full md:w-[600px]">
        <CardContent className="grid p-0 md:grid-cols-2">
          {children}
          <div className="bg-muted relative hidden md:block">
            <Image
              src={LoginAdminIcon}
              alt="LoginIcon"
              className="absolute scale-75 h-full w-full dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className=" text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default AuthAdminLayout;
