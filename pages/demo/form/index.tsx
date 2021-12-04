import useSWR, { trigger } from "swr";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  FieldArray,
  FormikProps,
  FieldHookConfig,
} from "formik";
import * as Yup from "yup";

import { Layout } from "../../../components/common";

type Pet = {
  nickname: string;
  type: string;
};

interface MyFormValues {
  name: string;
  password: string;
  email: string;
  country: string;
  description: string;
  categories: string[];
  preference: string;
  district: number | null;
  brand: string;
  age: number;
  isTop: boolean;
  dateTop: string;
  risk: "";
  pets: Pet[];
}

interface OtherProps {
  label: string;
}

const MyCustomInput = (props: OtherProps & FieldHookConfig<string>) => {
  const [field] = useField(props);
  return (
    <div className="my-2">
      <label>{props.label}</label>
      <br />
      <input
        {...field}
        className="ml-3"
        type={props.type}
        placeholder={props.placeholder}
      />
      <ErrorMessage
        name={props.name}
        component="div"
        className="text-red-700"
      />
    </div>
  );
};

const DemoForm = () => {
  const initialValues: MyFormValues = {
    name: "",
    password: "",
    country: "",
    email: "",
    description: "",
    categories: [],
    preference: "",
    brand: "",
    age: 0,
    risk: "",
    district: null,
    isTop: false,
    dateTop: "",
    pets: [
      {
        nickname: "",
        type: "cat",
      },
    ],
  };
  return (
    <Layout>
      <h1>Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Project Name is required")
            .min(2, "Minimum 2 characters needed"),
          country: Yup.string().required().min(2),
          age: Yup.number().required().min(0).max(10),
          pets: Yup.array().of(
            Yup.object({
              nickname: Yup.string().required("Pet needs a nickname"),
            })
          ),
          isTop: Yup.boolean().oneOf([true]),
          //todo: risk validation not working
          risk: Yup.array(Yup.string().oneOf(["High", "Medium", "Low"])).min(1),
        })}
        onSubmit={async (
          values,
          { setSubmitting, resetForm, setFieldError }
        ) => {
          setSubmitting(true);
          console.log(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          isValidating,
          errors,
          values,
        }: FormikProps<MyFormValues>) => (
          <Form>
            <div>
              <Field name="name" type="text" placeholder="Name" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="mt-2">
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                cols="40"
              />
            </div>
            <MyCustomInput
              name="country"
              type="text"
              label="Country"
              placeholder="Country"
            />
            <div className="mt-1 mb-2">
              <Field name="email" type="email" />
            </div>
            <div>
              <Field name="password" type="password" />
            </div>
            <div className="my-2">
              <Field name="dateTop" type="date" />
            </div>
            <div>
              <Field name="age" type="number" />
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-700"
              />
            </div>
            <div>
              <Field name="isTop" type="checkbox" />
              <label className="mx-2">TOP</label>
              <ErrorMessage
                name="isTop"
                component="div"
                className="text-red-700"
              />
            </div>
            <div>
              <Field
                name="risk"
                value="High"
                type="checkbox"
                className="mr-2"
              />
              <Field
                name="risk"
                value="Medium"
                type="checkbox"
                className="mr-2"
              />
              <Field name="risk" value="Low" type="checkbox" className="mr-2" />
              <label className="mx-2">Risk</label>
              <ErrorMessage
                name="risk"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="my-2">
              <Field as="select" name="brand">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Field>
            </div>
            <div>
              <Field name="categories" type="checkbox" value="soccer" />
              <label className="mx-2">Soccer</label>
              <Field name="categories" type="checkbox" value="tennis" />
              <label className="mx-2">Tennis</label>
              <Field name="categories" type="checkbox" value="rugby" />
              <label className="mx-2">Rugby</label>
            </div>
            <div>
              <Field name="preference" type="radio" value="very high" />
              <label className="mx-2">Very High</label>
              <Field name="preference" type="radio" value="high" />
              <label className="mx-2">High</label>
              <Field name="preference" type="radio" value="average" />
              <label className="mx-2">Average</label>
            </div>
            <div className="my-2">
              <FieldArray name="pets">
                {(arrayHelpers) => (
                  <div>
                    <h1>FieldArray</h1>
                    <button
                      onClick={() =>
                        arrayHelpers.push({
                          nickname: "",
                          type: "frog",
                        })
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
                    >
                      Add Pet
                    </button>
                    {values.pets.map((pet: Pet, index: number) => {
                      return (
                        <div key={index}>
                          <Field
                            type="text"
                            placeholder="Nickname"
                            name={`pets.${index}.nickname`}
                          />
                          <ErrorMessage
                            name={`pets.${index}.nickname`}
                            component="div"
                            className="text-red-700"
                          />
                          <Field as="select" name={`pets.${index}.type`}>
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="frog">Frog</option>
                          </Field>
                          <button
                            onClick={() =>
                              arrayHelpers.push({
                                nickname: "",
                                type: "frog",
                              })
                            }
                            className="ml-3 text-2xl"
                          >
                            +
                          </button>
                          <button
                            onClick={() => arrayHelpers.remove(index)}
                            className="ml-3"
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
              disabled={isSubmitting || isValidating}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default DemoForm;
