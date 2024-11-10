import { possibleStatus } from '../helpers/defaultData';
import { useUserData } from '../helpers/useUserData';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';

export const IssueHeader = ({
    title,
    number,
    status = 'todo',
    createdBy,
    createdDate,
    comments,
}) => {
    const isIssueClosed = status === 'done' || status === 'cancelled';
    const statusObject = possibleStatus.find(
        (pstatus) => pstatus.id === status
    );
    const createdUser = useUserData(createdBy);

    return (
        <header>
            <h2>
                {title} <span>#{number}</span>
            </h2>
            <div>
                <span className={isIssueClosed ? 'closed' : 'open'}>
                    {isIssueClosed ? <GoIssueClosed /> : <GoIssueOpened />}
                    {statusObject.label}
                </span>
                <span className="created-by">
                    {createdUser.isLoading ? '...' : createdUser.data?.name}
                </span>{' '}
                opened this issue {relativeDate(createdDate)} -{' '}
                {comments.length}
            </div>
        </header>
    );
};
