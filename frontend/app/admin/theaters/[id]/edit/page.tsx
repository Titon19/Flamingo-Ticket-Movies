import React from "react";
import FormTheater from "../../form";

const EditFormTheater = async ({ params }: { params: { id: string } }) => {
  return <FormTheater itemId={params.id} />;
};

export default EditFormTheater;
