"use client";

import { useState } from 'react';
import Search from "./components/search";
import UserDetail from "./components/user-detail";
import UserRepositories from './components/user-repositories';
import { User } from './types/user';
import { Repository } from './types/repository';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [searchKey, setSearchKey] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationText, setValidationText] = useState<string | null>(null);

  const fetchUser = async (username: string): Promise<User | null> => {
    try {
      const user = await fetch(`https://api.github.com/users/${username}`);
      const res: User = await user.json();
      return res;
    } catch (error) {
      alert(`Error fetching user data: ${error}`);
      return null;
    }
  };

  const fetchUserRepositories = async (username: string): Promise<Repository[]> => {
    try {
      const userRepositoriesData = await fetch(`https://api.github.com/users/${username}/repos?per_page=10`, {
        headers: {
          "Accept": "application/vnd.github+json",
        },
      })
      const userRepositories = await userRepositoriesData.json()
      const res = userRepositories.sort((a: { stargazers_count: number; }, b: { stargazers_count: number; }) => {
        return b.stargazers_count - a.stargazers_count;
      })
      return res;
    } catch (error) {
      alert(`Error fetching user repositories: ${error}`);
      return [];
    }
  }

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKey(value);
    if (value.length > 0) {
      setValidationText(null);
    }
  };

  const onSearch = async () => {
    setValidationText(null);
    setIsLoading(true);
    
    if (!searchKey) {
      setValidationText("Username is required");
      setIsLoading(false);
      setUser(null);
      setRepositories([]);
      return;
    }

    const userData = await fetchUser(searchKey);
    if (!userData) {
      setValidationText("User not found");
      setIsLoading(false);
      return;
    }
    setUser(userData);

    const userRepos = await fetchUserRepositories(userData?.login || "");
    setRepositories(userRepos);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full flex flex-col gap-[32px] items-center">
        <h1 className="text-5xl font-bold tracking-tight text-center sm:text-left">
          Github Profile Finder
        </h1>
        
        <Search 
          onSearch={onSearch}
          onChangeUsername={onChangeUsername}
          validationText={validationText}
        />

        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : (
          user && (
            <>
              <UserDetail user={user} />

              <UserRepositories repositories={repositories} />
            </>
          )
        )}
      </main>      
    </div>
  );
}
