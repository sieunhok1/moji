import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Tạo tài khoản Moji</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Chào mừng bạn! Hãy đăng ký để bắt đầu
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="lastname">Họ</FieldLabel>
                  <Input id="lastname" type="text" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="firstname">Tên</FieldLabel>
                  <Input id="firstname" type="text" required />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
                <Input id="username" type="text" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" required />
              </Field>
              <Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" required />
                </Field>
              </Field>
              <Field>
                <Button type="submit">Tạo tài khoản</Button>
              </Field>

              <FieldDescription className="text-center">
                Đã có tài khoản? <a href="/signin">Đăng nhập</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover "
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a>.
      </FieldDescription>
    </div>
  );
}
