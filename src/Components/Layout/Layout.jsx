import AppBar from "../AppBar/AppBar";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>{" "}
    </>
  );
}
