import { useQuery } from 'react-query';

export function useUserData(userId) {
    return useQuery({
        queryKey: ['users', userId],
        queryFn: () => fetch(`/api/users/${userId}`).then((res) => res.json()),
        staleTime: 1000 * 60 * 5,
    });
}
