import Image from "next/image";
import { User } from "../types/user";

interface UserDetailProps {
  user: User;   
}

export default function UserDetail({ user }: UserDetailProps) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Image
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={100}
          height={100}
          className="rounded-full"
        />
        <h2 className="text-2xl font-bold">{user.login}</h2>
        <p>{user.bio}</p>
      </div>
    )
}