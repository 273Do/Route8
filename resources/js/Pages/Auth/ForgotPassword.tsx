import React from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";
import { LordIcon } from "../Common/lord-icon";
import ScrollRevealContainer from "../Common/ScrollRevealContainer";
import R8Logo from "../../../img/Route8.png";

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.name as "email", event.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <Guest>
      <Head title="パスワードリセット" />

      <div className="mb-4 text-sm text-gray-500 leading-normal">
        メールアドレスを入力してください。パスワードリセット用のリンクを送ります。
      </div>

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <ValidationErrors errors={errors} />

      <ScrollRevealContainer className="login_area" move="left">
        <div className="main_login_area">
          <div className="login">
            <div className="login_header">
              <img src={R8Logo} alt="Route8Logo" />
              <h2>Route8</h2>
            </div>
            <form onSubmit={submit}>
              <div className="input_box">
                <LordIcon
                  src="https://cdn.lordicon.com/bkjyrmiv.json"
                  trigger="loop"
                  delay={1000}
                  colors={{
                    primary: "#000",
                  }}
                  size={25}
                />
                <Input
                  type="text"
                  name="email"
                  value={data.email}
                  isFocused={false}
                  handleChange={onHandleChange}
                />
                <label>Email</label>
              </div>
              <Button className="submit_btn" processing={processing}>
                Send password reset link
              </Button>
            </form>
          </div>
        </div>
      </ScrollRevealContainer>
    </Guest>
  );
}
