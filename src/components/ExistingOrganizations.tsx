/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Link from "next/link";
import React from "react";
import { api } from "../utils/api";

const ExistingOrganizations = () => {
  const { data: user } = api.user.getUserByEmail.useQuery();
  return (
    <div className=" rounded-lg bg-white p-6 ">
      <h2 className="mb-4 text-lg font-semibold">Your Organizations</h2>
      {user?.organization &&
        user?.organization.length &&
        user?.organization.map((item) => {
          return (
            <Link key={item.id} href={`/organization/${item.id}`}>
              <div
                className="w-[300px] cursor-pointer rounded-md border border-gray-300 p-4 hover:bg-slate-100"
                key={item.id}
              >
                <h4>{item.name}</h4>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default ExistingOrganizations;
