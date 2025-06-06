import React from "react";
import Providers from "./query-provider";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

export default ClientProvider;
