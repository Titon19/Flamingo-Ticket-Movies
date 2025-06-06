import React from "react";
import FormGenre from "../../form";

const EditGenrePage = async ({ params }: { params: { id: string } }) => {
  return <FormGenre itemId={params.id} />;
};

export default EditGenrePage;
