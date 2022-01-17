/* eslint-disable @next/next/no-img-element */
import { Button } from "components/module";
import { useRouter } from "next/router";

export default function PinSuccess() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div>
      <img
        src="../assets/images/transaction/success.png"
        alt="img"
        width="70px"
      />

      <h1
        className="font-black nunito-700"
        style={{ marginBottom: "40px", marginTop: "50px" }}
      >
        Your PIN Was Successfully Created
      </h1>
      <p className="nunito-400 font-secondary">
        Your PIN was successfully created and you can now access all the
        features in Zwallet. Login to your new account and start exploring!
      </p>

      <Button name="Login Now" top="90px" handleClick={handleLogin} />
    </div>
  );
}
