import { Formik, Field, Form as FormikForm } from "formik";
import { Input, FormLabel, Textarea, Button, Grid } from "@chakra-ui/react";
import { useStores } from "../../stores";

export const FormSection = () => {
  const { blogsStore } = useStores();

  return (
    <Grid bgColor="gray.100" p="24px" borderRadius="8px">
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={(value: any, { resetForm }) => {
          blogsStore?.setQueuedBlogs({ ...value, status: "queued" });
          resetForm();
        }}
      >
        <FormikForm>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Field as={Input} id="title" name="title" placeholder="title" />
          <FormLabel htmlFor="body">Body</FormLabel>
          <Field
            as={Textarea}
            size="lg"
            id="body"
            name="body"
            type="textArea"
            placeholder="this is the body"
            h="500px"
          />
          <Button mt={4} colorScheme="teal" type="submit">
            Add Post
          </Button>
        </FormikForm>
      </Formik>
    </Grid>
  );
};

export default FormSection;
