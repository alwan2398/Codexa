import React from "react";

export default function HomeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
