import { useCallback, useState } from "react";
import { User } from "../models/User";
import { GetUsers } from "../usecases/GetUsers";

export function useUserViewModel(getUsers: GetUsers) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsers.execute();

      setUsers(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [getUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
}