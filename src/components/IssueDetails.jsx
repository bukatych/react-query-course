import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IssueHeader } from './IssueHeader';
import { Comment } from './Comment';

function useIssueData(issueNumber) {
    return useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () =>
            fetch(`/api/issues/${issueNumber}`).then((res) => res.json()),
    });
}

function useIssueComments(issueNumber) {
    return useQuery({
        queryKey: ['issue', issueNumber, 'comments'],
        queryFn: () =>
            fetch(`/api/issues/${issueNumber}/comments`).then((res) =>
                res.json()
            ),
    });
}

export default function IssueDetails() {
    const { number } = useParams();

    const issueQuery = useIssueData(number);
    const commentsQuery = useIssueComments(number);

    return (
        <div className="issue-details">
            {issueQuery.isLoading ? (
                <p>Loading issue...</p>
            ) : (
                <>
                    <IssueHeader {...issueQuery.data} />
                    <main>
                        <section>
                            {commentsQuery.isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                commentsQuery.data?.map((comment) => (
                                    <Comment key={comment.id} {...comment} />
                                ))
                            )}
                        </section>
                        <aside></aside>
                    </main>
                </>
            )}
        </div>
    );
}
