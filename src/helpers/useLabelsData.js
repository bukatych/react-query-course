import { useQuery } from 'react-query';

export function useLabelsData() {
    return useQuery({
        queryKey: ['labels'],
        queryFn: () => fetch('/api/labels').then((res) => res.json()),
    });
}
