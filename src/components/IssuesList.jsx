import { useQuery } from 'react-query';
import { IssueItem } from './IssueItem';
import { useState } from 'react';
import fetchWithError from '../helpers/fetchWithError';
import Loader from './Loader';

export default function IssuesList({ labels, status }) {
    const issuesQuery = useQuery({
        queryKey: [
            'issues',
            {
                labels,
                status,
            },
        ],
        queryFn: ({ signal }) => {
            const labelsString = labels
                .map((label) => `labels[]=${label}`)
                .join('&');
            const statusString = status ? `&status=${status}` : '';

            return fetchWithError(
                `/api/issues?${labelsString}${statusString}`,
                { signal }
            );
        },
    });
    const [searchValue, setSearchValue] = useState('');
    const searchQuery = useQuery({
        queryKey: ['issues', searchValue, 'search'],
        queryFn: ({ signal }) =>
            fetch(`/api/search/issues?q=${searchValue}`, { signal }).then(
                (res) => res.json()
            ),
        enabled: searchValue.length > 0,
    });
    return (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    setSearchValue(event.target.elements.search.value);
                }}
            >
                <label htmlFor="search">Search Issues</label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Seatch"
                    onChange={(event) => {
                        if (event.target.value.length === 0) {
                            setSearchValue('');
                        }
                    }}
                />
            </form>
            <h2>Issues List {issuesQuery.isFetching ? <Loader /> : null}</h2>
            {issuesQuery.isLoading ? (
                <p>Loading...</p>
            ) : issuesQuery.isError ? (
                <p>{issuesQuery.error.message}</p>
            ) : searchQuery.fetchStatus === 'idle' &&
              searchQuery.isLoading === true ? (
                <ul className="issues-list">
                    {issuesQuery.data.map((issue) => (
                        <IssueItem
                            key={issue.id}
                            title={issue.title}
                            number={issue.number}
                            assignee={issue.assignee}
                            commentCount={issue.comments.length}
                            createdBy={issue.createdBy}
                            createdDate={issue.createdDate}
                            labels={issue.labels}
                            status={issue.status}
                        />
                    ))}
                </ul>
            ) : (
                <>
                    <h2>Search results</h2>
                    {searchQuery.isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <p>{searchQuery.data.count} Results</p>
                            <ul className="issues-list">
                                {searchQuery.data.items.map((issue) => (
                                    <IssueItem
                                        key={issue.id}
                                        title={issue.title}
                                        number={issue.number}
                                        assignee={issue.assignee}
                                        commentCount={issue.comments.length}
                                        createdBy={issue.createdBy}
                                        createdDate={issue.createdDate}
                                        labels={issue.labels}
                                        status={issue.status}
                                    />
                                ))}
                            </ul>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
