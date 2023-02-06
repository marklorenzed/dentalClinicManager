/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router";
import React from "react";
import { api } from "../../utils/api";

const OrganizationPage = () => {
  const router = useRouter();
  const { organizationId } = router.query;

  if (typeof organizationId === "string") {
    const { data } = api.user.getOrganizationById.useQuery({
      id: organizationId,
    });
    console.log(data);
  }

  return <div>{organizationId}</div>;
};

export default OrganizationPage;
