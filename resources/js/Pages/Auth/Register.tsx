import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
// import Label from "@/Components/Label";
import { LordIcon } from "../Common/lord-icon";
import ScrollRevealContainer from "../Common/ScrollRevealContainer";
import R8Logo from "../../../img/Route8.png";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      event.target.name as "email" | "password" | "name",
      event.target.type === "checkbox" ? event.target.checked + "" : event.target.value
    );
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <Guest>
      <Head title="新規登録" />

      <ValidationErrors errors={errors} />

      {/* <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Name" />

                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        ログインはこちら
                    </Link>

                    <Button
                        className="ml-4 bg-gray-900"
                        processing={processing}
                    >
                        新規登録する
                    </Button>
                </div>
            </form> */}

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
                  src="https://cdn.lordicon.com/gfgzffjw.json"
                  trigger="loop"
                  delay={1000}
                  colors={{
                    primary: "#000",
                  }}
                  size={25}
                />
                <Input
                  type="text"
                  name="name"
                  value={data.name}
                  autoComplete="name"
                  isFocused={false}
                  handleChange={onHandleChange}
                />
                <label>Name</label>
              </div>
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
                  type="email"
                  name="email"
                  value={data.email}
                  autoComplete="username"
                  handleChange={onHandleChange}
                  required
                />
                <label>Email</label>
              </div>
              <div className="input_box">
                <LordIcon
                  src="https://cdn.lordicon.com/lsyjcyze.json"
                  trigger="loop"
                  delay={1000}
                  colors={{
                    primary: "#000",
                  }}
                  size={25}
                />
                <Input
                  type="password"
                  name="password"
                  value={data.password}
                  className="password"
                  // autoComplete="current-password"
                  handleChange={onHandleChange}
                />
                <label>Password</label>
              </div>
              <div className="input_box">
                <LordIcon
                  src="https://cdn.lordicon.com/jswiqvbr.json"
                  trigger="loop"
                  delay={1000}
                  colors={{
                    primary: "#000",
                  }}
                  size={25}
                />
                <Input
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  handleChange={onHandleChange}
                />
                <label>Confirm Password</label>
              </div>
              <Button className="submit_btn" processing={processing}>
                Register
              </Button>

              <Link href={route("login")}>Login</Link>
            </form>
          </div>
        </div>
      </ScrollRevealContainer>
    </Guest>
  );
}
