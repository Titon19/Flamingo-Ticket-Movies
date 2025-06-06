import Image from "next/image";
import successImage from "../../../../../public/successfully-image.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <Image
        src={successImage}
        alt="Success Image"
        className="rounded-xl mb-6"
        width={300}
        height={300}
      />
      <h1 className="text-2xl font-semibold mb-2 text-green-600">
        Topup Successfully!
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for your topup. Please click the button below to go back to my
        wallet
      </p>
      <div className="flex flex-col gap-3 ">
        <Link href="/my-wallet">
          <Button variant="default" className="rounded-full">
            Back to My Wallet
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
