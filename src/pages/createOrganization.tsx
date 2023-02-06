import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "../utils/api";

const CreateOrganizationForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const { mutate } = api.user.createOrganization.useMutation({
    onSuccess(organization) {
      console.log(organization);
      void router.push("/");
    },
  });

  const handleSaveOrganization = () => {
    // save organization
    mutate({ name });
  };

  return (
    <div className="flex w-[80%] max-w-[500px] flex-col gap-2 rounded-xl bg-base-100 p-6">
      <h4>Create your organization</h4>
      <div className="flex w-full flex-col">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="eg. Juan Dela Cruz"
          className="input-bordered input input-sm w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col">
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          type="text"
          placeholder="eg. Philippines"
          className="input-bordered input input-sm w-full "
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <button className="btn mt-6" onClick={handleSaveOrganization}>
        Button
      </button>
    </div>
  );
};

export default CreateOrganizationForm;
