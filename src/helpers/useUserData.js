import { useQuery } from 'react-query';

export function useUserData(userId) {
    return useQuery({
        queryKey: ['users', userId],
        queryFn: ({ signal }) =>
            fetch(`/api/users/${userId}`, { signal }).then((res) => res.json()),
        staleTime: 1000 * 60 * 5,
    });
}
