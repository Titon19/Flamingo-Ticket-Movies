import React from "react";
import FormMovie from "../../form";

const EditFormMovie = async ({ params }: { params: { id: string } }) => {
  return <FormMovie itemId={params.id} />;
};

export default EditFormMovie;
