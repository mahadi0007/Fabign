import { Layout2 } from "../../components/layout/index";
import { useRouter } from "next/dist/client/router";
import { Container } from "../../components/container";
import { Text } from "../../components/text";
import { LoginForm } from "../../components/form/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { BreadCrumb } from "../../components/breadcrumb";
import { Requests } from "../../utils/Http";
import { useEffect } from "react";
import { Toastify } from "../../components/toastify";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accesstoken = localStorage.getItem("token");
    if (accesstoken) {
      router.push("/");
    }
  }, [router]);

  const onSubmit = async (data) => {
    try {
      const response = await Requests.Authentication.Login(data);
      if (response.data.statusCode === 200) {
        localStorage.setItem("token", response.data.body.token);
        const storeResponse = await Requests.Store.GetStore();
        if (storeResponse.data.message == "Found stores") {
          localStorage.setItem("storeId", storeResponse.data.body._id);
        }
        Toastify.Success("Successfully Logged In");
        router.push(`/`);
      } else {
        Toastify.Error(response.data.message);
      }
    } catch (error) {
      Toastify.Error("Network Error Occured");
    }
  };

  return (
    <Layout2 title="Login">
      {/* First section BreadCrumb */}
      <Container.Simple>
        <BreadCrumb />
      </Container.Simple>
      {/* Second Section Registration Form */}
      <Container.Simple>
        <Container.Column className="col-lg-5 mx-auto bg-white mt-4 mb-4">
          <Text className="fs-20 text-dark fw-bold p-3 mb-0">Login</Text>
          <div className="p-3 rounded">
            <div
              className="register__facebook "
              onClick={() => Toastify.Success("Feature is not available yet")}
              style={{ cursor: "pointer" }}
            >
              <Text className="text-blue text-center p-2 mb-0">
                {" "}
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className="text-secondary my-auto me-2"
                  style={{ height: "20px" }}
                />{" "}
                Register with Facebook
              </Text>
            </div>
            <div
              className="register__google mt-2"
              onClick={() => Toastify.Success("Feature is not available yet")}
              style={{ cursor: "pointer" }}
            >
              <Text className="text-blue text-center p-2 mb-0">
                {" "}
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="text-secondary my-auto me-2"
                  style={{ height: "20px" }}
                />
                Register with Google
              </Text>
            </div>
          </div>
          <div className="p-3">
            <LoginForm onSubmit={onSubmit} />
          </div>
        </Container.Column>
      </Container.Simple>
      {/* login redirect section */}
      <Container.Simple>
        <Container.Column className="col-lg-5 mx-auto bg-white mt-4 mb-4">
          <div className="mt-4 mb-4 p-3">
            <div className="d-flex justify-content-between ">
              <div className="d-flex justify-content-start p-2">
                <Text className="text-muted me-2 fs-14 mb-0 ">{`Don't Have an Account?`}</Text>
              </div>
              <a href={"/registration"} className="border text-decoration-none">
                <Text className="fs-14 text-blue mb-0 p-2 ps-3 pe-3 text-decoration-none">
                  Registration
                </Text>
              </a>
            </div>
          </div>
        </Container.Column>
      </Container.Simple>
    </Layout2>
  );
}
