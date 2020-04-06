import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data && data.user;
  return [user, { mutate }];
}

export async function handleLogout() {
  await fetch('/api/auth', {
    method: 'DELETE',
  });
  // set the user state to null
  mutate(null);
};