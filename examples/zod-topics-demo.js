
import { z } from "zod";

const title = (t) => console.log(`\n=== ${t} ===`);
const show = (label, value) => console.log(label, JSON.stringify(value));

title("0. intro");
const nameSchema = z.string().min(3);
show("parse ok     ->", nameSchema.parse("rana"));

title("1. parse vs safeParse");
const loginSchema = z.strictObject({ username: z.string(), password: z.string() });

try {
  loginSchema.parse({ username: "rana" }); // parse THROWS on invalid data
} catch (err) {
  show("parse threw  ->", err.issues.map((i) => i.message));
}

const result = loginSchema.safeParse({ username: "rana" }); // safeParse RETURNS a result
show("safeParse    ->", { success: result.success, issues: result.error.issues.map((i) => i.message) });

title("2. unknown keys");
const input = { name: "rana", role: "admin" };
show("object       (strip)  ->", z.object({ name: z.string() }).parse(input));
show("looseObject  (keep)   ->", z.looseObject({ name: z.string() }).parse(input));
const strict = z.strictObject({ name: z.string() }).safeParse(input);
show("strictObject (reject) ->", strict.error.issues.map((i) => i.message));

title("3. signup schema");
const signup = z.strictObject({
  username: z.string().trim().toLowerCase().min(3),
  email: z.email(),
  password: z.string().min(8),
});
show("valid        ->", signup.parse({ username: "  Rana ", email: "a@b.com", password: "12345678" }));

title("4. custom validation");
const withConfirm = z
  .object({ password: z.string(), confirmPassword: z.string() })
  .refine((d) => d.password === d.confirmPassword, { error: "Passwords do not match", path: ["confirmPassword"] });
const r4 = withConfirm.safeParse({ password: "a", confirmPassword: "b" });
show("refine       ->", r4.error.issues.map((i) => ({ path: i.path, message: i.message })));

title("5. custom messages");
const msgSchema = z.object({
  age: z.number({ error: (i) => (i.input === undefined ? "Age is required" : "Age must be a number") }).min(18, "Must be 18+"),
});
show("missing      ->", msgSchema.safeParse({}).error.issues.map((i) => i.message));
show("wrong type   ->", msgSchema.safeParse({ age: "x" }).error.issues.map((i) => i.message));
show("too small    ->", msgSchema.safeParse({ age: 10 }).error.issues.map((i) => i.message));

title("6. validation middleware");
console.log("See src/middleware/validation.js (uses safeParse + ValidationException)");

title("7. regex pt1");
const phone = z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone");
show("good phone   ->", phone.safeParse("01012345678").success);
show("bad phone    ->", phone.safeParse("0212345").success);

title("8. regex pt2");
const strong = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, "Weak password");
show("Abcd@1234    ->", strong.safeParse("Abcd@1234").success);
show("abcd1234     ->", strong.safeParse("abcd1234").success);
