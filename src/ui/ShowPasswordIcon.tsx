import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";

export default function ShowPasswordIcon({
  showPassword,
}: {
  showPassword: boolean;
}) {
  return <>{!showPassword ? <HiMiniEye /> : <HiMiniEyeSlash />}</>;
}
