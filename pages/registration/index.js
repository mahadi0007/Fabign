import { Layout } from "../../components/layout/index";
import { useRouter } from "next/dist/client/router";
import { Container } from "../../components/container";
import { Text } from "../../components/text";
import { RegistrationForm } from "../../components/form/RegistrationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import { Toastify } from "../../components/toastify";
import { Requests } from "../../utils/Http";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accesstoken = localStorage.getItem("token");
    if (accesstoken) {
      router.push("/");
    }
  }, []);

  const Registration = async (data) => {
    try {
      const response = await Requests.Authentication.Register(data);
      if (response.data.statusCode === 200) {
        Toastify.Success("Successfull Registered");
        router.push("/");
      }
    } catch (error) {
      if (error) {
        Toastify.Error("Something went wrong");
      }
    }
  };

  return (
    <Layout title="Registration">
      {/* First section BreadCrumb */}
      <Container.Simple>
        <div className="mt-4 mb-4 p-2 bg-white rounded d-flex justify-content-between">
          <div className="d-flex justify-content-start">
            <a
              className="text-decoration-none"
              onClick={() => {
                router.push("/");
              }}
            >
              <Text className="fs-14 my-auto text-muted m-0">
                Home <span className="ps-2">/</span>
              </Text>
            </a>
            <a
              className="text-decoration-none ps-2"
              onClick={() => {
                router.push(router.pathname);
              }}
            >
              <Text className="fs-14 text-capitalize text-secondary my-auto m-0">
                {router.pathname.replace("/", "")}
              </Text>
            </a>
          </div>
          <div>
            <Text className="fs-14 text-muted m-0">
              1 - 48 of 1 836 results
            </Text>
          </div>
        </div>
      </Container.Simple>
      {/* Second Section Registration Form */}
      <Container.Simple>
        <Container.Column className="col-lg-5 mx-auto bg-white mt-4 mb-4">
          <Text className="fs-20 text-dark fw-bold p-3 mb-0">
            Create an Account
          </Text>
          <div className="p-3 rounded">
            <div
              className="register__facebook w-100"
              onClick={() => Toastify.Success("Featured Not available yet")}
              style={{ cursor: "pointer" }}
            >
              <Text className="text-blue text-center p-2 mb-0">
                {" "}
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className="text-secondary my-auto me-2"
                />{" "}
                Register with Facebook
              </Text>
            </div>
            <div
              className="register__google w-100 mt-2"
              onClick={() => Toastify.Success("Featured Not available yet")}
              style={{ cursor: "pointer" }}
            >
              <Text className="text-blue text-center p-2 mb-0">
                {" "}
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="text-secondary my-auto me-2"
                />
                Register with Google
              </Text>
            </div>
          </div>
          <Text className="text-muted p-3">Or Create An Account</Text>
          <div className="p-3">
            <RegistrationForm submit={Registration} />
          </div>
        </Container.Column>
      </Container.Simple>
      {/* login redirect section */}
      <Container.Simple>
        <Container.Column className="col-lg-5 mx-auto bg-white mt-4 mb-4">
          <div className="mt-4 mb-4 p-3">
            <div className="d-flex justify-content-between ">
              <div className="d-flex justify-content-start p-2">
                <Text className="text-muted me-2 fs-14 mb-0 ">
                  Have an Account?
                </Text>
              </div>
              <a
                className="border text-decoration-none"
                onClick={() => {
                  router.push("/login");
                }}
              >
                <Text className="fs-14 text-blue mb-0 p-2 ps-3 pe-3 text-decoration-none">
                  Login
                </Text>
              </a>
            </div>
          </div>
        </Container.Column>
      </Container.Simple>
    </Layout>
  );
}
