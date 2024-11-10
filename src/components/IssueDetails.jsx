import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { possibleStatus } from '../helpers/defaultData';

function useIssueData(issueNumber) {
    return useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () =>
            fetch(`/api/issues/${issueNumber}`).then((res) => res.json()),
    });
}

const IssueHeader = ({
    title,
    number,
    status = 'todo',
    createdBy,
    createdAt,
    comments,
}) => {
    const isIssueClosed = status === 'done' || status === 'cancelled';
    const statusObject = possibleStatus.find(
        (pstatus) => pstatus.id === status
    );
    return (
        <header>
            <h2>
                {title} <span>#{number}</span>
            </h2>
            <div>
                <span className={isIssueClosed ? 'closed' : 'open'}>
                    {isIssueClosed ? (
                        <GoIssueClosed style={{ color: 'red' }} />
                    ) : (
                        <GoIssueOpened style={{ color: 'green' }} />
                    )}
                    {statusObject.label}
                </span>
            </div>
        </header>
    );
};

export default function IssueDetails() {
    const { number } = useParams();

    const issueQuery = useIssueData(number);

    console.log(issueQuery.data);

    return (
        <div className="issue-details">
            {issueQuery.isLoading ? (
                <p>Loading issue...</p>
            ) : (
                <>
                    <IssueHeader {...issueQuery.data} />
                </>
            )}
        </div>
    );
}
