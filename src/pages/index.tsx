/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ExistingOrganizations from "../components/ExistingOrganizations";

const Home: NextPage = (props) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!sessionData ? (
        <button
          onClick={
            sessionData ? () => void signOut() : () => void signIn("google")
          }
          className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <ExistingOrganizations />
          <Link href="/createOrganization">
            <button className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20">
              Create organization
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
